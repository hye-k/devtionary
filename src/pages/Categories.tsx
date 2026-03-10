import { Link } from "react-router-dom";
import { useCategories, useTerms } from "@/hooks/use-terms";
import { useLocale } from "@/hooks/use-locale";
import { t } from "@/i18n/strings";
import { usePageMeta } from "@/hooks/use-page-meta";
import { ArrowRight } from "lucide-react";

const Categories = () => {
  const { locale } = useLocale();
  const s = t(locale);
  const { data: categories = [] } = useCategories(locale);
  const { data: terms = [] } = useTerms(locale);

  usePageMeta({
    title: `${s.allCategories} - Devtionary`,
    description: s.heroSubtitle,
    path: "/categories",
  });

  return (
    <div className="container py-6 md:py-8 lg:py-10">
      <h1 className="font-mono text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4 md:mb-6">
        <span className="text-primary">$</span> {s.allCategories}
      </h1>
      <div className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const catTerms = terms.filter((t) => t.categories.includes(cat.slug));
          return (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group rounded-lg border border-border bg-card p-4 md:p-5 lg:p-6 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="text-2xl md:text-3xl mb-2 md:mb-3">{cat.icon}</div>
              <h2 className="font-mono text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {cat.name}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{cat.description}</p>
              <div className="flex items-center justify-between mt-3 md:mt-4">
                <span className="text-xs md:text-sm text-muted-foreground font-mono">{s.termCount(catTerms.length)}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
