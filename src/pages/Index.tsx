import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { TermCard } from "@/components/TermCard";
import { useTerms, useCategories, Term } from "@/hooks/use-terms";
import { useLocale } from "@/hooks/use-locale";
import { Volume2, Terminal, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function speakWord(word: string) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  speechSynthesis.speak(utterance);
}

const Index = () => {
  const { data: terms = [], isLoading: termsLoading } = useTerms();
  const { data: categories = [] } = useCategories();
  const [todayTerm, setTodayTerm] = useState<Term | null>(null);

  useEffect(() => {
    if (terms.length > 0) {
      const dayIndex = new Date().getDate() % terms.length;
      setTodayTerm(terms[dayIndex]);
    }
  }, [terms]);

  if (termsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-muted-foreground animate-pulse">loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative py-16 md:py-24">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="h-8 w-8 text-primary" />
            <h1 className="font-mono text-3xl md:text-5xl font-bold text-foreground">
              Dev<span className="text-primary">·</span>tionary
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-2">
            개발 영어 사전 — 매일 쓰는 개발 용어, 뜻을 알고 쓰자
          </p>
          <p className="text-sm text-muted-foreground mb-8 font-mono">
            <span className="text-primary">const</span> understanding = <span className="text-highlight">true</span>;{" "}
            <span className="text-muted-foreground/60">// 이해하고 쓰는 것과 모르고 쓰는 것은 천지차이</span>
          </p>
          <SearchBar className="max-w-xl" />
        </div>
      </section>

      <div className="container py-10 space-y-12">
        {/* 오늘의 단어 */}
        {todayTerm && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-mono text-primary">$</span>
              <h2 className="text-lg font-semibold text-foreground">오늘의 단어</h2>
            </div>
            <div className="rounded-lg border border-primary/30 bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link to={`/term/${todayTerm.id}`} className="font-mono text-2xl font-bold text-primary hover:underline">
                    {todayTerm.word}
                  </Link>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-mono">{todayTerm.ipa}</span>
                    <span>·</span>
                    <span>{todayTerm.pronunciation_local}</span>
                    <button
                      onClick={() => speakWord(todayTerm.word)}
                      className="rounded p-1 hover:bg-secondary transition-colors"
                      aria-label="발음 듣기"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  {todayTerm.abbreviation_of && (
                    <p className="mt-2 font-mono text-sm text-accent">← {todayTerm.abbreviation_of}</p>
                  )}
                </div>
                <Link to={`/term/${todayTerm.id}`} className="text-sm text-primary hover:underline shrink-0 flex items-center gap-1">
                  자세히 <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <p className="mt-3 text-muted-foreground">{todayTerm.meaning_dev}</p>
              {todayTerm.examples[0] && (
                <div className="mt-4 rounded-md bg-code-bg p-3 font-mono text-sm">
                  <code className="text-foreground">{todayTerm.examples[0].code}</code>
                  <p className="mt-1 text-muted-foreground text-xs">→ {todayTerm.examples[0].translation}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 카테고리 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-primary">$</span>
              <h2 className="text-lg font-semibold text-foreground">카테고리</h2>
            </div>
            <Link to="/categories" className="text-sm text-primary hover:underline flex items-center gap-1">
              전체 보기 <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const count = terms.filter((t) => t.categories.includes(cat.slug)).length;
              return (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="rounded-lg border border-border bg-card p-4 hover:border-primary/50 hover:shadow-md transition-all group"
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <h3 className="font-mono text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{count}개 용어</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 전체 용어 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-mono text-primary">$</span>
            <h2 className="text-lg font-semibold text-foreground">전체 용어</h2>
            <Badge variant="secondary" className="font-mono text-xs">{terms.length}</Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {terms.map((t) => (
              <TermCard key={t.id} term={t} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
