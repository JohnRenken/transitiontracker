#!/bin/bash set -e

REPO_URL="https://github.com/JohnRenken/transitiontracker.git" BRANCH="add/ci-fastlane-setup"

Clone if needed
if [ ! -d "transitiontracker" ]; then git clone "$REPO_URL" fi

cd transitiontracker

Create feature branch
git checkout -b "$BRANCH"

Create directories
mkdir -p .github/workflows fastlane

Create CI workflow
cat > .github/workflows/ci.yml <<'EOF' name: CI — lint, test, build

on: push: branches: [ main ] pull_request: branches: [ main ]

jobs: build: runs-on: ubuntu-latest steps: - name: Checkout uses: actions/checkout@v4

Code
  - name: Use Node 18
    uses: actions/setup-node@v4
    with:
      node-version: 18
      cache: 'npm'

  - name: Install dependencies
    run: npm ci

  - name: Lint (if present)
    run: |
      if npm run | grep -q "lint"; then
        npm run lint
      else
        echo "No lint script"
      fi

  - name: Run tests (if present)
    run: |
      if npm run | grep -q "test"; then
        npm test --if-present
      else
        echo "No tests defined"
      fi

  - name: Build web (Vite)
    run: npm run build

  - name: Upload build artifact
    uses: actions/upload-artifact@v4
    with:
      name: web-dist
      path: dist
EOF

Create mobile workflow
cat > .github/workflows/mobile.yml <<'EOF' name: Mobile CI — Fastlane builds

on: push: branches: - main workflow_dispatch:

env: IOS_WORKSPACE: ${{ secrets.IOS_WORKSPACE }} IOS_SCHEME: ${{ secrets.IOS_SCHEME }} IOS_PROJECT: ${{ secrets.IOS_PROJECT }} ANDROID_MODULE: ${{ secrets.ANDROID_MODULE }} ANDROID_GRADLE_TASK: ${{ secrets.ANDROID_GRADLE_TASK || 'bundleRelease' }} PACKAGE_NAME: ${{ secrets.PACKAGE_NAME }}

jobs: android: name: Android build and upload (internal) runs-on: ubuntu-latest steps: - name: Checkout uses: actions/checkout@v4

Code
  - name: Setup Node
    uses: actions/setup-node@v4
    with:
      node-version: 18
      cache: 'npm'

  - name: Install dependencies
    run: npm ci

  - name: Build web assets (Vite)
    run: npm run build

  - name: Sync Capacitor (android)
    run: npx cap sync android

  - name: Decode Android keystore
    if: ${{ secrets.ANDROID_KEYSTORE_BASE64 }}
    run: |
      echo "${{ secrets.ANDROID_KEYSTORE_BASE64 }}" | base64 --decode > android/keystore.jks

  - name: Write Google Play service account JSON
    if: ${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON_BASE64 }}
    run: |
      echo "${{ secrets.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON_BASE64 }}" | base64 --decode > ./google_play_service_account.json

  - name: Setup Ruby and Bundler
    uses: ruby/setup-ruby@v1
    with:
      ruby-version: '3.1'
      bundler-cache: true

  - name: Run Android Fastlane lane
    env:
      ANDROID_KEYSTORE_PATH: android/keystore.jks
      ANDROID_KEYSTORE_PASSWORD: ${{ secrets.ANDROID_KEYSTORE_PASSWORD }}
      ANDROID_KEY_ALIAS: ${{ secrets.ANDROID_KEY_ALIAS }}
      ANDROID_KEY_PASSWORD: ${{ secrets.ANDROID_KEY_PASSWORD }}
      GOOGLE_PLAY_SERVICE_ACCOUNT_JSON: ./google_play_service_account.json
      PACKAGE_NAME: ${{ secrets.PACKAGE_NAME }}
      ANDROID_MODULE: ${{ env.ANDROID_MODULE }}
      ANDROID_GRADLE_TASK: ${{ env.ANDROID_GRADLE_TASK }}
    run: bundle exec fastlane android beta
