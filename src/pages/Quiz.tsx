import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTerms, useCategories, Term } from "@/hooks/use-terms";
import { useLocale } from "@/hooks/use-locale";
import { t } from "@/i18n/strings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  term: Term;
  exampleCode: string;
  exampleTranslation: string;
  correctAnswer: string;
  options: string[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function highlightTerm(code: string, word: string): string {
  const regex = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return code.replace(regex, "___");
}

function generateQuestions(terms: Term[], count: number): QuizQuestion[] {
  const eligible = terms.filter((t) => t.examples.length > 0 && t.meaning_dev);
  if (eligible.length < 4) return [];

  const selected = shuffle(eligible).slice(0, count);
  const allMeanings = eligible.map((t) => t.meaning_dev);

  return selected.map((term) => {
    const ex = term.examples[Math.floor(Math.random() * term.examples.length)];
    const correctAnswer = term.meaning_dev;

    const wrongPool = allMeanings.filter((m) => m !== correctAnswer);
    const wrongAnswers = shuffle(wrongPool).slice(0, 3);
    const options = shuffle([correctAnswer, ...wrongAnswers]);

    return {
      term,
      exampleCode: ex.code,
      exampleTranslation: ex.translation,
      correctAnswer,
      options,
    };
  });
}

type Phase = "select" | "quiz" | "result";

const QUESTION_COUNT = 10;

export default function Quiz() {
  const { locale } = useLocale();
  const s = t(locale);
  const { data: terms = [], isLoading: termsLoading } = useTerms(locale);
  const { data: categories = [] } = useCategories(locale);

  const [phase, setPhase] = useState<Phase>("select");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [currentQ, setCurrentQ] = useState(0);

  // Reset quiz when locale changes
  useEffect(() => {
    setPhase("select");
    setSelectedCategory(null);
    setQuestions([]);
    setAnswers([]);
    setCurrentQ(0);
  }, [locale]);

  const categoryTerms = useMemo(() => {
    if (!selectedCategory) return terms;
    return terms.filter((t) => t.categories.includes(selectedCategory));
  }, [terms, selectedCategory]);

  function startQuiz(catSlug: string | null) {
    setSelectedCategory(catSlug);
    const pool = catSlug ? terms.filter((t) => t.categories.includes(catSlug)) : terms;
    const qs = generateQuestions(pool, QUESTION_COUNT);
    if (qs.length === 0) return;
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setCurrentQ(0);
    setPhase("quiz");
  }

  function selectAnswer(qIdx: number, optIdx: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = optIdx;
      return next;
    });
  }

  function submit() {
    setPhase("result");
  }

  function reset() {
    setPhase("select");
    setSelectedCategory(null);
    setQuestions([]);
    setAnswers([]);
    setCurrentQ(0);
  }

  const score = useMemo(() => {
    if (phase !== "result") return 0;
    return questions.reduce((acc, q, i) => {
      const chosen = answers[i];
      if (chosen !== null && q.options[chosen] === q.correctAnswer) return acc + 1;
      return acc;
    }, 0);
  }, [phase, questions, answers]);

  const allAnswered = answers.every((a) => a !== null);

  if (termsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-muted-foreground animate-pulse">{s.loading}</p>
      </div>
    );
  }

  /* ── Category Selection ── */
  if (phase === "select") {
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
              onClick={() => startQuiz(null)}
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
                  onClick={() => startQuiz(cat.slug)}
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

  /* ── Quiz ── */
  if (phase === "quiz") {
    const q = questions[currentQ];
    return (
      <div className="min-h-screen">
        <div className="container py-10 max-w-2xl space-y-6">
          {/* Category & Progress */}
          {selectedCategory && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs">
                {categories.find((c) => c.slug === selectedCategory)?.icon}{" "}
                {categories.find((c) => c.slug === selectedCategory)?.name}
              </Badge>
            </div>
          )}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground font-mono">
              <span>
                {s.quizQuestion} {currentQ + 1} / {questions.length}
              </span>
              <span>
                {answers.filter((a) => a !== null).length} {s.quizAnswered}
              </span>
            </div>
            <Progress value={((currentQ + 1) / questions.length) * 100} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-lg text-primary">{s.quizPrompt}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Term word */}
              <div className="rounded-md bg-code-bg p-6 text-center">
                <span className="font-mono text-2xl font-bold text-primary">{q.term.word}</span>
              </div>

              {/* Options */}
              <div className="grid gap-2">
                {q.options.map((opt, i) => {
                  const isSelected = answers[currentQ] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => selectAnswer(currentQ, i)}
                      className={`text-left rounded-lg border p-3 text-sm transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      }`}
                    >
                      <span className="font-mono text-primary mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentQ((p) => Math.max(0, p - 1))}
              disabled={currentQ === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> {s.quizPrev}
            </Button>

            {currentQ < questions.length - 1 ? (
              <Button variant="outline" size="sm" onClick={() => setCurrentQ((p) => p + 1)}>
                {s.quizNext} <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button size="sm" onClick={submit} disabled={!allAnswered}>
                {s.quizSubmit}
              </Button>
            )}
          </div>

          {/* Quick nav dots */}
          <div className="flex justify-center gap-1.5 flex-wrap">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                className={`h-3 w-3 rounded-full transition-all ${
                  i === currentQ ? "bg-primary scale-125" : answers[i] !== null ? "bg-primary/40" : "bg-secondary"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Results ── */
  return (
    <div className="min-h-screen">
      <div className="container py-10 max-w-2xl space-y-8">
        {/* Score */}
        <Card className="border-primary/30 text-center">
          <CardContent className="pt-8 pb-6 space-y-4">
            <Trophy className="h-12 w-12 text-primary mx-auto" />
            <h2 className="font-mono text-3xl font-bold text-foreground">
              {score} / {questions.length}
            </h2>
            <p className="text-muted-foreground">
              {score === questions.length
                ? s.quizPerfect
                : score >= questions.length * 0.7
                  ? s.quizGreat
                  : s.quizKeepGoing}
            </p>
            <Progress value={(score / questions.length) * 100} className="h-3 max-w-xs mx-auto" />
            <Button onClick={reset} variant="outline" className="mt-4">
              <RotateCcw className="h-4 w-4 mr-1" /> {s.quizRetry}
            </Button>
          </CardContent>
        </Card>

        {/* Review */}
        <div className="space-y-3">
          {questions.map((q, i) => {
            const chosen = answers[i];
            const isCorrect = chosen !== null && q.options[chosen] === q.correctAnswer;
            return (
              <Card key={i} className={`border-l-4 ${isCorrect ? "border-l-primary" : "border-l-destructive"}`}>
                <CardContent className="py-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive shrink-0" />
                      )}
                      <Link
                        to={`/term/${q.term.slug}`}
                        className="font-mono font-bold text-foreground hover:text-primary transition-colors"
                      >
                        {q.term.word}
                      </Link>
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs shrink-0">
                      {i + 1}
                    </Badge>
                  </div>
                  <div className="rounded-md bg-code-bg p-2 font-mono text-xs">
                    <code>{q.exampleCode}</code>
                  </div>
                  <p className="text-xs text-muted-foreground">{q.exampleTranslation}</p>
                  {!isCorrect && chosen !== null && (
                    <p className="text-sm text-destructive line-through">{q.options[chosen]}</p>
                  )}
                  <p className="text-sm text-primary">
                    {s.quizCorrectAnswer}: {q.correctAnswer}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
