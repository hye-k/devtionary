import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useTerms } from "@/hooks/use-terms";
import { useLocale } from "@/hooks/use-locale";
import { t } from "@/i18n/strings";

export function SearchBar({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { locale } = useLocale();
  const { data: terms = [] } = useTerms(locale);
  const s = t(locale);

  const q = query.trim().toLowerCase();
  const filtered = q.length > 0
    ? terms.filter(
        (term) =>
          term.word.toLowerCase().includes(q) ||
          term.pronunciation_local.toLowerCase().includes(q) ||
          (q.length >= 2 && term.meaning_word.toLowerCase().includes(q))
      )
    : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={s.searchPlaceholder}
          className="w-full rounded-lg border border-border bg-card py-3 pl-12 pr-4 text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono hidden sm:block">
          ⌘K
        </span>
      </div>

      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-2 w-full max-h-[60vh] overflow-y-auto rounded-lg border border-border bg-popover shadow-xl">
          {filtered.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                navigate(`/term/${t.slug}`);
                setOpen(false);
                setQuery("");
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-secondary transition-colors"
            >
              <span className="font-mono text-sm font-medium text-primary">{t.word}</span>
              <span className="text-xs text-muted-foreground">{t.pronunciation_local}</span>
              <span className="ml-auto text-xs text-muted-foreground truncate max-w-[200px]">
                {t.meaning_word}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
