import { useState, useEffect, useMemo, ReactNode } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { TermCard } from "@/components/TermCard";
import { useTerms, useCategories, Term } from "@/hooks/use-terms";
import { useLocale } from "@/hooks/use-locale";
import { t } from "@/i18n/strings";
import { Volume2, Terminal, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

function speakWord(word: string) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  speechSynthesis.speak(utterance);
}

const TERMS_PER_PAGE = 12;

function highlightWord(text: string, word: string): ReactNode {
  if (!word) return text;
  const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    regex.test(part) ? <span key={i} className="text-primary font-semibold">{part}</span> : part
  );
}

const Index = () => {
  const { locale } = useLocale();
  const s = t(locale);
  const { data: terms = [], isLoading: termsLoading } = useTerms(locale);
  const { data: categories = [] } = useCategories(locale);
  const [todayTerm, setTodayTerm] = useState<Term | null>(null);
  const [sampleQuizTerm, setSampleQuizTerm] = useState<Term | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(terms.length / TERMS_PER_PAGE);
  const paginatedTerms = useMemo(
    () => terms.slice((currentPage - 1) * TERMS_PER_PAGE, currentPage * TERMS_PER_PAGE),
    [terms, currentPage]
  );

  useEffect(() => {
    if (terms.length > 0) {
      const dayIndex = new Date().getDate() % terms.length;
      setTodayTerm(terms[dayIndex]);
    }
  }, [terms]);

  if (termsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-muted-foreground animate-pulse">{s.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative py-16 md:py-24">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="h-8 w-8 text-primary" />
            <h1 className="font-mono text-3xl md:text-5xl font-bold text-foreground">
              Dev<span className="text-primary">·</span>tionary
            </h1>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-2">
            {s.heroSubtitle}
          </p>
          <p className="text-sm text-muted-foreground mb-8 font-mono">
            <span className="text-primary">{s.heroCodeKw}</span> understanding = <span className="text-highlight">{s.heroCodeVal}</span>;{" "}
            <span className="text-muted-foreground/60">{s.heroCodeComment}</span>
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
              <h2 className="text-lg font-semibold text-foreground">{s.todayWord}</h2>
            </div>
            <div className="rounded-lg border border-primary/30 bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link to={`/term/${todayTerm.slug}`} className="font-mono text-2xl font-bold text-primary hover:underline">
                    {todayTerm.word}
                  </Link>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-mono">{todayTerm.ipa}</span>
                    <span>·</span>
                    <span>{todayTerm.pronunciation_local}</span>
                    <button
                      onClick={() => speakWord(todayTerm.word)}
                      className="rounded p-1 hover:bg-secondary transition-colors"
                      aria-label={s.listenPronunciation}
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  {todayTerm.abbreviation_of && (
                    <p className="mt-2 font-mono text-sm text-accent">← {todayTerm.abbreviation_of}</p>
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {todayTerm.categories.map((catSlug) => {
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
                <Link to={`/term/${todayTerm.slug}`} className="text-sm text-primary hover:underline shrink-0 flex items-center gap-1">
                  {s.detail} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <p className="mt-3 text-muted-foreground">{todayTerm.meaning_dev}</p>
              {todayTerm.examples[0] && (
                <div className="mt-4 rounded-md bg-code-bg p-3 font-mono text-sm">
                  <code className="text-foreground">{highlightWord(todayTerm.examples[0].code, todayTerm.word)}</code>
                  <p className="mt-1 text-muted-foreground text-xs">→ {highlightWord(todayTerm.examples[0].translation, todayTerm.word)}</p>
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
              <h2 className="text-lg font-semibold text-foreground">{s.categories}</h2>
            </div>
            <Link to="/categories" className="text-sm text-primary hover:underline flex items-center gap-1">
              {s.viewAll} <ArrowRight className="h-3 w-3" />
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
                  <p className="text-xs text-muted-foreground mt-1">{s.termCount(count)}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 퀴즈 프로모션 */}
        <section>
          <Link
            to="/quiz"
            className="group relative block rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-6 sm:p-8 hover:border-primary/40 hover:shadow-lg transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center justify-center rounded-lg bg-primary/10 p-3 shrink-0">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-mono text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {s.quizPromoTitle}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {s.quizPromoDesc}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shrink-0 group-hover:gap-2.5 transition-all">
                {s.quizPromoStart} <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </section>

        {/* 전체 용어 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-mono text-primary">$</span>
            <h2 className="text-lg font-semibold text-foreground">{s.allTerms}</h2>
            <Badge variant="secondary" className="font-mono text-xs">{terms.length}</Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedTerms.map((t) => (
              <TermCard key={t.id} term={t} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (totalPages <= 7 || page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => setCurrentPage(page)}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  if (page === 2 && currentPage > 3) {
                    return <PaginationItem key="start-ellipsis"><PaginationEllipsis /></PaginationItem>;
                  }
                  if (page === totalPages - 1 && currentPage < totalPages - 2) {
                    return <PaginationItem key="end-ellipsis"><PaginationEllipsis /></PaginationItem>;
                  }
                  return null;
                })}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </section>
      </div>
    </div>
  );
};

export default Index;
