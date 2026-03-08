import type { LocaleCode } from "@/hooks/use-locale";

const strings = {
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
} as const;

export type UIStrings = {
  [K in keyof typeof strings["ko"]]: (typeof strings["ko"])[K];
};

export function t(locale: LocaleCode) {
  return (strings[locale] ?? strings.ko) as UIStrings;
}
