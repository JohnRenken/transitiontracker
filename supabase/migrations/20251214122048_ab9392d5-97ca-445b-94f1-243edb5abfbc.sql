-- Allow users to delete their own assessments (enables retaking tests)
CREATE POLICY "Users can delete own assessments"
ON public.assessments
FOR DELETE
USING (auth.uid() = user_id);

-- Note: UPDATE intentionally has no policy - scores cannot be modified, only deleted and retaken