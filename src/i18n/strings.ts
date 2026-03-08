import type { LocaleCode } from "@/hooks/use-locale";

const META = {
  en: {
    title: "Devtionary - Dictionary for Developers",
    description: "A multilingual dictionary for developers. Look up programming terms with pronunciation, etymology, and plain-language explanations in your language.",
  },
  ko: {
    title: "Devtionary - 개발자를 위한 사전",
    description: "개발 용어를 한국어로 쉽게 풀어서 설명합니다. 매일 쓰는 프로그래밍 용어의 발음, 어원, 뜻을 한국어로 쉽게 찾아보세요.",
  },
  ja: {
    title: "Devtionary - 開発者のための辞書",
    description: "開発用語の多言語辞典。毎日使うプログラミング用語の発音・語源・意味を日本語でわかりやすく調べられます。",
  },
  fr: {
    title: "Devtionary - Le dictionnaire des développeurs",
    description: "Un dictionnaire multilingue pour les développeurs. Retrouvez la prononciation, l'étymologie et les explications en français des termes de programmation du quotidien.",
  },
} as const;

export function meta(locale: LocaleCode) {
  return META[locale] ?? META.en;
}

const strings = {
  en: {
    categories: "Categories",
    allCategories: "Categories",
    categoryList: "Category List",
    categoryNotFound: "Category not found.",
    toCategoryList: "Back to categories",
    todayWord: "Word of the Day",
    viewAll: "View all",
    allTerms: "All Terms",
    detail: "Details",
    goBack: "Go back",
    goHome: "Go home",
    termNotFound: "Term not found.",
    listenPronunciation: "Listen to pronunciation",
    abbreviationOf: "Abbreviation of",
    meaningWord: "English meaning",
    meaningDev: "Meaning in development",
    examples: "Examples",
    relatedTerms: "Related terms",
    searchPlaceholder: "Search terms... (English)",
    termCount: (n: number) => `${n} term${n !== 1 ? "s" : ""}`,
    heroSubtitle: "Developer Dictionary — Understand the terms you use every day",
    heroCode: (kw: string, val: string, comment: string) =>
      `${kw} understanding = ${val}; ${comment}`,
    heroCodeKw: "const",
    heroCodeVal: "true",
    heroCodeComment: "// Understanding what you use makes all the difference",
    loading: "loading...",
  },
  ko: {
    categories: "카테고리",
    allCategories: "카테고리",
    categoryList: "카테고리 목록",
    categoryNotFound: "카테고리를 찾을 수 없습니다.",
    toCategoryList: "카테고리 목록으로",
    todayWord: "오늘의 단어",
    viewAll: "전체 보기",
    allTerms: "전체 용어",
    detail: "자세히",
    goBack: "돌아가기",
    goHome: "홈으로 돌아가기",
    termNotFound: "용어를 찾을 수 없습니다.",
    listenPronunciation: "발음 듣기",
    abbreviationOf: "약어 풀이",
    meaningWord: "영어 뜻",
    meaningDev: "개발에서의 뜻",
    examples: "예문",
    relatedTerms: "관련 용어",
    searchPlaceholder: "용어 검색... (영어 또는 한글)",
    termCount: (n: number) => `${n}개 용어`,
    heroSubtitle: "개발 영어 사전 — 매일 쓰는 개발 용어, 뜻을 알고 쓰자",
    heroCode: (kw: string, val: string, comment: string) =>
      `${kw} understanding = ${val}; ${comment}`,
    heroCodeKw: "const",
    heroCodeVal: "true",
    heroCodeComment: "// 이해하고 쓰는 것과 모르고 쓰는 것은 천지차이",
    loading: "loading...",
  },
  ja: {
    categories: "カテゴリー",
    allCategories: "カテゴリー",
    categoryList: "カテゴリー一覧",
    categoryNotFound: "カテゴリーが見つかりません。",
    toCategoryList: "カテゴリー一覧へ",
    todayWord: "今日の単語",
    viewAll: "すべて見る",
    allTerms: "すべての用語",
    detail: "詳しく",
    goBack: "戻る",
    goHome: "ホームに戻る",
    termNotFound: "用語が見つかりません。",
    listenPronunciation: "発音を聞く",
    abbreviationOf: "略語の意味",
    meaningWord: "英語の意味",
    meaningDev: "開発での意味",
    examples: "例文",
    relatedTerms: "関連用語",
    searchPlaceholder: "用語を検索… (英語または日本語)",
    termCount: (n: number) => `${n}件の用語`,
    heroSubtitle: "開発英語辞典 — 毎日使う開発用語、意味を知って使おう",
    heroCode: (kw: string, val: string, comment: string) =>
      `${kw} understanding = ${val}; ${comment}`,
    heroCodeKw: "const",
    heroCodeVal: "true",
    heroCodeComment: "// 理解して使うのと知らずに使うのは天地の差",
    loading: "loading...",
  },
  fr: {
    categories: "Catégories",
    allCategories: "Catégories",
    categoryList: "Liste des catégories",
    categoryNotFound: "Catégorie introuvable.",
    toCategoryList: "Retour aux catégories",
    todayWord: "Mot du jour",
    viewAll: "Tout voir",
    allTerms: "Tous les termes",
    detail: "Détails",
    goBack: "Retour",
    goHome: "Retour à l'accueil",
    termNotFound: "Terme introuvable.",
    listenPronunciation: "Écouter la prononciation",
    abbreviationOf: "Abréviation de",
    meaningWord: "Sens en anglais",
    meaningDev: "Sens en développement",
    examples: "Exemples",
    relatedTerms: "Termes associés",
    searchPlaceholder: "Rechercher un terme… (anglais ou français)",
    termCount: (n: number) => `${n} terme${n > 1 ? "s" : ""}`,
    heroSubtitle: "Dictionnaire du développeur — Comprendre les termes que vous utilisez chaque jour",
    heroCode: (kw: string, val: string, comment: string) =>
      `${kw} understanding = ${val}; ${comment}`,
    heroCodeKw: "const",
    heroCodeVal: "true",
    heroCodeComment: "// Comprendre ce qu'on utilise fait toute la différence",
    loading: "loading...",
  },
} as const;

export type UIStrings = {
  [K in keyof typeof strings["ko"]]: (typeof strings["ko"])[K];
};

export function t(locale: LocaleCode) {
  return (strings[locale] ?? strings.en) as UIStrings;
}
