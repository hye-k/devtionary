import { useParams, Link } from "react-router-dom";
import { categories, terms } from "@/data/terms";
import { TermCard } from "@/components/TermCard";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CategoryDetail = () => {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const catTerms = terms.filter((t) => t.categories.includes(slug ?? ""));

  if (!category) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">카테고리를 찾을 수 없습니다.</p>
        <Link to="/categories" className="text-primary hover:underline mt-4 inline-block">카테고리 목록으로</Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Link to="/categories" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> 카테고리 목록
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
