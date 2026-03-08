import { Link, useNavigate } from "react-router-dom";
import { useTerms, useCategories } from "@/hooks/use-terms";
import { useLocale } from "@/hooks/use-locale";
import { t } from "@/i18n/strings";
import { usePageMeta } from "@/hooks/use-page-meta";
import { ArrowLeft } from "lucide-react";

export default function QuizSelect() {
  const { locale } = useLocale();
  const s = t(locale);
  const { data: terms = [], isLoading } = useTerms(locale);
  const { data: categories = [] } = useCategories(locale);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-muted-foreground animate-pulse">{s.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container py-10 space-y-8">
        <div>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="h-3 w-3" /> {s.goHome}
          </Link>
          <h1 className="font-mono text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
            <span className="text-primary">$</span> {s.quiz}
          </h1>
          <p className="text-muted-foreground mt-2">{s.quizDescription}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <button
            onClick={() => navigate("/quiz/all")}
            className="rounded-lg border border-primary/30 bg-card p-4 hover:border-primary hover:shadow-md transition-all text-left group"
          >
            <div className="text-2xl mb-2">🎲</div>
            <h3 className="font-mono text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {s.quizAllCategories}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {s.termCount(terms.filter((t) => t.examples.length > 0).length)}
            </p>
          </button>
          {categories.map((cat) => {
            const count = terms.filter((t) => t.categories.includes(cat.slug) && t.examples.length > 0).length;
            if (count < 4) return null;
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/quiz/${cat.slug}`)}
                className="rounded-lg border border-border bg-card p-4 hover:border-primary/50 hover:shadow-md transition-all text-left group"
              >
                <div className="text-2xl mb-2">{cat.icon}</div>
                <h3 className="font-mono text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{s.termCount(count)}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
