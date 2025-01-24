export const ko = {
  common: {
    loading: '로딩 중...',
    error: '오류가 발생했습니다',
    save: '저장',
    cancel: '취소',
    confirm: '확인',
    back: '뒤로',
    next: '다음',
    close: '닫기',
    continue: '계속하기',
    skip: '건너뛰기',
    language: '언어'
  },
  menu: {
    settings: '설정',
    save_game: '게임 저장',
    load_game: '게임 불러오기',
    new_game: '새 게임',
    quit: '게임 종료',
    return_menu: '메인 메뉴로 돌아가기'
  },
  settings: {
    text_size: '텍스트 크기',
    text_size_normal: '보통',
    text_size_large: '크게'
  },
  navigation: {
    locations: '위치',
    goals: '활동',
    market: '시장',
    factions: '파벌',
    skills: '스킬'
  },
  resources: {
    credits: '크레딧 - 구매 및 결제에 사용할 수 있는 자금',
    condition: '컨디션 - 신체 개조의 건강 상태',
    stress: '스트레스 - 위험한 행동으로 인한 정신적 부담',
    energy: '에너지 - 이번 턴에서 수행할 수 있는 작업',
    reputation: '평판 - 당신에 대한 평가'
  },
  market: {
    buy: '구매',
    sell: '판매',
    price: '현재 가격',
    amount: '수량',
    total: '총 비용',
    inventory: '인벤토리',
    search: '상품 검색...',
    insufficient_funds: '크레딧이 부족합니다'
  },
  goals: {
    available: '사용 가능',
    active: '활성',
    completed: '완료',
    failed: '실패',
    requirements: '요구 사항',
    rewards: '보상',
    accept: '수락',
    invest: '투자',
    no_goals: '사용 가능한 목표가 없습니다'
  },
  tutorial: {
    skip: '튜토리얼 건너뛰기',
    next: '다음',
    previous: '이전'
  },
  character: {
    select_title: '캐릭터 선택',
    starting_skills: '초기 스킬',
    start_game: '게임 시작',
    creation_title: '당신은 누구입니까?',
    first_name: '이름',
    last_name: '성',
    pronouns: '대명사',
    pronouns_option: (option: string) => option,
    
    diplomat: {
      name: '외교관',
      title: '기업 협상가',
      description: '기업 거래에 대한 광범위한 경험을 가진 숙련된 협상가입니다.'
    },
    scout: {
      name: '정찰병',
      title: '심우주 탐험가',
      description: '뛰어난 관찰력을 가진 경험 많은 탐험가입니다.'
    },
    engineer: {
      name: '엔지니어',
      title: '기술 전문가',
      description: '심도 있는 기술 지식을 가진 뛰어난 문제 해결사입니다.'
    },
    soldier: {
      name: '군인',
      title: '보안 전문가',
      description: '탁월한 신체 조건을 가진 규율 있는 전투원입니다.'
    },
    smuggler: {
      name: '밀수업자',
      title: '독립 상인',
      description: '즉흥적 사고에 능숙한 빠르게 대처하는 상인입니다.'
    },
    scientist: {
      name: '과학자',
      title: '연구 전문가',
      description: '광범위한 학문적 지식을 가진 뛰어난 연구원입니다.'
    }
  },
  
  skills: {
    negotiation: '협상',
    observation: '관찰',
    improvisation: '즉흥',
    fitness: '체력',
    knowledge: '지식',
    stamina: '지구력',
    available: '사용 가능한 스킬',
    meets_requirement: '요구 사항 충족'
  },

  tasks: {
    attempt: '작업 시도',
    success: '성공!',
    failure: '실패',
    effects: '효과',
    gained_for: '획득한 경험치'
  }
};
