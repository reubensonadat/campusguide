-- Table Definition
CREATE TABLE public.budget_transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  amount numeric NOT NULL,
  type text NOT NULL, -- 'income' or 'expense'
  category text NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT budget_transactions_pkey PRIMARY KEY (id),
  CONSTRAINT budget_transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE public.budget_transactions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can select their own transactions
CREATE POLICY "Users can view their own transactions" 
ON public.budget_transactions 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Users can insert their own transactions
CREATE POLICY "Users can insert their own transactions" 
ON public.budget_transactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own transactions
CREATE POLICY "Users can update their own transactions" 
ON public.budget_transactions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Policy: Users can delete their own transactions
CREATE POLICY "Users can delete their own transactions" 
ON public.budget_transactions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Also add student_id to users if not exists
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS student_id text;
