export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          value_json: Json | null
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          value_json?: Json | null
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          value_json?: Json | null
        }
        Relationships: []
      }
      assessments: {
        Row: {
          answers_json: Json | null
          created_at: string | null
          id: string
          score: number | null
          type: string
          user_id: string
        }
        Insert: {
          answers_json?: Json | null
          created_at?: string | null
          id?: string
          score?: number | null
          type: string
          user_id: string
        }
        Update: {
          answers_json?: Json | null
          created_at?: string | null
          id?: string
          score?: number | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      lessons: {
        Row: {
          content_markdown: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          is_active: boolean | null
          media_url: string | null
          module: string
          order_index: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content_markdown?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          media_url?: string | null
          module: string
          order_index?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content_markdown?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_active?: boolean | null
          media_url?: string | null
          module?: string
          order_index?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          branch: Database["public"]["Enums"]["military_branch"] | null
          created_at: string | null
          csp_days: number | null
          ets_date: string | null
          full_name: string | null
          id: string
          mos: string | null
          onboarding_completed: boolean | null
          ptdy_days: number | null
          rank: string | null
          target_location: string | null
          target_path: Database["public"]["Enums"]["career_path"] | null
          terminal_days: number | null
          timezone: string | null
          updated_at: string | null
          user_id: string
          years_served: number | null
        }
        Insert: {
          branch?: Database["public"]["Enums"]["military_branch"] | null
          created_at?: string | null
          csp_days?: number | null
          ets_date?: string | null
          full_name?: string | null
          id?: string
          mos?: string | null
          onboarding_completed?: boolean | null
          ptdy_days?: number | null
          rank?: string | null
          target_location?: string | null
          target_path?: Database["public"]["Enums"]["career_path"] | null
          terminal_days?: number | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
          years_served?: number | null
        }
        Update: {
          branch?: Database["public"]["Enums"]["military_branch"] | null
          created_at?: string | null
          csp_days?: number | null
          ets_date?: string | null
          full_name?: string | null
          id?: string
          mos?: string | null
          onboarding_completed?: boolean | null
          ptdy_days?: number | null
          rank?: string | null
          target_location?: string | null
          target_path?: Database["public"]["Enums"]["career_path"] | null
          terminal_days?: number | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
          years_served?: number | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          module: string | null
          tags: string[] | null
          title: string
          type: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          module?: string | null
          tags?: string[] | null
          title: string
          type: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          module?: string | null
          tags?: string[] | null
          title?: string
          type?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          category: string | null
          created_at: string | null
          default_due_offset_days: number | null
          description: string | null
          id: string
          is_active: boolean | null
          order_index: number | null
          phase: Database["public"]["Enums"]["transition_phase"]
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          default_due_offset_days?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          phase: Database["public"]["Enums"]["transition_phase"]
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          default_due_offset_days?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          phase?: Database["public"]["Enums"]["transition_phase"]
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_lesson_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          lesson_id: string
          quiz_score: number | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          lesson_id: string
          quiz_score?: number | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string
          quiz_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_tasks: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          notes: string | null
          task_id: string | null
          title: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          notes?: string | null
          task_id?: string | null
          title: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          notes?: string | null
          task_id?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_phase: {
        Args: { _ets_date: string }
        Returns: Database["public"]["Enums"]["transition_phase"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      career_path:
        | "sales"
        | "cyber"
        | "project_management"
        | "skilled_trades"
        | "healthcare_tech"
        | "operations"
      military_branch:
        | "army"
        | "navy"
        | "air_force"
        | "marine_corps"
        | "coast_guard"
        | "space_force"
      transition_phase:
        | "12_to_9_months"
        | "9_to_6_months"
        | "6_to_3_months"
        | "90_to_30_days"
        | "terminal_ptdy"
        | "post_ets"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      career_path: [
        "sales",
        "cyber",
        "project_management",
        "skilled_trades",
        "healthcare_tech",
        "operations",
      ],
      military_branch: [
        "army",
        "navy",
        "air_force",
        "marine_corps",
        "coast_guard",
        "space_force",
      ],
      transition_phase: [
        "12_to_9_months",
        "9_to_6_months",
        "6_to_3_months",
        "90_to_30_days",
        "terminal_ptdy",
        "post_ets",
      ],
    },
  },
} as const
