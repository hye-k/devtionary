import { createContext, useContext, useState, ReactNode } from "react";

export const LOCALES = [
  { code: "ko" as const, label: "한국어", flag: "🇰🇷" },
  { code: "ja" as const, label: "日本語", flag: "🇯🇵" },
];

export type LocaleCode = "ko" | "ja";

interface LocaleContextValue {
  locale: LocaleCode;
  setLocale: (l: LocaleCode) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "ko",
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<LocaleCode>("ko");
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
