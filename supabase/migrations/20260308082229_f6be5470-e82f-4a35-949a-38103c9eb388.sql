
-- Add examples column to term_translations
ALTER TABLE public.term_translations ADD COLUMN examples jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Copy examples from terms to their Korean translations
UPDATE public.term_translations tt
SET examples = t.examples
FROM public.terms t
WHERE tt.term_id = t.id AND tt.locale = 'ko';

-- Remove examples from terms table
ALTER TABLE public.terms DROP COLUMN examples;
