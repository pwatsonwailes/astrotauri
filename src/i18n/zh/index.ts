export const zh = {
  common: {
    loading: '加载中...',
    error: '发生错误',
    save: '保存',
    cancel: '取消',
    confirm: '确认',
    back: '返回',
    next: '下一步',
    close: '关闭',
    continue: '继续',
    skip: '跳过',
    language: '语言'
  },
  menu: {
    settings: '设置',
    save_game: '保存游戏',
    load_game: '加载游戏',
    new_game: '新游戏',
    quit: '退出游戏',
    return_menu: '返回主菜单'
  },
  settings: {
    text_size: '文字大小',
    text_size_normal: '正常',
    text_size_large: '大'
  },
  navigation: {
    locations: '位置',
    goals: '活动',
    market: '市场',
    factions: '派系',
    skills: '技能'
  },
  resources: {
    credits: '信用点 - 可用于购买和支付的资金',
    condition: '状态 - 身体改造的健康状况',
    stress: '压力 - 危险行动带来的精神负担',
    energy: '能量 - 本回合可以执行的行动',
    reputation: '声望 - 你受到的评价'
  },
  market: {
    buy: '购买',
    sell: '出售',
    price: '当前价格',
    amount: '数量',
    total: '总成本',
    inventory: '库存',
    search: '搜索商品...',
    insufficient_funds: '信用点不足'
  },
  goals: {
    available: '可用',
    active: '进行中',
    completed: '已完成',
    failed: '失败',
    requirements: '要求',
    rewards: '奖励',
    accept: '接受',
    invest: '投资',
    no_goals: '没有可用目标'
  },
  tutorial: {
    skip: '跳过教程',
    next: '下一步',
    previous: '上一步'
  },
  character: {
    select_title: '选择你的角色',
    starting_skills: '初始技能',
    start_game: '开始游戏',
    creation_title: '你是谁？',
    first_name: '名字',
    last_name: '姓氏',
    pronouns: '代词',
    pronouns_option: (option: string) => option,
    
    diplomat: {
      name: '外交官',
      title: '企业谈判专家',
      description: '一名在企业交易中拥有丰富经验的熟练谈判者。'
    },
    scout: {
      name: '侦察员',
      title: '深空探险家',
      description: '一名拥有敏锐观察力的经验丰富探险家。'
    },
    engineer: {
      name: '工程师',
      title: '技术专家',
      description: '一名拥有深厚技术知识的优秀问题解决者。'
    },
    soldier: {
      name: '士兵',
      title: '安全专家',
      description: '一名纪律严明、身体素质优秀的战士。'
    },
    smuggler: {
      name: '走私者',
      title: '独立商人',
      description: '一名反应灵敏、擅长即兴发挥的商人。'
    },
    scientist: {
      name: '科学家',
      title: '研究专家',
      description: '一名拥有广泛学术知识的杰出研究员。'
    }
  },
  
  skills: {
    negotiation: '谈判',
    observation: '观察',
    improvisation: '即兴',
    fitness: '体能',
    knowledge: '知识',
    stamina: '耐力',
    available: '可用技能',
    meets_requirement: '满足要求'
  },

  tasks: {
    attempt: '尝试任务',
    success: '成功！',
    failure: '失败',
    effects: '效果',
    gained_for: '获得的经验值'
  }
};
