import { Globe, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-16">
      <div className="container max-w-5xl py-4 md:py-6 flex items-center justify-between text-xs md:text-sm text-muted-foreground">
        <p className="font-mono">© {new Date().getFullYear()} Devtionary</p>
        <div className="flex items-center gap-3">
          <a
            href="https://hye-k.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="Blog"
          >
            <Globe className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/hye-k"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
