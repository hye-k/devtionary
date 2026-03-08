import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Terminal, ChevronDown, Github } from "lucide-react";
import { useLocale, LOCALES } from "@/hooks/use-locale";
import { t } from "@/i18n/strings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header() {
  const { locale, setLocale } = useLocale();
  const s = t(locale);
  const current = LOCALES.find((l) => l.code === locale)!;

  return (
    <header className="sticky top-0 z-[90] overflow-visible border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex items-center gap-4 py-3 overflow-visible">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Terminal className="h-6 w-6 text-primary" />
          <span className="font-mono text-lg font-bold text-foreground">
            Dev<span className="text-primary">·</span>tionary
          </span>
        </Link>
        <SearchBar className="flex-1 max-w-xs hidden sm:block" />
        <nav className="ml-auto flex items-center gap-2 sm:gap-4 shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                {s.categories}
              </Link>
            </TooltipTrigger>
            <TooltipContent>{s.tooltipCategories}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/quiz" className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                {s.quiz}
              </Link>
            </TooltipTrigger>
            <TooltipContent>{s.tooltipQuiz}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/hye-k/devtionary/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub Issues"
              >
                <Github className="h-5 w-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>{s.tooltipGithub}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-foreground hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <span>{current.flag}</span>
                  <span className="hidden sm:inline">{current.label}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {LOCALES.map((l) => (
                    <DropdownMenuItem
                      key={l.code}
                      onClick={() => setLocale(l.code)}
                      className={locale === l.code ? "bg-secondary" : ""}
                    >
                      <span className="mr-2">{l.flag}</span>
                      {l.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>{s.tooltipLanguage}</TooltipContent>
          </Tooltip>
        </nav>
      </div>
    </header>
  );
}
