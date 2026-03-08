import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useTerms } from "@/hooks/use-terms";
import { useLocale } from "@/hooks/use-locale";
import { t } from "@/i18n/strings";

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 4.5;

function renderHighlightedText(text: string, query: string) {
  if (!query || !text.toLowerCase().startsWith(query.toLowerCase())) return text;

  const match = text.slice(0, query.length);
  const rest = text.slice(query.length);

  return (
    <>
      <mark className="rounded-sm bg-accent px-0.5 text-accent-foreground">{match}</mark>
      {rest}
    </>
  );
}

export function SearchBar({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { locale } = useLocale();
  const { data: terms = [] } = useTerms(locale);
  const s = t(locale);

  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      q.length > 0
        ? terms.filter(
            (term) =>
              term.word.toLowerCase().startsWith(q) ||
              term.pronunciation_local.toLowerCase().startsWith(q) ||
              (q.length >= 2 && term.meaning_word.toLowerCase().startsWith(q)),
          )
        : [],
    [q, terms],
  );

  useEffect(() => {
    setActiveIndex(-1);
  }, [q]);

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("[data-search-item]");
      items[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(index: number) {
    navigate(`/term/${filtered[index].slug}`);
    setOpen(false);
    setQuery("");
    setActiveIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
      return;
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(activeIndex);
      return;
    }

    if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div ref={ref} className={`relative overflow-visible ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            const next = e.target.value;
            setQuery(next);
            setOpen(next.trim().length > 0);
          }}
          onFocus={() => setOpen(q.length > 0)}
          onKeyDown={handleKeyDown}
          placeholder={s.searchPlaceholder}
          className="w-full rounded-lg border border-border bg-card py-3 pl-12 pr-4 font-mono text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <span className="absolute right-4 top-1/2 hidden -translate-y-1/2 font-mono text-xs text-muted-foreground sm:block">
          ⌘K
        </span>
      </div>

      {open && filtered.length > 0 && (
        <div
          ref={listRef}
          className="absolute left-0 top-full z-[200] mt-2 w-full overflow-y-auto rounded-lg border border-border bg-popover shadow-xl"
          style={{ maxHeight: `calc(${VISIBLE_ITEMS} * ${ITEM_HEIGHT}px)` }}
        >
          {filtered.map((term, i) => (
            <button
              key={term.id}
              data-search-item
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => handleSelect(i)}
              className={`flex h-12 w-full items-center gap-3 px-4 text-left transition-colors ${
                i === activeIndex ? "bg-secondary" : "bg-popover"
              }`}
              aria-selected={i === activeIndex}
            >
              <span className="font-mono text-sm font-medium text-primary">
                {renderHighlightedText(term.word, q)}
              </span>
              <span className="text-xs text-muted-foreground">
                {renderHighlightedText(term.pronunciation_local, q)}
              </span>
              <span className="ml-auto max-w-[200px] truncate text-xs text-muted-foreground">
                {renderHighlightedText(term.meaning_word, q)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

