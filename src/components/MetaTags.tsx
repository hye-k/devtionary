import { useLocale } from "@/hooks/use-locale";
import { meta } from "@/i18n/strings";
import { usePageMeta } from "@/hooks/use-page-meta";

export function MetaTags() {
  const { locale } = useLocale();
  const m = meta(locale);

  usePageMeta({
    title: m.title,
    description: m.description,
    path: "/",
  });

  return null;
}
