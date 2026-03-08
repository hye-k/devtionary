import { useEffect } from "react";
import type { LocaleCode } from "@/hooks/use-locale";

export function useHtmlLang(locale: LocaleCode) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
}
