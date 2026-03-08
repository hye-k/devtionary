import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Terminal } from "lucide-react";
import { useLocale, LOCALES } from "@/hooks/use-locale";

export function Header() {
  const { locale, setLocale } = useLocale();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex items-center gap-4 py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Terminal className="h-6 w-6 text-primary" />
          <span className="font-mono text-lg font-bold text-foreground">
            Dev<span className="text-primary">·</span>tionary
          </span>
        </Link>
        <SearchBar className="flex-1 max-w-lg hidden sm:block" />
        <nav className="ml-auto flex items-center gap-4">
          <Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            카테고리
          </Link>
          <div className="flex items-center gap-1 border border-border rounded-md overflow-hidden">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLocale(l.code)}
                className={`px-2 py-1 text-sm transition-colors ${
                  locale === l.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.flag}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
