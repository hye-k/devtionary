-- Create term_translations table
CREATE TABLE public.term_translations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  term_id UUID NOT NULL REFERENCES public.terms(id) ON DELETE CASCADE,
  locale TEXT NOT NULL DEFAULT 'ko',
  pronunciation_local TEXT NOT NULL,
  meaning_en TEXT NOT NULL,
  meaning_dev TEXT NOT NULL,
  abbreviation_of TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (term_id, locale)
);

-- Enable RLS
ALTER TABLE public.term_translations ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Translations are publicly readable" ON public.term_translations FOR SELECT USING (true);

-- Indexes
CREATE INDEX idx_term_translations_term_id ON public.term_translations (term_id);
CREATE INDEX idx_term_translations_locale ON public.term_translations (locale);

-- Timestamp trigger
CREATE TRIGGER update_term_translations_updated_at
  BEFORE UPDATE ON public.term_translations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Migrate existing Korean data from terms to term_translations
INSERT INTO public.term_translations (term_id, locale, pronunciation_local, meaning_en, meaning_dev, abbreviation_of)
SELECT id, 'ko', pronunciation_kr, meaning_en, meaning_dev, abbreviation_of
FROM public.terms;

-- Remove language-specific columns from terms table
ALTER TABLE public.terms DROP COLUMN pronunciation_kr;
ALTER TABLE public.terms DROP COLUMN meaning_en;
ALTER TABLE public.terms DROP COLUMN meaning_dev;
ALTER TABLE public.terms DROP COLUMN abbreviation_of;