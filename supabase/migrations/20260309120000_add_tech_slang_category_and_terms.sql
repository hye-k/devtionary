-- 판교사투리(Korean Tech Slang) 카테고리 및 용어 추가
-- Migration 추가: 새 카테고리 1개, 용어 10개, 다국어 번역 40개

-- 1. categories 테이블에 "Tech Slang / 판교사투리" 카테고리 추가
INSERT INTO public.categories (id, name, icon, slug, description)
VALUES (
  'c8e9f5a2-3b1d-4c8e-9f2a-1b3c5d7e9f0a'::uuid,
  'Tech Slang / 판교사투리',
  '🏢',
  'tech-slang',
  'Korean IT industry slang and expressions commonly used in Pangyo tech hub'
)
ON CONFLICT (slug) DO NOTHING;

-- 2. category_translations 테이블에 다국어 번역 추가
INSERT INTO public.category_translations (category_id, locale, name, description)
VALUES
  ('c8e9f5a2-3b1d-4c8e-9f2a-1b3c5d7e9f0a'::uuid, 'ko', '판교사투리', '한국 IT 업계에서 사용되는 특이한 은어와 표현들'),
  ('c8e9f5a2-3b1d-4c8e-9f2a-1b3c5d7e9f0a'::uuid, 'en', 'Tech Slang', 'Korean IT industry slang and expressions commonly used in Pangyo tech hub'),
  ('c8e9f5a2-3b1d-4c8e-9f2a-1b3c5d7e9f0a'::uuid, 'ja', 'Tech Slang (Korean)', 'パンゴのIT業界で一般的に使用されている韓国のスラングと表現'),
  ('c8e9f5a2-3b1d-4c8e-9f2a-1b3c5d7e9f0a'::uuid, 'fr', 'Tech Slang (Korean)', 'Argot et expressions spécifiques à l''industrie informatique coréenne, principalement utilisés dans la région de Pangyo')
ON CONFLICT (category_id, locale) DO NOTHING;

-- 3. terms 테이블에 10개 용어 추가
INSERT INTO public.terms (id, word, slug, ipa, categories)
VALUES
  ('d1a2b3c4-e5f6-47g8-h9i0-j1k2l3m4n5o6'::uuid, '오너십', 'ownership-korean', '/ˌoʊnərˈʃɪp/', '{tech-slang}'),
  ('d2a3b4c5-e6f7-48g9-h0i1-j2k3l4m5n6o7'::uuid, '스케일링', 'scaling-korean', '/ˈskeɪlɪŋ/', '{tech-slang}'),
  ('d3a4b5c6-e7f8-49g0-h1i2-j3k4l5m6n7o8'::uuid, '피봇', 'pivot-korean', '/ˈpɪvət/', '{tech-slang}'),
  ('d4a5b6c7-e8f9-40g1-h2i3-j4k5l6m7n8o9'::uuid, '온보딩', 'onboarding-korean', '/ˌɑːnˈbɔːrdɪŋ/', '{tech-slang}'),
  ('d5a6b7c8-e9f0-41g2-h3i4-j5k6l7m8n9o0'::uuid, '핸드오프', 'handoff-korean', '/ˈhændɔːf/', '{tech-slang}'),
  ('d6a7b8c9-e0f1-42g3-h4i5-j6k7l8m9n0o1'::uuid, '스프린트', 'sprint-korean', '/sprɪnt/', '{tech-slang}'),
  ('d7a8b9c0-e1f2-43g4-h5i6-j7k8l9m0n1o2'::uuid, '번다운', 'burndown-korean', '/ˈbɜːndaʊn/', '{tech-slang}'),
  ('d8a9b0c1-e2f3-44g5-h6i7-j8k9l0m1n2o3'::uuid, '씬스타트업', 'lean-startup-korean', '/liːn ˈstɑːrtʌp/', '{tech-slang}'),
  ('d9a0b1c2-e3f4-45g6-h7i8-j9k0l1m2n3o4'::uuid, 'MVP', 'mvp-korean', '/ˌɛmviːˈpiː/', '{tech-slang}'),
  ('d0a1b2c3-e4f5-46g7-h8i9-j0k1l2m3n4o5'::uuid, '번아웃', 'burnout-korean', '/ˈbɜːnaʊt/', '{tech-slang}')
ON CONFLICT (slug) DO NOTHING;

