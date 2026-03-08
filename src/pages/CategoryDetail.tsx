import { useParams, Link } from "react-router-dom";
import { useCategories, useTerms } from "@/hooks/use-terms";
import { useLocale } from "@/hooks/use-locale";
import { t } from "@/i18n/strings";
import { usePageMeta } from "@/hooks/use-page-meta";
import { TermCard } from "@/components/TermCard";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CategoryDetail = () => {
  const { slug } = useParams();
  const { locale } = useLocale();
  const s = t(locale);
  const { data: categories = [] } = useCategories(locale);
  const { data: terms = [] } = useTerms(locale);

  const category = categories.find((c) => c.slug === slug);
  const catTerms = terms.filter((t) => t.categories.includes(slug ?? ""));

  usePageMeta({
    title: category ? `${category.name} - Devtionary` : "Devtionary",
    description: category?.description ?? "",
    path: slug ? `/category/${slug}` : "/categories",
  });

  if (!category) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">{s.categoryNotFound}</p>
        <Link to="/categories" className="text-primary hover:underline mt-4 inline-block">{s.toCategoryList}</Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Link to="/categories" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> {s.categoryList}
      </Link>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category.icon}</span>
          <h1 className="font-mono text-2xl font-bold text-foreground">{category.name}</h1>
          <Badge variant="secondary" className="font-mono text-xs">{catTerms.length}</Badge>
        </div>
        <p className="text-muted-foreground">{category.description}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {catTerms.map((t) => (
          <TermCard key={t.id} term={t} />
        ))}
      </div>
    </div>
  );
};

export default CategoryDetail;
