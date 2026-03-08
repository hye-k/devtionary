import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TermExample {
  code: string;
  translation: string;
  source?: string;
}

export interface Term {
  id: string;
  word: string;
  ipa: string;
  pronunciation_kr: string;
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

export function useTerms() {
  return useQuery({
    queryKey: ["terms"],
    queryFn: async (): Promise<Term[]> => {
      const { data, error } = await supabase
        .from("terms")
        .select("*")
        .order("word");
      if (error) throw error;
      return (data ?? []).map((t) => ({
        ...t,
        examples: (t.examples as unknown as TermExample[]) ?? [],
      }));
    },
  });
}

export function useTerm(id: string | undefined) {
  return useQuery({
    queryKey: ["term", id],
    queryFn: async (): Promise<Term | null> => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("terms")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return { ...data, examples: (data.examples as unknown as TermExample[]) ?? [] };
    },
    enabled: !!id,
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
