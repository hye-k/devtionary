export interface TermExample {
  code: string;
  translation: string;
}

export interface Term {
  id: string;
  word: string;
  ipa: string;
  pronunciation_kr: string;
  abbreviation_of?: string;
  meaning_en: string;
  meaning_dev: string;
  categories: string[];
  examples: TermExample[];
  related_terms?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  slug: string;
}

export const categories: Category[] = [
  { id: "1", name: "JavaScript / TypeScript", icon: "⚡", description: "JS/TS 예약어 및 주요 용어", slug: "javascript" },
  { id: "2", name: "Python", icon: "🐍", description: "Python 예약어 및 주요 용어", slug: "python" },
  { id: "3", name: "Git", icon: "🌿", description: "Git 명령어 및 용어", slug: "git" },
  { id: "4", name: "SQL", icon: "🗄️", description: "SQL 명령어 및 용어", slug: "sql" },
  { id: "5", name: "CLI", icon: "💻", description: "CLI 명령어", slug: "cli" },
  { id: "6", name: "공식문서 표현", icon: "📖", description: "공식 문서에서 자주 등장하는 표현", slug: "docs" },
  { id: "7", name: "협업 표현", icon: "🤝", description: "실무 협업에서 자주 쓰는 표현", slug: "collaboration" },
  { id: "8", name: "Java", icon: "☕", description: "Java 예약어 및 주요 용어", slug: "java" },
];

