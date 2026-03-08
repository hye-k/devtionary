import { useLocale } from "@/hooks/use-locale";
import { useHtmlLang } from "@/hooks/use-html-lang";

export function HtmlLangSync() {
  const { locale } = useLocale();
  useHtmlLang(locale);
  return null;
}
