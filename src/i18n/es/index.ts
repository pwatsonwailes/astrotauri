export const es = {
  common: {
    loading: 'Cargando...',
    error: 'Ocurrió un error',
    save: 'Guardar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    back: 'Atrás',
    next: 'Siguiente',
    close: 'Cerrar',
    continue: 'CONTINUAR',
    skip: 'Omitir',
    language: 'Idioma'
  },
  menu: {
    settings: 'Configuración',
    save_game: 'Guardar partida',
    load_game: 'Cargar partida',
    new_game: 'Nueva partida',
    quit: 'Salir del juego',
    return_menu: 'Volver al menú principal'
  },
  settings: {
    text_size: 'Tamaño del texto',
    text_size_normal: 'Normal',
    text_size_large: 'Grande'
  },
  navigation: {
    locations: 'Ubicaciones',
    goals: 'Actividades',
    market: 'Mercado',
    factions: 'Facciones',
    skills: 'Habilidades'
  },
  resources: {
    credits: 'Créditos - Tu dinero disponible para compras y pagos',
    condition: 'Condición - Estado de salud de tus modificaciones corporales',
    stress: 'Estrés - Tensión mental por acciones peligrosas',
    energy: 'Energía - Lo que puedes hacer este turno',
    reputation: 'Reputación - Qué tan bien considerado eres'
  },
  market: {
    buy: 'Comprar',
    sell: 'Vender',
    price: 'Precio actual',
    amount: 'Cantidad',
    total: 'Costo total',
    inventory: 'Inventario',
    search: 'Buscar productos...',
    insufficient_funds: 'Créditos insuficientes'
  },
  goals: {
    available: 'Disponible',
    active: 'Activo',
    completed: 'Completado',
    failed: 'Fallado',
    requirements: 'Requisitos',
    rewards: 'Recompensas',
    accept: 'ACEPTAR',
    invest: 'Invertir',
    no_goals: 'No hay objetivos disponibles'
  },
  tutorial: {
    skip: 'Omitir tutorial',
    next: 'Siguiente',
    previous: 'Anterior'
  },
  character: {
    select_title: 'Elige tu personaje',
    starting_skills: 'Habilidades iniciales',
    start_game: 'Comenzar juego',
    creation_title: '¿Quién serás?',
    first_name: 'Nombre',
    last_name: 'Apellido',
    pronouns: 'Pronombres',
    pronouns_option: (option: string) => option,
    
    diplomat: {
      name: 'El Diplomático',
      title: 'Negociador Corporativo',
      description: 'Un negociador experto con amplia experiencia en tratos corporativos.'
    },
    scout: {
      name: 'El Explorador',
      title: 'Explorador del Espacio Profundo',
      description: 'Un explorador experimentado con grandes habilidades de observación.'
    },
    engineer: {
      name: 'El Ingeniero',
      title: 'Especialista Técnico',
      description: 'Un brillante solucionador de problemas con amplios conocimientos técnicos.'
    },
    soldier: {
      name: 'El Soldado',
      title: 'Especialista en Seguridad',
      description: 'Un luchador disciplinado con una condición física excepcional.'
    },
    smuggler: {
      name: 'El Contrabandista',
      title: 'Comerciante Independiente',
      description: 'Un comerciante ingenioso que sobresale en la improvisación.'
    },
    scientist: {
      name: 'El Científico',
      title: 'Especialista en Investigación',
      description: 'Un investigador brillante con amplios conocimientos académicos.'
    }
  },
  
  skills: {
    negotiation: 'Negociación',
    observation: 'Observación',
    improvisation: 'Improvisación',
    fitness: 'Aptitud física',
    knowledge: 'Conocimiento',
    stamina: 'Resistencia',
    available: 'Habilidades disponibles',
    meets_requirement: 'Cumple con el requisito'
  },

  tasks: {
    attempt: 'Intentar tarea',
    success: '¡Éxito!',
    failure: 'Fallido',
    effects: 'Efectos',
    gained_for: 'XP ganado por'
  }
};