ios: name: iOS build and upload (TestFlight) runs-on: macos-latest needs: android steps: - name: Checkout uses: actions/checkout@v4

Code
  - name: Setup Node
    uses: actions/setup-node@v4
    with:
      node-version: 18
      cache: 'npm'

  - name: Install dependencies
    run: npm ci

  - name: Build web assets (Vite)
    run: npm run build

  - name: Sync Capacitor (ios)
    run: npx cap sync ios

  - name: Setup Ruby and Bundler
    uses: ruby/setup-ruby@v1
    with:
      ruby-version: '3.1'
      bundler-cache: true

  - name: Create App Store Connect API key file
    if: ${{ secrets.APP_STORE_CONNECT_KEY_P8_BASE64 }}
    run: |
      echo "${{ secrets.APP_STORE_CONNECT_KEY_P8_BASE64 }}" | base64 --decode > ./AuthKey.p8

  - name: Run iOS Fastlane lane
    env:
      APP_STORE_CONNECT_KEY_PATH: ./AuthKey.p8
      APP_STORE_CONNECT_KEY_ID: ${{ secrets.APP_STORE_CONNECT_KEY_ID }}
      APP_STORE_CONNECT_ISSUER_ID: ${{ secrets.APP_STORE_CONNECT_ISSUER_ID }}
      IOS_WORKSPACE: ${{ env.IOS_WORKSPACE }}
      IOS_PROJECT: ${{ env.IOS_PROJECT }}
      IOS_SCHEME: ${{ env.IOS_SCHEME }}
    run: bundle exec fastlane ios beta
EOF

Fastlane Fastfile
cat > fastlane/Fastfile <<'EOF' default_platform(:ios)

platform :android do desc "Build Android release and upload to Google Play (internal)." lane :beta do gradle_task = ENV["ANDROID_GRADLE_TASK"] || "bundleRelease" gradle(task: "clean #{gradle_task}")

Code
supply(
  json_key: ENV["GOOGLE_PLAY_SERVICE_ACCOUNT_JSON"] || "./google_play_service_account.json",
  package_name: ENV["PACKAGE_NAME"],
  track: "internal",
  skip_upload_metadata: true,
  skip_upload_images: true,
  skip_upload_screenshots: true
)
end end

platform :ios do desc "Build iOS and upload to TestFlight" lane :beta do api_key = nil if ENV["APP_STORE_CONNECT_KEY_PATH"] && File.exist?(ENV["APP_STORE_CONNECT_KEY_PATH"]) api_key = app_store_connect_api_key( key_id: ENV["APP_STORE_CONNECT_KEY_ID"], issuer_id: ENV["APP_STORE_CONNECT_ISSUER_ID"], key_filepath: ENV["APP_STORE_CONNECT_KEY_PATH"], in_house: false ) end

Code
workspace = ENV["IOS_WORKSPACE"]
project = ENV["IOS_PROJECT"]
scheme = ENV["IOS_SCHEME"] || "App"

if workspace && !workspace.empty?
  UI.message("Building using workspace: #{workspace}, scheme: #{scheme}")
  build_app(
    workspace: workspace,
    scheme: scheme,
    export_method: "app-store",
    api_key: api_key
  )
elsif project && !project.empty?
  UI.message("Building using project: #{project}, scheme: #{scheme}")
  build_app(
    project: project,
    scheme: scheme,
    export_method: "app-store",
    api_key: api_key
  )
else
  ws = Dir["ios/**/*.xcworkspace"].first
  if ws
    UI.message("Auto-detected workspace: #{ws}, scheme: #{scheme}")
    build_app(workspace: ws, scheme: scheme, export_method: "app-store", api_key: api_key)
  else
    proj = Dir["ios/**/*.xcodeproj"].first
    if proj
      UI.message("Auto-detected project: #{proj}, scheme: #{scheme}")
      build_app(project: proj, scheme: scheme, export_method: "app-store", api_key: api_key)
    else
      UI.user_error!("Could not find an Xcode workspace or project. Ensure you've added iOS platform (npx cap add ios) and committed the native iOS project or set IOS_WORKSPACE/IOS_PROJECT values.")
    end
  end
