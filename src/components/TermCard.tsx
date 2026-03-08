import { Link } from "react-router-dom";
import { Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Term } from "@/hooks/use-terms";
import { useCategories } from "@/hooks/use-terms";

function speakWord(word: string) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  speechSynthesis.speak(utterance);
}

export function TermCard({ term }: { term: Term }) {
  const { data: categories = [] } = useCategories();

  return (
    <Link
      to={`/term/${term.id}`}
      className="group block rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 animate-fade-in"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-mono text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {term.word}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-mono text-xs">{term.ipa}</span>
            <span className="text-terminal-dim">·</span>
            <span>{term.pronunciation_kr}</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            speakWord(term.word);
          }}
          className="shrink-0 rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
          aria-label={`${term.word} 발음 듣기`}
        >
          <Volume2 className="h-4 w-4" />
        </button>
      </div>

      {term.abbreviation_of && (
        <p className="mt-2 font-mono text-xs text-accent">
          ← {term.abbreviation_of}
        </p>
      )}

      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
        {term.meaning_dev}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {term.categories.map((catSlug) => {
          const cat = categories.find((c) => c.slug === catSlug);
          return (
            <Badge
              key={catSlug}
              variant="secondary"
              className="text-xs font-mono"
            >
              {cat?.icon} {cat?.name ?? catSlug}
            </Badge>
          );
        })}
      </div>
    </Link>
  );
}
