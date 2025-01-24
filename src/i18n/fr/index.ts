export const fr = {
  common: {
    loading: 'Chargement...',
    error: 'Une erreur s\'est produite',
    save: 'Enregistrer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    back: 'Retour',
    next: 'Suivant',
    close: 'Fermer',
    continue: 'CONTINUER',
    skip: 'Passer',
    language: 'Langue'
  },
  menu: {
    settings: 'Paramètres',
    save_game: 'Sauvegarder la partie',
    load_game: 'Charger la partie',
    new_game: 'Nouvelle partie',
    quit: 'Quitter le jeu',
    return_menu: 'Retour au menu principal'
  },
  settings: {
    text_size: 'Taille du texte',
    text_size_normal: 'Normal',
    text_size_large: 'Grand'
  },
  navigation: {
    locations: 'Lieux',
    goals: 'Activités',
    market: 'Marché',
    factions: 'Factions',
    skills: 'Compétences'
  },
  resources: {
    credits: 'Crédits - Votre argent disponible pour achats et paiements',
    condition: 'État - Statut de santé de vos modifications corporelles',
    stress: 'Stress - Tension mentale causée par des actions dangereuses',
    energy: 'Énergie - Ce que vous pouvez accomplir ce tour',
    reputation: 'Réputation - Votre réputation auprès des autres'
  },
  market: {
    buy: 'Acheter',
    sell: 'Vendre',
    price: 'Prix actuel',
    amount: 'Quantité',
    total: 'Coût total',
    inventory: 'Inventaire',
    search: 'Rechercher des marchandises...',
    insufficient_funds: 'Crédits insuffisants'
  },
  goals: {
    available: 'Disponible',
    active: 'Actif',
    completed: 'Terminé',
    failed: 'Échoué',
    requirements: 'Exigences',
    rewards: 'Récompenses',
    accept: 'ACCEPTER',
    invest: 'Investir',
    no_goals: 'Aucun objectif disponible'
  },
  tutorial: {
    skip: 'Passer le tutoriel',
    next: 'Suivant',
    previous: 'Précédent'
  },
  character: {
    select_title: 'Choisissez votre personnage',
    starting_skills: 'Compétences de départ',
    start_game: 'Commencer la partie',
    creation_title: 'Qui serez-vous ?',
    first_name: 'Prénom',
    last_name: 'Nom',
    pronouns: 'Pronoms',
    pronouns_option: (option: string) => option,
    
    diplomat: {
      name: 'Le Diplomate',
      title: 'Négociateur d\'entreprise',
      description: 'Un négociateur expérimenté avec une grande expérience dans les affaires.'
    },
    scout: {
      name: 'L\'Éclaireur',
      title: 'Explorateur spatial',
      description: 'Un explorateur expérimenté doté de grandes capacités d\'observation.'
    },
    engineer: {
      name: 'L\'Ingénieur',
      title: 'Spécialiste technique',
      description: 'Un brillant résolveur de problèmes avec de vastes connaissances techniques.'
    },
    soldier: {
      name: 'Le Soldat',
      title: 'Spécialiste de la sécurité',
      description: 'Un combattant discipliné avec un excellent conditionnement physique.'
    },
    smuggler: {
      name: 'Le Contrebandier',
      title: 'Commerçant indépendant',
      description: 'Un commerçant vif d\'esprit qui excelle dans l\'improvisation.'
    },
    scientist: {
      name: 'Le Scientifique',
      title: 'Spécialiste de la recherche',
      description: 'Un chercheur brillant avec des connaissances académiques approfondies.'
    }
  },
  
  skills: {
    negotiation: 'Négociation',
    observation: 'Observation',
    improvisation: 'Improvisation',
    fitness: 'Forme physique',
    knowledge: 'Connaissance',
    stamina: 'Endurance',
    available: 'Compétences disponibles',
    meets_requirement: 'Répond aux exigences'
  },

  tasks: {
    attempt: 'Tenter la tâche',
    success: 'Réussite !',
    failure: 'Échec',
    effects: 'Effets',
    gained_for: 'XP gagné pour'
  }
};