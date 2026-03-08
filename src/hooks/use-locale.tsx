import { createContext, useContext, useState, ReactNode, useMemo } from "react";

export const LOCALES = [
  { code: "en" as const, label: "English", flag: "🇺🇸" },
  { code: "ko" as const, label: "한국어", flag: "🇰🇷" },
  { code: "ja" as const, label: "日本語", flag: "🇯🇵" },
  { code: "fr" as const, label: "Français", flag: "🇫🇷" },
];

export type LocaleCode = "en" | "ko" | "ja" | "fr";

function detectLocale(): LocaleCode {
  const langs = navigator.languages ?? [navigator.language];
  for (const lang of langs) {
    const code = lang.split("-")[0].toLowerCase();
    if (code === "ko") return "ko";
    if (code === "ja") return "ja";
    if (code === "fr") return "fr";
  }
  return "en";
}

interface LocaleContextValue {
  locale: LocaleCode;
  setLocale: (l: LocaleCode) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<LocaleCode>(detectLocale);
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
