import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TermExample {
  code: string;
  translation: string;
}

export interface TermTranslation {
  locale: string;
  pronunciation_local: string;
  meaning_en: string;
  meaning_dev: string;
  abbreviation_of?: string | null;
  examples?: TermExample[];
}

export interface Term {
  id: string;
  word: string;
  slug: string;
  ipa: string;
  pronunciation_local: string;
  abbreviation_of?: string | null;
  meaning_en: string;
  meaning_dev: string;
  categories: string[];
  examples: TermExample[];
  related_terms?: string[] | null;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  slug: string;
}

const DEFAULT_LOCALE = "ko";

function mergeTermWithTranslation(
  term: any,
  translation: TermTranslation | undefined
): Term {
  return {
    id: term.id,
    word: term.word,
    slug: term.slug,
    ipa: term.ipa,
    categories: term.categories,
    examples: (translation?.examples as unknown as TermExample[]) ?? [],
    related_terms: term.related_terms,
    pronunciation_local: translation?.pronunciation_local ?? "",
    meaning_en: translation?.meaning_en ?? "",
    meaning_dev: translation?.meaning_dev ?? "",
    abbreviation_of: translation?.abbreviation_of ?? null,
  };
}

export function useTerms(locale: string = DEFAULT_LOCALE) {
  return useQuery({
    queryKey: ["terms", locale],
    queryFn: async (): Promise<Term[]> => {
      const { data, error } = await supabase
        .from("terms")
        .select("*, term_translations!inner(*)")
        .eq("term_translations.locale", locale)
        .order("word");
      if (error) throw error;
      return (data ?? []).map((t: any) => {
        const tr = Array.isArray(t.term_translations)
          ? t.term_translations[0]
          : t.term_translations;
        return mergeTermWithTranslation(t, tr);
      });
    },
  });
}

export function useTerm(slug: string | undefined, locale: string = DEFAULT_LOCALE) {
  return useQuery({
    queryKey: ["term", slug, locale],
    queryFn: async (): Promise<Term | null> => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("terms")
        .select("*, term_translations!inner(*)")
        .eq("slug", slug)
        .eq("term_translations.locale", locale)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      const tr = Array.isArray((data as any).term_translations)
        ? (data as any).term_translations[0]
        : (data as any).term_translations;
      return mergeTermWithTranslation(data, tr);
    },
    enabled: !!slug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data ?? [];
    },
  });
}
