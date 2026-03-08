import { useEffect } from "react";
import { useLocale } from "@/hooks/use-locale";
import { meta } from "@/i18n/strings";

export function MetaTags() {
  const { locale } = useLocale();

  useEffect(() => {
    const m = meta(locale);
    document.title = m.title;
    document.documentElement.lang = locale;

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", m.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", m.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", m.description);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", m.title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", m.description);
  }, [locale]);

  return null;
}
