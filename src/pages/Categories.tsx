import { Link } from "react-router-dom";
import { useCategories, useTerms } from "@/hooks/use-terms";
import { ArrowRight } from "lucide-react";

const Categories = () => {
  const { data: categories = [] } = useCategories();
  const { data: terms = [] } = useTerms();

  return (
    <div className="container py-8">
      <h1 className="font-mono text-2xl font-bold text-foreground mb-6">
        <span className="text-primary">$</span> 카테고리
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const catTerms = terms.filter((t) => t.categories.includes(cat.slug));
          return (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h2 className="font-mono text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {cat.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{cat.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-muted-foreground font-mono">{catTerms.length}개 용어</span>
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
