-- Add optional username column with unique constraint
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS username text;
ALTER TABLE public.users ADD CONSTRAINT users_username_key UNIQUE (username);
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users (username) WHERE username IS NOT NULL;
