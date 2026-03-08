import { ReactNode } from "react";
import { useParams, Link } from "react-router-dom";
import { useTerm, useTerms, useCategories } from "@/hooks/use-terms";
import { useLocale } from "@/hooks/use-locale";
import { t } from "@/i18n/strings";
import { usePageMeta } from "@/hooks/use-page-meta";
import { TermJsonLd } from "@/components/JsonLd";
import { Volume2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function speakWord(word: string) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  speechSynthesis.speak(utterance);
}

function highlightWord(text: string, word: string): ReactNode {
  if (!word) return text;
  const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    regex.test(part) ? <span key={i} className="text-primary font-semibold">{part}</span> : part
  );
}

const TermDetail = () => {
  const { slug } = useParams();
  const { locale } = useLocale();
  const s = t(locale);
  const { data: term, isLoading } = useTerm(slug, locale);
  const { data: allTerms = [] } = useTerms(locale);
  const { data: categories = [] } = useCategories(locale);

  usePageMeta({
    title: term ? `${term.word} - Devtionary` : "Devtionary",
    description: term ? `${term.meaning_word}. ${term.meaning_dev}` : "",
    path: slug ? `/term/${slug}` : "/",
  });

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        <p className="font-mono text-muted-foreground animate-pulse">{s.loading}</p>
      </div>
    );
  }

  if (!term) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">{s.termNotFound}</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">{s.goHome}</Link>
      </div>
    );
  }

  const relatedTerms = (term.related_terms ?? [])
    .filter((name): name is string => !!name)
    .map((name) => allTerms.find((t) => t.word.toLowerCase() === name.toLowerCase()))
    .filter(Boolean);

  return (
    <div className="container max-w-3xl py-8">
      <TermJsonLd
        word={term.word}
        slug={term.slug}
        description={`${term.meaning_word}. ${term.meaning_dev}`}
        ipa={term.ipa}
      />
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> {s.goBack}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-mono text-3xl md:text-4xl font-bold text-foreground">{term.word}</h1>
          <button
            onClick={() => speakWord(term.word)}
            className="rounded-lg p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            aria-label={s.listenPronunciation}
          >
            <Volume2 className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="font-mono text-sm">{term.ipa}</span>
          <span>·</span>
          <span className="text-sm">{term.pronunciation_local}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {term.categories.map((catSlug) => {
            const cat = categories.find((c) => c.slug === catSlug);
            return (
              <Link key={catSlug} to={`/category/${catSlug}`}>
                <Badge variant="secondary" className="font-mono text-xs hover:bg-primary/10 transition-colors">
                  {cat?.icon} {cat?.name ?? catSlug}
                </Badge>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 약어 풀이 */}
      {term.abbreviation_of && (
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-1">{s.abbreviationOf}</p>
          <p className="font-mono text-accent font-medium">{term.word} ← {term.abbreviation_of}</p>
        </div>
      )}

      {/* 뜻 풀이 */}
      <div className="space-y-6 mb-8">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-mono text-primary mb-2">
            <span className="text-primary/60">//</span> {s.meaningWord}
          </h2>
          <p className="text-foreground">{term.meaning_word}</p>
        </div>
        <div>
          <h2 className="flex items-center gap-2 text-sm font-mono text-primary mb-2">
            <span className="text-primary/60">//</span> {s.meaningDev}
          </h2>
          <p className="text-foreground leading-relaxed">{term.meaning_dev}</p>
        </div>
      </div>

      {/* 예문 */}
      <div className="mb-8">
        <h2 className="flex items-center gap-2 text-sm font-mono text-primary mb-3">
          <span className="text-primary/60">//</span> {s.examples}
        </h2>
        <div className="space-y-3">
          {term.examples.map((ex, i) => (
            <div key={i} className="rounded-lg bg-code-bg border border-border p-4">
              <pre className="font-mono text-sm text-foreground whitespace-pre-wrap overflow-x-auto">{highlightWord(ex.code, term.word)}</pre>
              <p className="mt-2 text-sm text-muted-foreground">→ {highlightWord(ex.translation, term.word)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 관련 용어 */}
      {relatedTerms.length > 0 && (
        <div>
          <h2 className="flex items-center gap-2 text-sm font-mono text-primary mb-3">
            <span className="text-primary/60">//</span> {s.relatedTerms}
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedTerms.map((rt) => (
              <Link
                key={rt!.id}
                to={`/term/${rt!.slug}`}
                className="rounded-md border border-border bg-card px-3 py-2 font-mono text-sm text-foreground hover:border-primary/50 hover:text-primary transition-all"
              >
                {rt!.word}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TermDetail;