end

upload_to_testflight(api_key: api_key)
end end EOF

Gemfile
cat > Gemfile <<'EOF' source "https://rubygems.org"

gem "fastlane", "~> 2.220" EOF

fastlane Appfile
cat > fastlane/Appfile <<'EOF' apple_id("your-apple-id@example.com") app_identifier("com.example.yourapp") package_name("com.example.yourapp") EOF

.env.example
cat > .env.example <<'EOF'

Example environment variables (NO secrets here).
Copy to .env locally for development, but DO NOT commit .env to the repo.
Supabase (frontend)
VITE_SUPABASE_URL=https://your-project.supabase.co VITE_SUPABASE_ANON_KEY=public-anon-key

Supabase (server-only; NEVER expose in client builds)
SUPABASE_SERVICE_ROLE_KEY=super-secret-service-role-key

Node
NODE_ENV=production

Optional analytics / error reporting
VITE_SENTRY_DSN=

NOTE: The following items are CI secrets — DO NOT put real secrets into repo.
Use GitHub Actions repository secrets instead:
- APP_STORE_CONNECT_KEY_P8_BASE64
- APP_STORE_CONNECT_KEY_ID
- APP_STORE_CONNECT_ISSUER_ID
- GOOGLE_PLAY_SERVICE_ACCOUNT_JSON_BASE64
- ANDROID_KEYSTORE_BASE64
- ANDROID_KEYSTORE_PASSWORD
- ANDROID_KEY_ALIAS
- ANDROID_KEY_PASSWORD
EOF

DEPLOYMENT.md
cat > DEPLOYMENT.md <<'EOF'

Deployment Runbook — Web + Mobile (Fastlane + GitHub Actions)
Follow this runbook after you push the CI files. Do NOT commit secrets.

Remove committed .env locally and add to .gitignore
git rm --cached .env || true
grep -qxF '.env' .gitignore || echo '.env' >> .gitignore
Create accounts (if not already)
Apple Developer Program and App Store Connect
Google Play Console
Supabase (for DB/Auth)
GitHub repo admin access
Keys & base64 encoding (examples)
App Store Connect API key (.p8): base64 AuthKey_ABC123.p8 | tr -d '\n' > appstore_key_base64.txt

Google Play service account JSON: base64 service-account.json | tr -d '\n' > gp_service_base64.txt

Android keystore: base64 release-keystore.jks | tr -d '\n' > keystore_base64.txt

Add GitHub Secrets (Settings → Secrets → Actions)
APP_STORE_CONNECT_KEY_P8_BASE64
APP_STORE_CONNECT_KEY_ID
APP_STORE_CONNECT_ISSUER_ID
GOOGLE_PLAY_SERVICE_ACCOUNT_JSON_BASE64
ANDROID_KEYSTORE_BASE64
ANDROID_KEYSTORE_PASSWORD
ANDROID_KEY_ALIAS
ANDROID_KEY_PASSWORD
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
(Optional) IOS_WORKSPACE, IOS_SCHEME, IOS_PROJECT, ANDROID_MODULE, ANDROID_GRADLE_TASK, PACKAGE_NAME
Add native platforms locally (only once)
npm ci
npx cap add android
npx cap add ios
npm run build
npx cap sync
Open native projects
npx cap open android (or open android/ in Android Studio)
npx cap open ios (or open ios/App/App.xcworkspace in Xcode)
Note the iOS workspace & scheme and Android package/module; add them as repo secrets if needed.
Create a branch, commit, push, and open a PR (example commands below).

Trigger workflows:

CI runs automatically on PRs
mobile.yml runs on push to main or via manual dispatch (after you merge)
TestFlight / Play internal:
Use TestFlight internal testing and Play Console internal tracks for QA before public release.
Need help?
Paste the output of ls ios and ls android after you add the platforms, and I’ll update Fastfile/workflow to the exact paths. EOF
Remove tracked .env if present and ensure .gitignore entry
git rm --cached .env || true grep -qxF '.env' .gitignore || echo '.env' >> .gitignore