export const terms: Term[] = [
  {
    id: "1",
    word: "branch",
    ipa: "/bræntʃ/",
    pronunciation_kr: "브랜치",
    meaning_en: "나뭇가지, 분기",
    meaning_dev: "코드의 독립적인 작업 흐름을 만드는 것. 나뭇가지(branch)가 줄기에서 갈라져 나오듯, 메인 코드에서 분기하여 별도의 작업을 진행할 수 있게 해준다.",
    categories: ["git"],
    examples: [
      { code: "git branch feature/login", translation: "feature/login이라는 새 가지(브랜치)를 만든다", source: "Git Documentation" },
      { code: "git checkout -b hotfix", translation: "hotfix라는 새 가지를 만들고 그 가지로 이동한다", source: "Git Documentation" },
    ],
    related_terms: ["merge", "checkout", "commit"],
  },
  {
    id: "2",
    word: "coalesce",
    ipa: "/ˌkoʊ.əˈles/",
    pronunciation_kr: "코얼레스",
    meaning_en: "합치다, 하나로 합쳐지다",
    meaning_dev: "여러 값 중 NULL이 아닌 첫 번째 값을 반환하는 SQL 함수. 여러 것이 '하나로 합쳐진다'는 원래 뜻에서, NULL 값들을 건너뛰고 유효한 값을 찾아 반환한다는 의미로 쓰인다.",
    categories: ["sql"],
    examples: [
      { code: "SELECT COALESCE(nickname, name, 'Anonymous') FROM users;", translation: "닉네임이 없으면 이름을, 이름도 없으면 'Anonymous'를 반환한다", source: "PostgreSQL Documentation" },
    ],
    related_terms: ["null", "select"],
  },
  {
    id: "3",
    word: "const",
    ipa: "/kɑːnst/",
    pronunciation_kr: "콘스트",
    abbreviation_of: "constant (상수, 변하지 않는 값)",
    meaning_en: "상수, 변하지 않는",
    meaning_dev: "한번 할당하면 다시 바꿀 수 없는 변수를 선언할 때 사용. 'constant(변하지 않는)'의 줄임말로, 값이 변하지 않음을 명시한다.",
    categories: ["javascript"],
    examples: [
      { code: "const MAX_RETRY = 3;", translation: "최대 재시도 횟수를 3으로 고정 선언한다", source: "MDN Web Docs" },
    ],
    related_terms: ["var", "let"],
  },
  {
    id: "4",
    word: "var",
    ipa: "/vɑːr/",
    pronunciation_kr: "바",
    abbreviation_of: "variable (변수, 변할 수 있는 값)",
    meaning_en: "변수",
    meaning_dev: "'variable(변할 수 있는)'의 줄임말. 값이 바뀔 수 있는 저장 공간을 선언한다. ES6 이후에는 let과 const가 권장된다.",
    categories: ["javascript"],
    examples: [
      { code: "var count = 0;", translation: "count라는 변수를 0으로 선언한다", source: "MDN Web Docs" },
    ],
    related_terms: ["const", "let"],
  },
  {
    id: "5",
    word: "merge",
    ipa: "/mɜːrdʒ/",
    pronunciation_kr: "머지",
    meaning_en: "병합하다, 합치다",
    meaning_dev: "두 개의 브랜치(가지)를 하나로 합치는 것. 분기하여 작업한 코드를 다시 원래 줄기에 합쳐 넣는 과정이다.",
    categories: ["git"],
    examples: [
      { code: "git merge feature/login", translation: "feature/login 가지의 변경사항을 현재 가지에 합친다", source: "Git Documentation" },
    ],
    related_terms: ["branch", "rebase", "pull"],
  },
  {
    id: "6",
    word: "commit",
    ipa: "/kəˈmɪt/",
    pronunciation_kr: "커밋",
    meaning_en: "약속하다, 전념하다, (기록을) 확정하다",
    meaning_dev: "변경사항을 저장소에 확정 기록하는 것. '확정하여 맡긴다'는 원래 뜻처럼, 작업 내용을 영구적으로 기록한다.",
    categories: ["git"],
    examples: [
      { code: 'git commit -m "Fix login bug"', translation: '"로그인 버그 수정"이라는 메시지와 함께 변경사항을 확정한다', source: "Git Documentation" },
    ],
    related_terms: ["push", "branch", "merge"],
  },
  {
    id: "7",
    word: "push",
    ipa: "/pʊʃ/",
    pronunciation_kr: "푸시",
    meaning_en: "밀다, 밀어 넣다",
    meaning_dev: "로컬의 커밋(확정 기록)을 원격 저장소로 밀어 올리는 것. 내 컴퓨터의 변경사항을 서버로 '밀어 넣는' 행위이다.",
    categories: ["git"],
    examples: [
      { code: "git push origin main", translation: "main 가지의 변경사항을 원격 저장소(origin)로 밀어 올린다", source: "Git Documentation" },
    ],
    related_terms: ["pull", "commit", "remote"],
  },
  {
    id: "8",
    word: "pull",
    ipa: "/pʊl/",
    pronunciation_kr: "풀",
    meaning_en: "당기다, 끌어오다",
    meaning_dev: "원격 저장소의 변경사항을 로컬로 당겨오는 것. 서버의 최신 코드를 내 컴퓨터로 '끌어당기는' 행위이다.",
    categories: ["git"],
    examples: [
      { code: "git pull origin main", translation: "원격 저장소(origin)의 main 가지 변경사항을 당겨온다", source: "Git Documentation" },
    ],
    related_terms: ["push", "fetch", "merge"],
  },
  {
    id: "9",
    word: "deploy",
    ipa: "/dɪˈplɔɪ/",
    pronunciation_kr: "디플로이",
    meaning_en: "배치하다, 전개하다 (원래 군사 용어)",
    meaning_dev: "완성된 코드를 실제 서버에 배치하여 사용자가 접근할 수 있게 만드는 것. 군대가 부대를 '전개'하듯, 코드를 실전 환경에 내보내는 것이다.",
    categories: ["collaboration"],
    examples: [
      { code: "We need to deploy the hotfix to production ASAP.", translation: "핫픽스를 프로덕션(실서버)에 가능한 빨리 배치(디플로이)해야 합니다." },
    ],
    related_terms: ["build", "release"],
  },
  {
    id: "10",
    word: "concatenate",
    ipa: "/kənˈkæt.ə.neɪt/",
    pronunciation_kr: "컨캐터네이트",
    abbreviation_of: "concat은 concatenate의 줄임말",
    meaning_en: "사슬처럼 잇다, 연결하다",
    meaning_dev: "두 개 이상의 문자열이나 배열을 하나로 이어붙이는 것. 라틴어 'catena(사슬)'에서 유래하여, 데이터를 사슬처럼 연결한다는 뜻이다.",
    categories: ["javascript", "sql"],
    examples: [
      { code: "'Hello' + ' ' + 'World' // or 'Hello'.concat(' ', 'World')", translation: "'Hello'와 'World'를 이어붙여 'Hello World'를 만든다", source: "MDN Web Docs" },
      { code: "SELECT CONCAT(first_name, ' ', last_name) FROM users;", translation: "이름과 성을 이어붙여(연결하여) 하나의 문자열로 만든다", source: "MySQL Documentation" },
    ],
    related_terms: ["string", "array"],
  },
  {
    id: "11",
    word: "function",
    ipa: "/ˈfʌŋk.ʃən/",
    pronunciation_kr: "펑션",
    meaning_en: "기능, 함수",
    meaning_dev: "특정 작업을 수행하는 코드 블록. 수학의 '함수'처럼 입력을 받아 처리하고 결과를 반환한다. func, fn 등으로 줄여 쓴다.",
    categories: ["javascript", "python"],
    examples: [
      { code: "function greet(name) { return `Hello, ${name}!`; }", translation: "이름을 받아 인사말을 반환하는 기능(함수)을 정의한다", source: "MDN Web Docs" },
    ],
    related_terms: ["return", "parameter"],
  },
  {
    id: "12",
    word: "iterate",
    ipa: "/ˈɪt.ə.reɪt/",
    pronunciation_kr: "이터레이트",
    meaning_en: "반복하다",
    meaning_dev: "배열이나 컬렉션의 각 요소를 하나씩 순회하며 처리하는 것. '반복한다'는 원래 뜻 그대로, 데이터를 하나씩 돌며 작업한다.",
    categories: ["javascript", "python"],
    examples: [
      { code: "for (const item of items) { console.log(item); }", translation: "items의 각 항목을 하나씩 순회(반복)하며 출력한다", source: "MDN Web Docs" },
    ],
    related_terms: ["loop", "forEach", "map"],
  },
  {
    id: "13",
    word: "refactor",
    ipa: "/ˌriːˈfæk.tər/",
    pronunciation_kr: "리팩터",
    meaning_en: "다시 구성하다 (re + factor)",
    meaning_dev: "코드의 동작은 바꾸지 않으면서 내부 구조를 개선하는 것. 'factor(요소를 나누다)'에 're(다시)'를 붙여, 코드를 다시 잘 나누어 정리한다는 뜻이다.",
    categories: ["collaboration"],
    examples: [
      { code: "Let's refactor this component to separate concerns.", translation: "이 컴포넌트를 관심사 분리를 위해 리팩터(재구성)합시다." },
    ],
    related_terms: ["clean code", "technical debt"],
  },
  {
    id: "14",
    word: "deprecated",
    ipa: "/ˈdep.rə.keɪ.tɪd/",
    pronunciation_kr: "데프리케이티드",
    meaning_en: "더 이상 권장하지 않는, 사용 중단 예정인",
    meaning_dev: "아직 동작하지만 더 이상 사용이 권장되지 않는 기능이나 API. 향후 버전에서 제거될 수 있으므로 대체 방법을 사용해야 한다.",
    categories: ["docs"],
    examples: [
      { code: "/** @deprecated Use newMethod() instead */", translation: "이 메서드는 더 이상 권장되지 않습니다. newMethod()를 대신 사용하세요.", source: "JSDoc" },
    ],
    related_terms: ["legacy", "obsolete"],
  },
  {
    id: "15",
    word: "out of the box",
    ipa: "/aʊt əv ðə bɑːks/",
    pronunciation_kr: "아웃 오브 더 박스",
    meaning_en: "상자에서 꺼내자마자 바로 (사용 가능한)",
    meaning_dev: "별도의 설정이나 추가 작업 없이 기본 상태에서 바로 사용 가능한 기능을 뜻한다. '상자에서 꺼내자마자 바로 쓸 수 있는'이라는 비유이다.",
    categories: ["docs"],
    examples: [
      { code: "React supports JSX out of the box.", translation: "React는 JSX를 별도 설정 없이 바로(out of the box) 지원한다.", source: "React Documentation" },
    ],
    related_terms: ["under the hood", "boilerplate"],
  },
  {
    id: "16",
    word: "under the hood",
    ipa: "/ˈʌn.dər ðə hʊd/",
    pronunciation_kr: "언더 더 후드",
    meaning_en: "자동차 보닛 아래에 (= 내부적으로)",
    meaning_dev: "겉으로 보이지 않는 내부 동작 방식을 설명할 때 쓰는 표현. 자동차 보닛(hood) 아래의 엔진처럼, 소프트웨어의 내부 구현을 가리킨다.",
    categories: ["docs"],
    examples: [
      { code: "Under the hood, React uses a virtual DOM for efficient updates.", translation: "내부적으로(under the hood), React는 효율적인 업데이트를 위해 가상 DOM을 사용한다.", source: "React Documentation" },
    ],
    related_terms: ["out of the box", "abstraction"],
  },
  {
    id: "17",
    word: "let",
    ipa: "/let/",
    pronunciation_kr: "렛",
    meaning_en: "허락하다, ~하게 하다",
    meaning_dev: "블록 스코프 변수를 선언할 때 사용. '~하게 하다(let)'라는 뜻으로, 수학에서 'let x = 5 (x를 5라 하자)'와 같은 용법에서 유래했다.",
    categories: ["javascript"],
    examples: [
      { code: "let count = 0; count++;", translation: "count를 0으로 선언하고, 1을 더한다", source: "MDN Web Docs" },
    ],
    related_terms: ["const", "var"],
  },
  {
    id: "18",
    word: "fetch",
    ipa: "/fetʃ/",
    pronunciation_kr: "페치",
    meaning_en: "가져오다, 불러오다",
    meaning_dev: "서버에서 데이터를 가져오는(요청하는) 것. 강아지가 공을 '물어오듯(fetch)', 원격 서버에서 데이터를 가져오는 행위이다.",
    categories: ["javascript", "git"],
    examples: [
      { code: "const response = await fetch('/api/users');", translation: "/api/users 경로에서 데이터를 가져온다(fetch)", source: "MDN Web Docs" },
      { code: "git fetch origin", translation: "원격 저장소(origin)의 최신 정보를 가져온다(fetch)", source: "Git Documentation" },
    ],
    related_terms: ["pull", "request", "API"],
  },
  {
    id: "19",
    word: "boolean",
    ipa: "/ˈbuː.li.ən/",
    pronunciation_kr: "불리언",
    meaning_en: "참(true) 또는 거짓(false)만 가지는 자료형",
    meaning_dev: "true(참) 또는 false(거짓) 두 가지 값만 가질 수 있는 데이터 타입. 영국 수학자 George Boole의 이름에서 유래했다.",
    categories: ["javascript", "python", "java"],
    examples: [
      { code: "const isLoggedIn: boolean = true;", translation: "로그인 여부를 참(true)으로 설정한다", source: "TypeScript Documentation" },
    ],
    related_terms: ["true", "false", "conditional"],
  },
  {
    id: "20",
    word: "checkout",
    ipa: "/ˈtʃek.aʊt/",
    pronunciation_kr: "체크아웃",
    meaning_en: "확인하고 나가다, (호텔에서) 퇴실하다",
    meaning_dev: "다른 브랜치(가지)로 작업 환경을 전환하는 것. 호텔에서 체크아웃하고 다른 곳으로 이동하듯, 현재 작업 위치를 다른 브랜치로 옮긴다.",
    categories: ["git"],
    examples: [
      { code: "git checkout develop", translation: "develop 가지(브랜치)로 작업 환경을 전환한다", source: "Git Documentation" },
    ],
    related_terms: ["branch", "switch"],
  },
  {
    id: "21",
    word: "SELECT",
    ipa: "/sɪˈlekt/",
    pronunciation_kr: "셀렉트",
    meaning_en: "고르다, 선택하다",
    meaning_dev: "데이터베이스에서 원하는 데이터를 골라서(선택하여) 조회하는 SQL 명령어. '선택한다'는 뜻 그대로, 테이블에서 필요한 열과 행을 골라낸다.",
    categories: ["sql"],
    examples: [
      { code: "SELECT name, email FROM users WHERE active = true;", translation: "활성 상태인 사용자의 이름과 이메일을 골라(선택하여) 조회한다", source: "PostgreSQL Documentation" },
    ],
    related_terms: ["where", "from", "join"],
  },
  {
    id: "22",
    word: "sudo",
    ipa: "/ˈsuː.duː/",
    pronunciation_kr: "수두",
    abbreviation_of: "superuser do (최고 관리자 권한으로 실행)",
    meaning_en: "최고 관리자로서 실행하다",
    meaning_dev: "'superuser do'의 줄임말로, 관리자(root) 권한으로 명령어를 실행할 때 사용. 일반 사용자로는 할 수 없는 시스템 수준 작업을 수행할 수 있게 해준다.",
    categories: ["cli"],
    examples: [
      { code: "sudo apt-get install nodejs", translation: "관리자 권한으로(sudo) Node.js를 설치한다", source: "Ubuntu Documentation" },
    ],
    related_terms: ["chmod", "root"],
  },
  {
    id: "23",
    word: "LGTM",
    ipa: "/ˌel.dʒiː.tiːˈem/",
    pronunciation_kr: "엘지티엠",
    abbreviation_of: "Looks Good To Me (나한테 괜찮아 보인다)",
    meaning_en: "나한테 괜찮아 보인다",
    meaning_dev: "코드 리뷰에서 '코드를 확인했고 문제없다'는 승인의 의미로 사용하는 약어. 리뷰어가 PR(Pull Request)을 승인할 때 자주 남기는 코멘트이다.",
    categories: ["collaboration"],
    examples: [
      { code: "LGTM! Let's merge this.", translation: "좋아 보입니다! 이거 합칩시다(머지합시다)." },
    ],
    related_terms: ["PR", "code review"],
  },
  {
    id: "24",
    word: "rebase",
    ipa: "/ˌriːˈbeɪs/",
    pronunciation_kr: "리베이스",
    meaning_en: "기반(base)을 다시(re) 설정하다",
    meaning_dev: "현재 브랜치의 시작점(base)을 다른 브랜치의 최신 커밋으로 옮기는 것. merge와 달리 히스토리를 깔끔하게 일직선으로 유지할 수 있다.",
    categories: ["git"],
    examples: [
      { code: "git rebase main", translation: "현재 가지의 기반을 main 가지의 최신 상태로 다시 설정한다", source: "Git Documentation" },
    ],
    related_terms: ["merge", "branch", "squash"],
  },
  {
    id: "25",
    word: "def",
    ipa: "/def/",
    pronunciation_kr: "데프",
    abbreviation_of: "define (정의하다)",
    meaning_en: "정의하다",
    meaning_dev: "Python에서 함수를 정의(define)할 때 사용하는 키워드. '정의하다'의 줄임말로, 새로운 함수를 만들겠다는 선언이다.",
    categories: ["python"],
    examples: [
      { code: "def calculate_total(items):\n    return sum(item.price for item in items)", translation: "항목들의 총합을 계산하는 함수를 정의(define)한다", source: "Python Documentation" },
    ],
    related_terms: ["function", "return", "lambda"],
  },
];
