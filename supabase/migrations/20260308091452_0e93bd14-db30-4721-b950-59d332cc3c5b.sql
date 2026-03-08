
ALTER TABLE public.terms ADD COLUMN slug text;

UPDATE public.terms SET slug = lower(replace(word, ' ', '-'));
UPDATE public.terms SET slug = 'git-head' WHERE word = 'HEAD' AND 'git' = ANY(categories);

ALTER TABLE public.terms ALTER COLUMN slug SET NOT NULL;
ALTER TABLE public.terms ADD CONSTRAINT terms_slug_unique UNIQUE (slug);
