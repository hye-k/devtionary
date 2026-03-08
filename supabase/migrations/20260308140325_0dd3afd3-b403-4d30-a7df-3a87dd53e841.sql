
CREATE TABLE public.category_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  locale text NOT NULL DEFAULT 'ko',
  name text NOT NULL,
  description text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (category_id, locale)
);

ALTER TABLE public.category_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Category translations are publicly readable" ON public.category_translations
  FOR SELECT USING (true);

-- Korean
INSERT INTO public.category_translations (category_id, locale, name, description) VALUES
  ('fa8978ea-5a35-4e73-9ace-eae130333200', 'ko', 'CLI', 'CLI 명령어'),
  ('13f7af46-9081-4820-ab82-cbd62d64d5de', 'ko', 'Git', 'Git 명령어 및 용어'),
  ('000d473c-3186-4545-9c01-6e0a08ea60a4', 'ko', 'Java', 'Java 예약어 및 주요 용어'),
  ('578cdb3d-5d0e-4d73-b521-6efc5a857902', 'ko', 'JavaScript', 'JavaScript 핵심 문법 및 런타임 용어'),
  ('4bffc219-fb41-4ec8-abe1-9130ca6b4d52', 'ko', 'Python', 'Python 예약어 및 주요 용어'),
  ('f8661470-4a76-424a-aa9d-ab29ef86c880', 'ko', 'SQL', 'SQL 명령어 및 용어'),
  ('15b70876-593a-4ed2-ac16-0c845314fafd', 'ko', 'TypeScript', 'TypeScript 타입 시스템 및 고유 문법 용어'),
  ('3ef31e10-35c0-4cf1-9f08-23c07045024e', 'ko', '공식문서 표현', '공식 문서에서 자주 등장하는 표현'),
  ('b3299592-2b24-4439-8f55-2d1d9b759eb9', 'ko', '협업 표현', '실무 협업에서 자주 쓰는 표현');

-- English
INSERT INTO public.category_translations (category_id, locale, name, description) VALUES
  ('fa8978ea-5a35-4e73-9ace-eae130333200', 'en', 'CLI', 'CLI commands'),
  ('13f7af46-9081-4820-ab82-cbd62d64d5de', 'en', 'Git', 'Git commands and terminology'),
  ('000d473c-3186-4545-9c01-6e0a08ea60a4', 'en', 'Java', 'Java keywords and core terms'),
  ('578cdb3d-5d0e-4d73-b521-6efc5a857902', 'en', 'JavaScript', 'JavaScript core syntax and runtime terms'),
  ('4bffc219-fb41-4ec8-abe1-9130ca6b4d52', 'en', 'Python', 'Python keywords and core terms'),
  ('f8661470-4a76-424a-aa9d-ab29ef86c880', 'en', 'SQL', 'SQL commands and terminology'),
  ('15b70876-593a-4ed2-ac16-0c845314fafd', 'en', 'TypeScript', 'TypeScript type system and syntax terms'),
  ('3ef31e10-35c0-4cf1-9f08-23c07045024e', 'en', 'Docs Expressions', 'Common expressions in official documentation'),
  ('b3299592-2b24-4439-8f55-2d1d9b759eb9', 'en', 'Collaboration', 'Expressions used in team collaboration');

-- Japanese
INSERT INTO public.category_translations (category_id, locale, name, description) VALUES
  ('fa8978ea-5a35-4e73-9ace-eae130333200', 'ja', 'CLI', 'CLIコマンド'),
  ('13f7af46-9081-4820-ab82-cbd62d64d5de', 'ja', 'Git', 'Gitコマンドと用語'),
  ('000d473c-3186-4545-9c01-6e0a08ea60a4', 'ja', 'Java', 'Java予約語と主要用語'),
  ('578cdb3d-5d0e-4d73-b521-6efc5a857902', 'ja', 'JavaScript', 'JavaScriptの基本文法とランタイム用語'),
  ('4bffc219-fb41-4ec8-abe1-9130ca6b4d52', 'ja', 'Python', 'Python予約語と主要用語'),
  ('f8661470-4a76-424a-aa9d-ab29ef86c880', 'ja', 'SQL', 'SQLコマンドと用語'),
  ('15b70876-593a-4ed2-ac16-0c845314fafd', 'ja', 'TypeScript', 'TypeScriptの型システムと固有文法用語'),
  ('3ef31e10-35c0-4cf1-9f08-23c07045024e', 'ja', '公式ドキュメント表現', '公式ドキュメントで頻出する表現'),
  ('b3299592-2b24-4439-8f55-2d1d9b759eb9', 'ja', 'コラボレーション', '実務協業でよく使う表現');

-- French
INSERT INTO public.category_translations (category_id, locale, name, description) VALUES
  ('fa8978ea-5a35-4e73-9ace-eae130333200', 'fr', 'CLI', 'Commandes CLI'),
  ('13f7af46-9081-4820-ab82-cbd62d64d5de', 'fr', 'Git', 'Commandes et terminologie Git'),
  ('000d473c-3186-4545-9c01-6e0a08ea60a4', 'fr', 'Java', 'Mots-clés et termes principaux Java'),
  ('578cdb3d-5d0e-4d73-b521-6efc5a857902', 'fr', 'JavaScript', 'Syntaxe de base et termes runtime JavaScript'),
  ('4bffc219-fb41-4ec8-abe1-9130ca6b4d52', 'fr', 'Python', 'Mots-clés et termes principaux Python'),
  ('f8661470-4a76-424a-aa9d-ab29ef86c880', 'fr', 'SQL', 'Commandes et terminologie SQL'),
  ('15b70876-593a-4ed2-ac16-0c845314fafd', 'fr', 'TypeScript', 'Système de types et syntaxe TypeScript'),
  ('3ef31e10-35c0-4cf1-9f08-23c07045024e', 'fr', 'Expressions de documentation', 'Expressions courantes dans la documentation officielle'),
  ('b3299592-2b24-4439-8f55-2d1d9b759eb9', 'fr', 'Collaboration', 'Expressions courantes en collaboration professionnelle');
