export const ja = {
  common: {
    loading: '読み込み中...',
    error: 'エラーが発生しました',
    save: '保存',
    cancel: 'キャンセル',
    confirm: '確認',
    back: '戻る',
    next: '次へ',
    close: '閉じる',
    continue: '続ける',
    skip: 'スキップ',
    language: '言語'
  },
  menu: {
    settings: '設定',
    save_game: 'ゲームを保存',
    load_game: 'ゲームを読み込む',
    new_game: '新しいゲーム',
    quit: 'ゲームを終了',
    return_menu: 'メインメニューに戻る'
  },
  settings: {
    text_size: 'テキストサイズ',
    text_size_normal: '通常',
    text_size_large: '大きい'
  },
  navigation: {
    locations: '場所',
    goals: '活動',
    market: '市場',
    factions: '派閥',
    skills: 'スキル'
  },
  resources: {
    credits: 'クレジット - 購入や支払いのための利用可能なお金',
    condition: '状態 - 身体改造の健康状態',
    stress: 'ストレス - 危険な行動による精神的負担',
    energy: 'エネルギー - このターンでできること',
    reputation: '評判 - 他者からの評価'
  },
  market: {
    buy: '購入',
    sell: '販売',
    price: '現在の価格',
    amount: '数量',
    total: '合計コスト',
    inventory: '在庫',
    search: '商品を検索...',
    insufficient_funds: 'クレジットが不足しています'
  },
  goals: {
    available: '利用可能',
    active: 'アクティブ',
    completed: '完了',
    failed: '失敗',
    requirements: '要件',
    rewards: '報酬',
    accept: '受け入れる',
    invest: '投資',
    no_goals: '利用可能な目標はありません'
  },
  tutorial: {
    skip: 'チュートリアルをスキップ',
    next: '次へ',
    previous: '前へ'
  },
  character: {
    select_title: 'キャラクターを選択',
    starting_skills: '初期スキル',
    start_game: 'ゲームを開始',
    creation_title: 'あなたは誰になりますか？',
    first_name: '名',
    last_name: '姓',
    pronouns: '代名詞',
    pronouns_option: (option: string) => option,
    
    diplomat: {
      name: '外交官',
      title: '企業交渉者',
      description: '企業取引に豊富な経験を持つ熟練の交渉者。'
    },
    scout: {
      name: 'スカウト',
      title: '宇宙探査員',
      description: '優れた観察力を持つ経験豊富な探査員。'
    },
    engineer: {
      name: 'エンジニア',
      title: '技術スペシャリスト',
      description: '深い技術知識を持つ卓越した問題解決者。'
    },
    soldier: {
      name: '兵士',
      title: 'セキュリティスペシャリスト',
      description: '優れた体力を持つ規律ある戦闘員。'
    },
    smuggler: {
      name: '密輸業者',
      title: '独立トレーダー',
      description: '即興に長けた機転の利くトレーダー。'
    },
    scientist: {
      name: '科学者',
      title: '研究スペシャリスト',
      description: '広範な学問的知識を持つ優れた研究者。'
    }
  },
  
  skills: {
    negotiation: '交渉',
    observation: '観察',
    improvisation: '即興',
    fitness: '体力',
    knowledge: '知識',
    stamina: 'スタミナ',
    available: '利用可能なスキル',
    meets_requirement: '要件を満たしています'
  },

  tasks: {
    attempt: 'タスクに挑戦',
    success: '成功！',
    failure: '失敗',
    effects: '効果',
    gained_for: '獲得したXP'
  }
};