-- 4. term_translations 테이블에 다국어 번역 추가 (40개: 10 terms × 4 languages)

-- 4.1 오너십 (Ownership)
INSERT INTO public.term_translations (term_id, locale, pronunciation_local, meaning_word, meaning_dev, examples)
VALUES
  ('d1a2b3c4-e5f6-47g8-h9i0-j1k2l3m4n5o6'::uuid, 'ko', '오너십', 'ownership', '주인의식, 책임감 있게 일하는 태도. 팀 문화에서 자신의 업무뿐 아니라 전체 결과에 대한 책임감을 가지고 일하는 것.', '[{"code":"\"우리팀은 높은 오너십으로 유명해\"","translation":"Our team is known for their strong sense of ownership"},{"code":"\"이 프로젝트에 좀 더 오너십을 가져야 해\"","translation":"You need to take more ownership of this project"}]'::jsonb),
  ('d1a2b3c4-e5f6-47g8-h9i0-j1k2l3m4n5o6'::uuid, 'en', 'ownership', 'ownership', '[Korean IT Slang] Ownership (오너십): The mindset of taking personal responsibility for not just one's assigned tasks but the overall team results. A core value in Korean startup culture emphasizing proactive accountability.', '[{"code":"\"우리팀은 높은 오너십으로 유명해\"","translation":"Our team is known for their strong sense of ownership and accountability"},{"code":"\"이 프로젝트에 좀 더 오너십을 가져야 해\"","translation":"You should demonstrate more ownership of this project outcome"}]'::jsonb),
  ('d1a2b3c4-e5f6-47g8-h9i0-j1k2l3m4n5o6'::uuid, 'ja', 'オーナーシップ', 'ownership', '[韓国IT業界スラング] Ownership (オーナーシップ): 自分の担当タスクだけでなく、チーム全体の結果に対する責任を持つ姿勢。韓国のスタートアップ文化における重要な価値観。', '[{"code":"\"うちのチームは高いオーナーシップで有名だ\"","translation":"Our team is known for their strong sense of ownership"}]'::jsonb),
  ('d1a2b3c4-e5f6-47g8-h9i0-j1k2l3m4n5o6'::uuid, 'fr', 'ownership', 'ownership', '[Argot IT coréen] Ownership (오너십): L''état d''esprit de prendre la responsabilité personnelle non seulement de ses tâches assignées, mais aussi des résultats globaux de l''équipe. Une valeur fondamentale de la culture des startups coréennes.', '[{"code":"\"Notre équipe est connue pour son fort sens de la responsabilité\"","translation":"Our team is known for their strong sense of ownership and accountability"}]'::jsonb),

-- 4.2 스케일링 (Scaling)
('d2a3b4c5-e6f7-48g9-h0i1-j2k3l4m5n6o7'::uuid, 'ko', '스케일링', 'scaling', '사업이나 서비스를 빠르게 확대하는 과정. 초기 성공 모델을 유지하면서 규모를 키우는 전략.', '[{"code":"\"우리 지금 스케일링 단계인데 개발자가 부족해\"","translation":"We''re in the scaling phase but lack developers"},{"code":"\"MVP 출시 후 스케일링을 시작했어\"","translation":"We started scaling after MVP launch"}]'::jsonb),
('d2a3b4c5-e6f7-48g9-h0i1-j2k3l4m5n6o7'::uuid, 'en', 'scaling', 'scaling', '[Korean IT Slang] Scaling (스케일링): The process of rapidly expanding a business or service. Growing the user base and market share while maintaining the success formula of the initial product.', '[{"code":"\"우리 지금 스케일링 단계인데 개발자가 부족해\"","translation":"We''re in the scaling phase but lack developer resources"}]'::jsonb),
('d2a3b4c5-e6f7-48g9-h0i1-j2k3l4m5n6o7'::uuid, 'ja', 'スケーリング', 'scaling', '[韓国IT業界スラング] Scaling (スケーリング): ビジネスやサービスを急速に拡大するプロセス。初期モデルの成功を保ちながら規模を拡大する戦略。', '[{"code":"\"今はスケーリング段階だから資金が必要だ\"","translation":"We need funding because we''re in the scaling phase"}]'::jsonb),
('d2a3b4c5-e6f7-48g9-h0i1-j2k3l4m5n6o7'::uuid, 'fr', 'scaling', 'scaling', '[Argot IT coréen] Scaling (스케일링): Le processus d''expansion rapide d''une entreprise ou d''un service. Augmenter la base d''utilisateurs et la part de marché tout en maintenant la formule de succès initiale.', '[{"code":"\"On est en phase de scaling maintenant\"","translation":"We''re in the scaling phase right now"}]'::jsonb),

-- 4.3 피봇 (Pivot)
('d3a4b5c6-e7f8-49g0-h1i2-j3k4l5m6n7o8'::uuid, 'ko', '피봇', 'pivot', '사업 방향을 급전환하는 것. 초기 사업 모델이 작동하지 않을 때 다른 전략으로 방향을 바꾸는 의사결정.', '[{"code":"\"시장 반응이 안 좋으니까 피봇해야 할 것 같아\"","translation":"Market response isn''t good, so we might need to pivot"},{"code":"\"피봇을 통해 새로운 고객층을 발견했어\"","translation":"Through pivoting, we discovered a new customer segment"}]'::jsonb),
('d3a4b5c6-e7f8-49g0-h1i2-j3k4l5m6n7o8'::uuid, 'en', 'pivot', 'pivot', '[Korean IT Slang] Pivot (피봇): Making a sharp change in business direction when the initial model doesn''t work. A strategic decision to shift focus to a different customer segment or business approach.', '[{"code":"\"시장 반응이 안 좋으니까 피봇해야 할 것 같아\"","translation":"Market response isn''t good, we might need to pivot our business model"}]'::jsonb),
('d3a4b5c6-e7f8-49g0-h1i2-j3k4l5m6n7o8'::uuid, 'ja', 'ピボット', 'pivot', '[韓国IT業界スラング] Pivot (ピボット): 初期事業モデルが機能しない場合の戦略的方向転換。異なる顧客セグメントや事業アプローチに焦点を移す決定。', '[{"code":"\"市場の反応が悪いからピボットが必要だ\"","translation":"We need to pivot because the market response is poor"}]'::jsonb),
('d3a4b5c6-e7f8-49g0-h1i2-j3k4l5m6n7o8'::uuid, 'fr', 'pivot', 'pivot', '[Argot IT coréen] Pivot (피봇): Changement stratégique de direction commerciale quand le modèle initial ne fonctionne pas. Décision de rediriger l''effort vers un segment client ou une approche commerciale différente.', '[{"code":"\"Il faut pivoter si ça ne marche pas\"","translation":"We need to pivot if this doesn''t work"}]'::jsonb),

-- 4.4 온보딩 (Onboarding)
('d4a5b6c7-e8f9-40g1-h2i3-j4k5l6m7n8o9'::uuid, 'ko', '온보딩', 'onboarding', '신입 직원이나 새로운 팀원이 조직에 적응하는 과정. 교육, 문화 학습, 업무 인수인계 등을 포함.', '[{"code":"\"새로 온 팀원 온보딩 담당해줄 수 있어?\"","translation":"Can you handle the onboarding for the new team member?"},{"code":"\"온보딩이 잘 되면 팀 생산성이 올라가\"","translation":"Good onboarding increases team productivity"}]'::jsonb),
('d4a5b6c7-e8f9-40g1-h2i3-j4k5l6m7n8o9'::uuid, 'en', 'onboarding', 'onboarding', '[Korean IT Slang] Onboarding (온보딩): The process of integrating new employees or team members into the organization. Includes training, learning company culture, and task handover.', '[{"code":"\"새로 온 팀원 온보딩 담당해줄 수 있어?\"","translation":"Can you handle onboarding the new team member?"}]'::jsonb),
('d4a5b6c7-e8f9-40g1-h2i3-j4k5l6m7n8o9'::uuid, 'ja', 'オンボーディング', 'onboarding', '[韓国IT業界スラング] Onboarding (オンボーディング): 新入社員やチームメンバーが組織に適応するプロセス。トレーニング、文化学習、業務引き継ぎを含む。', '[{"code":"\"新しいメンバーのオンボーディングをお願いできる?\"","translation":"Can you handle the onboarding for the new member?"}]'::jsonb),
('d4a5b6c7-e8f9-40g1-h2i3-j4k5l6m7n8o9'::uuid, 'fr', 'onboarding', 'onboarding', '[Argot IT coréen] Onboarding (온보딩): Le processus d''intégration des nouveaux employés ou membres d''équipe dans l''organisation. Comprend la formation, l''apprentissage de la culture et le transfert de tâches.', '[{"code":"\"Tu peux m''aider avec l''onboarding du nouveau?\"","translation":"Can you help me with the new person''s onboarding?"}]'::jsonb),

-- 4.5 핸드오프 (Handoff)
('d5a6b7c8-e9f0-41g2-h3i4-j5k6l7m8n9o0'::uuid, 'ko', '핸드오프', 'handoff', '업무를 다른 사람이나 팀에게 인계하는 것. 명확한 소통과 문서화를 통해 책임을 이전하는 프로세스.', '[{"code":"\"QA팀으로 핸드오프 했으니 이제 우리 일 아니야\"","translation":"We handed off to QA team, so it''s not our responsibility anymore"},{"code":"\"핸드오프 문서를 제대로 작성해야 돼\"","translation":"We need to write clear handoff documentation"}]'::jsonb),
('d5a6b7c8-e9f0-41g2-h3i4-j5k6l7m8n9o0'::uuid, 'en', 'handoff', 'handoff', '[Korean IT Slang] Handoff (핸드오프): Transferring responsibility or work to another person or team. A process requiring clear communication and documentation.', '[{"code":"\"QA팀으로 핸드오프 했으니 이제 우리 일 아니야\"","translation":"We handed off to the QA team, so it''s no longer our responsibility"}]'::jsonb),
('d5a6b7c8-e9f0-41g2-h3i4-j5k6l7m8n9o0'::uuid, 'ja', 'ハンドオフ', 'handoff', '[韓国IT業界スラング] Handoff (ハンドオフ): 業務を別の人やチームに引き継ぐこと。明確なコミュニケーションと文書化が必要なプロセス。', '[{"code":"\"QAチームへのハンドオフが完了しました\"","translation":"The handoff to the QA team is complete"}]'::jsonb),
('d5a6b7c8-e9f0-41g2-h3i4-j5k6l7m8n9o0'::uuid, 'fr', 'handoff', 'handoff', '[Argot IT coréen] Handoff (핸드오프): Transfert de responsabilité ou de travail à une autre personne ou équipe. Un processus nécessitant une communication claire et une documentation.', '[{"code":"\"On a fait le handoff à l''équipe QA\"","translation":"We handed off to the QA team"}]'::jsonb),

-- 4.6 스프린트 (Sprint)
('d6a7b8c9-e0f1-42g3-h4i5-j6k7l8m9n0o1'::uuid, 'ko', '스프린트', 'sprint', '애자일 개발에서 2주 단위의 개발 사이클. 정해진 기간 내에 특정 기능을 완성하고 검토하는 반복 과정.', '[{"code":"\"이번 스프린트에서 API 개발 완료해야지\"","translation":"We need to complete API development this sprint"},{"code":"\"스프린트 계획 회의는 월요일에 있어\"","translation":"Sprint planning meeting is on Monday"}]'::jsonb),
('d6a7b8c9-e0f1-42g3-h4i5-j6k7l8m9n0o1'::uuid, 'en', 'sprint', 'sprint', '[Korean IT Slang] Sprint (스프린트): A time-boxed iteration in Agile development, typically lasting two weeks. A cycle where specific features are completed and reviewed within a fixed timeframe.', '[{"code":"\"이번 스프린트에서 API 개발 완료해야지\"","translation":"We need to complete the API development in this sprint"}]'::jsonb),
('d6a7b8c9-e0f1-42g3-h4i5-j6k7l8m9n0o1'::uuid, 'ja', 'スプリント', 'sprint', '[韓国IT業界スラング] Sprint (スプリント): アジャイル開発における2週間単位の反復開発サイクル。決められた期間内に特定の機能を完成させ、検視するプロセス。', '[{"code":"\"今スプリント内にAPI開発を完了しなきゃ\"","translation":"We need to complete API development this sprint"}]'::jsonb),
('d6a7b8c9-e0f1-42g3-h4i5-j6k7l8m9n0o1'::uuid, 'fr', 'sprint', 'sprint', '[Argot IT coréen] Sprint (스프린트): Un cycle de développement itératif dans Agile, d''une durée d''environ deux semaines. Une période au cours de laquelle des fonctionnalités spécifiques sont complétées et examinées.', '[{"code":"\"On doit terminer l''API ce sprint\"","translation":"We need to complete the API this sprint"}]'::jsonb),

-- 4.7 번다운 (Burndown)
('d7a8b9c0-e1f2-43g4-h5i6-j7k8l9m0n1o2'::uuid, 'ko', '번다운', 'burndown', '할 일 목록(백로그)을 줄여나가기. 각 스프린트에서 완료해야 할 작업의 진행 상황을 시각화하는 차트.', '[{"code":"\"번다운 차트 보니까 진도가 잘 안 나가네\"","translation":"The burndown chart shows we''re behind schedule"},{"code":"\"아직 번다운 못 했어, 할 일이 많네\"","translation":"We haven''t made much progress on our burndown; there''s still lots to do"}]'::jsonb),
('d7a8b9c0-e1f2-43g4-h5i6-j7k8l9m0n1o2'::uuid, 'en', 'burndown', 'burndown', '[Korean IT Slang] Burndown (번다운): Reducing the backlog of tasks. A chart showing progress on work that needs to be completed within each sprint.', '[{"code":"\"번다운 차트 보니까 진도가 잘 안 나가네\"","translation":"Looking at the burndown chart, we''re not making good progress"}]'::jsonb),
('d7a8b9c0-e1f2-43g4-h5i6-j7k8l9m0n1o2'::uuid, 'ja', 'バーンダウン', 'burndown', '[韓国IT業界スラング] Burndown (バーンダウン): バックログを削減すること。スプリント内で完了する必要があるタスクの進行状況を示すチャート。', '[{"code":"\"バーンダウンチャートを見ると進度が悪い\"","translation":"Looking at the burndown chart, progress isn''t good"}]'::jsonb),
('d7a8b9c0-e1f2-43g4-h5i6-j7k8l9m0n1o2'::uuid, 'fr', 'burndown', 'burndown', '[Argot IT coréen] Burndown (번다운): Réduire le backlog de tâches à faire. Un graphique affichant la progression du travail qui doit être complété dans chaque sprint.', '[{"code":"\"Le graphique de burndown montre qu''on n''avance pas bien\"","translation":"The burndown chart shows we''re not making good progress"}]'::jsonb),

-- 4.8 씬스타트업 (Lean Startup)
('d8a9b0c1-e2f3-44g5-h6i7-j8k9l0m1n2o3'::uuid, 'ko', '씬스타트업', 'lean-startup', '최소한의 자원과 인력으로 시작하는 스타트업. 낭비를 최소화하고 빠른 피드백 루프를 통해 성장하는 방식.', '[{"code":"\"우리는 씬스타트업이라 모든 사람이 멀티태스킹 중\"","translation":"We''re a lean startup so everyone is multitasking"},{"code":"\"씬스타트업 방식으로 가면 빠르게 검증할 수 있어\"","translation":"With a lean startup approach, we can validate quickly"}]'::jsonb),
('d8a9b0c1-e2f3-44g5-h6i7-j8k9l0m1n2o3'::uuid, 'en', 'lean-startup', 'lean-startup', '[Korean IT Slang] Lean Startup (씬스타트업): Starting with minimal resources and team size. A growth approach that minimizes waste and emphasizes rapid feedback loops.', '[{"code":"\"우리는 씬스타트업이라 모든 사람이 멀티태스킹 중\"","translation":"We''re a lean startup so everyone is multitasking"}]'::jsonb),
('d8a9b0c1-e2f3-44g5-h6i7-j8k9l0m1n2o3'::uuid, 'ja', 'リーンスタートアップ', 'lean-startup', '[韓国IT業界スラング] Lean Startup (リーンスタートアップ): 最小限のリソースと人員で始めるスタートアップ。無駄を最小化し、高速フィードバックループを通じて成長する方式。', '[{"code":"\"俺たちはリーンスタートアップだから全員マルチタスクだ\"","translation":"We''re a lean startup so everyone multitasks"}]'::jsonb),
('d8a9b0c1-e2f3-44g5-h6i7-j8k9l0m1n2o3'::uuid, 'fr', 'lean-startup', 'lean-startup', '[Argot IT coréen] Lean Startup (씬스타트업): Démarrer avec le minimum de ressources et de personnel. Une approche de croissance qui minimise le gaspillage par des boucles de retour d''information rapides.', '[{"code":"\"On est un lean startup donc tout le monde fait plusieurs tâches\"","translation":"We''re a lean startup so everyone is multitasking"}]'::jsonb),

-- 4.9 MVP (Minimum Viable Product)
('d9a0b1c2-e3f4-45g6-h7i8-j9k0l1m2n3o4'::uuid, 'ko', 'MVP', 'mvp', '최소 실행 가능 제품. 핵심 기능만 포함한 초기 버전으로 사용자 반응을 빠르게 파악하는 전략.', '[{"code":"\"MVP 출시는 했는데 기능이 너무 없어\"","translation":"We launched MVP but it has too few features"},{"code":"\"먼저 MVP로 시장 검증을 해야 돼\"","translation":"We need to validate the market with an MVP first"}]'::jsonb),
('d9a0b1c2-e3f4-45g6-h7i8-j9k0l1m2n3o4'::uuid, 'en', 'mvp', 'mvp', '[Korean IT Slang] MVP (엠브이피): Minimum Viable Product. An initial version with only core features, allowing quick validation of user demand and market fit.', '[{"code":"\"MVP 출시는 했는데 기능이 너무 없어\"","translation":"We launched MVP but it has very few features"}]'::jsonb),
('d9a0b1c2-e3f4-45g6-h7i8-j9k0l1m2n3o4'::uuid, 'ja', 'MVP', 'mvp', '[韓国IT業界スラング] MVP (エムブイピー): 最小限の実行可能製品。コア機能のみを含む初期版で、ユーザーの反応を迅速に把握する戦略。', '[{"code":"\"MVP をリリースしたが機能が少なすぎる\"","translation":"We released MVP but it has too few features"}]'::jsonb),
('d9a0b1c2-e3f4-45g6-h7i8-j9k0l1m2n3o4'::uuid, 'fr', 'mvp', 'mvp', '[Argot IT coréen] MVP (엠브이피): Produit Minimum Viable. Une version initiale avec seulement les fonctionnalités essentielles pour valider rapidement la demande utilisateur.', '[{"code":"\"On a lancé MVP mais avec trop peu de fonctionnalités\"","translation":"We launched MVP but with too few features"}]'::jsonb),

-- 4.10 번아웃 (Burnout)
('d0a1b2c3-e4f5-46g7-h8i9-j0k1l2m3n4o5'::uuid, 'ko', '번아웃', 'burnout', '과로로 인한 정신적/육체적 탈진. 장시간 고강도 업무로 인한 피로와 동기 상실 상태.', '[{"code":"\"요즘 번아웃 온 사람들 많네\"","translation":"A lot of people are experiencing burnout these days"},{"code":"\"번아웃을 피하려면 워라밸이 중요해\"","translation":"Work-life balance is important to prevent burnout"}]'::jsonb),
('d0a1b2c3-e4f5-46g7-h8i9-j0k1l2m3n4o5'::uuid, 'en', 'burnout', 'burnout', '[Korean IT Slang] Burnout (번아웃): Mental and physical exhaustion due to overwork. A state of fatigue and loss of motivation resulting from prolonged high-intensity work.', '[{"code":"\"요즘 번아웃 온 사람들 많네\"","translation":"A lot of people are experiencing burnout these days"}]'::jsonb),
('d0a1b2c3-e4f5-46g7-h8i9-j0k1l2m3n4o5'::uuid, 'ja', 'バーンアウト', 'burnout', '[韓国IT業界スラング] Burnout (バーンアウト): 過労による精神的/身体的疲弊。長時間の高強度業務による疲労と動機喪失の状態。', '[{"code":"\"最近バーンアウトしている人が多い\"","translation":"A lot of people are experiencing burnout these days"}]'::jsonb),
('d0a1b2c3-e4f5-46g7-h8i9-j0k1l2m3n4o5'::uuid, 'fr', 'burnout', 'burnout', '[Argot IT coréen] Burnout (번아웃): Épuisement mental et physique dû au surmenage. Un état de fatigue et de perte de motivation résultant d''un travail intensif prolongé.', '[{"code":"\"Beaucoup de gens souffrent d''un burnout ces jours-ci\"","translation":"A lot of people are experiencing burnout these days"}]'::jsonb)
ON CONFLICT (term_id, locale) DO NOTHING;
