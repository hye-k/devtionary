import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Terminal } from "lucide-react";

export function Header() {
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
        </nav>
      </div>
    </header>
  );
}
