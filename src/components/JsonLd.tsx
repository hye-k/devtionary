import { useLocale } from "@/hooks/use-locale";
import { meta } from "@/i18n/strings";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://devtionary.lovable.app";

export function JsonLd() {
  const { locale } = useLocale();
  const m = meta(locale);
  const location = useLocation();

  useEffect(() => {
    const id = "jsonld-website";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const data = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Devtionary",
      url: BASE_URL,
      description: m.description,
      inLanguage: ["en", "ko", "ja", "fr"],
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };

    script.textContent = JSON.stringify(data);
  }, [locale, m.description]);

  return null;
}

interface TermJsonLdProps {
  word: string;
  slug: string;
  description: string;
  ipa: string;
}

export function TermJsonLd({ word, slug, description, ipa }: TermJsonLdProps) {
  useEffect(() => {
    const id = "jsonld-term";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const data = {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: word,
      url: `${BASE_URL}/term/${slug}`,
      description,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "Devtionary",
        url: BASE_URL,
      },
    };

    script.textContent = JSON.stringify(data);

    return () => {
      const el = document.getElementById(id);
      el?.remove();
    };
  }, [word, slug, description, ipa]);

  return null;
}
