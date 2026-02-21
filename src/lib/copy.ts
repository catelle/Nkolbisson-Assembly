import { getLocale, type Locale } from "@/lib/locale";

const copy: Record<Locale, {
  common: {
    question: string;
    answer: string;
    readingTime: string;
    backToStories: string;
    backToNews: string;
    backToHome: string;
    seeAllNews: string;
    fullCalendar: string;
    exploreMinistries: string;
    seeAllStories: string;
    askQuestion: string;
    eventsCta: string;
    navigation: string;
    contact: string;
    copyright: string;
    menuLabel: string;
    languageSwitch: string;
    loginLabel: string;
    chatLabel: string;
  };
  home: {
    badge: string;
    heroTitle: string;
    heroDescription: string;
    heroPrimary: string;
    heroSecondary: string;
    highlightOne: string;
    highlightTwo: string;
    themeLabel: string;
    themeText: string;
    newsLabel: string;
    newsTitle: string;
    eventsLabel: string;
    eventsTitle: string;
    ministriesLabel: string;
    ministriesTitle: string;
    ministriesDescription: string;
    ministriesCardOneTitle: string;
    ministriesCardOneText: string;
    ministriesCardTwoTitle: string;
    ministriesCardTwoText: string;
    storiesLabel: string;
    storiesTitle: string;
    storiesDescription: string;
    questionsLabel: string;
    questionsTitle: string;
    questionsDescription: string;
  };
  eventsPage: {
    label: string;
    title: string;
    description: string;
  };
  eventsFilters: {
    searchLabel: string;
    searchPlaceholder: string;
    ministryLabel: string;
    periodLabel: string;
    upcoming: string;
    past: string;
    all: string;
    noResults: string;
  };
  ministriesPage: {
    label: string;
    title: string;
    description: string;
    calloutTitle: string;
    calloutText: string;
    calloutFooter: string;
  };
  storiesPage: {
    label: string;
    title: string;
    description: string;
    searchLabel: string;
    searchPlaceholder: string;
    filterLabel: string;
    filterAll: string;
    noResults: string;
  };
  newsPage: {
    label: string;
    title: string;
    description: string;
  };
  askPage: {
    label: string;
    title: string;
    description: string;
    formLabel: string;
    formPlaceholder: string;
    formNote: string;
    submit: string;
    success: string;
    loginHint: string;
    chatLink: string;
  };
  questionsPage: {
    label: string;
    title: string;
    description: string;
  };
  prayerLinePage: {
    label: string;
    title: string;
    description: string;
    subjectsTitle: string;
    join: string;
    nameLabel: string;
    emailLabel: string;
    whatsappLabel: string;
    register: string;
    registered: string;
    alreadyRegistered: string;
    mySubjects: string;
    messagesTitle: string;
    noMessages: string;
    noSubjects: string;
  };
  admin: {
    space: string;
    loginTitle: string;
    loginSubtitle: string;
    username: string;
    password: string;
    loginButton: string;
    loginError: string;
    guardChecking: string;
    showPassword: string;
    hidePassword: string;
    roleLabel: string;
    dashboardLabel: string;
    dashboardTitle: string;
    logout: string;
    quickView: string;
    welcome: string;
    welcomeText: string;
    cardHint: string;
    cards: {
      events: string;
      updates: string;
      stories: string;
      questions: string;
      media: string;
      users: string;
    };
    events: {
      label: string;
      title: string;
      add: string;
      edit: string;
      remove: string;
    };
    ministries: {
      label: string;
      title: string;
      add: string;
      edit: string;
      remove: string;
      leader: string;
    };
    stories: {
      label: string;
      title: string;
      add: string;
      edit: string;
      remove: string;
      published: string;
    };
    updates: {
      label: string;
      title: string;
      add: string;
      edit: string;
      remove: string;
      published: string;
    };
    questions: {
      label: string;
      inbox: string;
      export: string;
      answered: string;
      reply: string;
      markPrivate: string;
      replyTitle: string;
      replyHint: string;
      replyPlaceholder: string;
      publish: string;
      draft: string;
    };
    media: {
      label: string;
      title: string;
      upload: string;
    };
    users: {
      label: string;
      title: string;
      add: string;
      edit: string;
      remove: string;
    };
    prayerLine: {
      label: string;
      title: string;
      addSubject: string;
      editSubject: string;
      removeSubject: string;
      subjects: string;
      descriptionLabel: string;
      activeLabel: string;
      participants: string;
      messageTitle: string;
      messageSubject: string;
      messageBody: string;
      messagePlaceholder: string;
      send: string;
      subjectLabel: string;
      nameLabel: string;
      emailLabel: string;
      whatsappLabel: string;
    };
  };
}> = {
  fr: {
    common: {
      question: "Question",
      answer: "Reponse",
      readingTime: "min de lecture",
      backToStories: "Retour aux histoires",
      backToNews: "Retour aux actualites",
      backToHome: "Retour a l'accueil",
      seeAllNews: "Voir toutes les nouvelles",
      fullCalendar: "Calendrier complet",
      exploreMinistries: "Explorer les ministeres",
      seeAllStories: "Voir toutes les histoires",
      askQuestion: "Poser une question",
      eventsCta: "Voir les evenements",
      navigation: "Navigation",
      contact: "Contact",
      copyright: "Copyright 2026 Assemblee CMCI Nkolbisson. Tous droits reserves.",
      menuLabel: "Ouvrir le menu",
      languageSwitch: "Changer de langue",
      loginLabel: "Se connecter",
      chatLabel: "Voir le chat"
    },
    home: {
      badge: "Assemblee locale - CMCI",
      heroTitle: "Communaute missionnaire chretienne internationale",
      heroDescription:
        "Assemblee locale de la CMCI a Nkolbisson. Une famille de foi pour grandir ensemble, servir la ville et annoncer l'Evangile.",
      heroPrimary: "Voir les evenements",
      heroSecondary: "Lire une histoire biblique",
      highlightOne: "Culte principal: Dimanche 9h00",
      highlightTwo: "Nkolbisson, Yaounde",
      themeLabel: "Theme du mois",
      themeText: "Renouvellement, foi et action.",
      newsLabel: "Actualites",
      newsTitle: "Nouvelles et temoignages",
      eventsLabel: "Evenements",
      eventsTitle: "A venir dans la communaute",
      ministriesLabel: "Ministeres",
      ministriesTitle: "Servir ensemble",
      ministriesDescription:
        "Chaque ministere porte une dimension specifique de la mission. Decouvrez les equipes, les responsables et leurs actions recentes.",
      ministriesCardOneTitle: "Solidarite et compassion",
      ministriesCardOneText: "Visites, priere et soutien materiel pour les familles en besoin.",
      ministriesCardTwoTitle: "Groupes de maison",
      ministriesCardTwoText: "Partage biblique, priere et accompagnement spirituel chaque semaine.",
      storiesLabel: "Histoires bibliques",
      storiesTitle: "Lire, mediter, transmettre",
      storiesDescription:
        "Une section speciale pour raconter les grandes histoires de la Bible avec un format accessible et contemplatif.",
      questionsLabel: "Questions anonymes",
      questionsTitle: "Nous sommes a votre ecoute",
      questionsDescription:
        "Posez vos questions en toute confiance. Les reponses utiles sont publiees pour edifier la communaute."
    },
    eventsPage: {
      label: "Evenements",
      title: "Vivre ensemble chaque saison",
      description:
        "Retrouvez les rendez-vous spirituels, formations et actions communautaires de l'assemblee."
    },
    eventsFilters: {
      searchLabel: "Recherche",
      searchPlaceholder: "Titre, lieu, description...",
      ministryLabel: "Ministere",
      periodLabel: "Periode",
      upcoming: "A venir",
      past: "Passe",
      all: "Tout",
      noResults: "Aucun evenement ne correspond a votre recherche."
    },
    ministriesPage: {
      label: "Ministeres",
      title: "Servir Dieu et la ville",
      description:
        "Chaque equipe porte une dimension essentielle: louange, jeunesse, discipulat, action sociale et plus.",
      calloutTitle: "Envie de servir?",
      calloutText:
        "Contactez un responsable de ministere ou laissez une question au secretariat.",
      calloutFooter: "Equipe pastorale"
    },
    storiesPage: {
      label: "Histoires bibliques",
      title: "Lire, mediter, transmettre",
      description: "Des recits bibliques presentes avec une mise en page douce et facile a lire.",
      searchLabel: "Recherche",
      searchPlaceholder: "Titre ou theme...",
      filterLabel: "Filtrer",
      filterAll: "Tous les themes",
      noResults: "Aucune histoire ne correspond a votre recherche."
    },
    newsPage: {
      label: "Actualites",
      title: "Nouvelles et vie communautaire",
      description:
        "Retours sur les activites recentes, temoignages et annonces importantes."
    },
    askPage: {
      label: "Question anonyme",
      title: "Posez votre question en toute discretion",
      description:
        "Aucune information personnelle n'est demandee. L'equipe pastorale repond avec bienveillance.",
      formLabel: "Votre question",
      formPlaceholder: "Ecrivez votre question ici...",
      formNote:
        "Vous pouvez rester totalement anonyme. Les reponses publiees servent a edifier la communaute.",
      submit: "Envoyer la question",
      success: "Merci! Votre question a ete envoyee anonymement.",
      loginHint: "Connectez-vous pour suivre les reponses et discuter avec un responsable.",
      chatLink: "Consultez vos discussions dans votre espace."
    },
    questionsPage: {
      label: "Questions & reponses",
      title: "Des reponses pour edifier",
      description: "Les questions anonymes avec reponses publiees pour benir la communaute."
    },
    prayerLinePage: {
      label: "Hotline de priere",
      title: "Hotline de priere et jeune",
      description: "Choisissez un sujet de priere et de jeune, puis inscrivez-vous pour recevoir les mises a jour.",
      subjectsTitle: "Sujets de priere",
      join: "S'inscrire",
      nameLabel: "Nom complet",
      emailLabel: "Email",
      whatsappLabel: "Numero WhatsApp",
      register: "Valider l'inscription",
      registered: "Inscription reussie.",
      alreadyRegistered: "Deja inscrit a ce sujet.",
      mySubjects: "Mes sujets",
      messagesTitle: "Messages",
      noMessages: "Aucun message pour le moment.",
      noSubjects: "Aucun sujet disponible pour le moment."
    },
    admin: {
      space: "Espace admin",
      loginTitle: "Connexion",
      loginSubtitle: "Utilisez votre compte administrateur pour gerer les contenus.",
      username: "Identifiant",
      password: "Mot de passe",
      loginButton: "Se connecter",
      loginError: "Identifiants incorrects. Veuillez reessayer.",
      guardChecking: "Verification des acces...",
      showPassword: "Afficher le mot de passe",
      hidePassword: "Masquer le mot de passe",
      roleLabel: "Role: Administrateur",
      dashboardLabel: "Tableau de bord",
      dashboardTitle: "Gestion du contenu",
      logout: "Deconnexion",
      quickView: "Vue rapide",
      welcome: "Bienvenue, equipe pastorale",
      welcomeText: "Gerer les contenus publies, repondre aux questions et mettre a jour les ministeres.",
      cardHint: "Elements en base",
      cards: {
        events: "Evenements",
        updates: "Actualites",
        stories: "Histoires bibliques",
        questions: "Questions",
        media: "Medias",
        users: "Utilisateurs"
      },
      events: {
        label: "Evenements",
        title: "Gerer le calendrier",
        add: "Ajouter un evenement",
        edit: "Editer",
        remove: "Supprimer"
      },
      ministries: {
        label: "Ministeres",
        title: "Suivi des equipes",
        add: "Ajouter un ministere",
        edit: "Editer",
        remove: "Supprimer",
        leader: "Responsable"
      },
      stories: {
        label: "Histoires bibliques",
        title: "Gestion des histoires",
        add: "Nouvelle histoire",
        edit: "Editer",
        remove: "Supprimer",
        published: "Publie le"
      },
      updates: {
        label: "Actualites",
        title: "Publier les nouvelles",
        add: "Nouvelle actualite",
        edit: "Editer",
        remove: "Supprimer",
        published: "Publie le"
      },
      questions: {
        label: "Questions",
        inbox: "Boite de reception",
        export: "Exporter",
        answered: "Reponse publiee",
        reply: "Repondre",
        markPrivate: "Marquer prive",
        replyTitle: "Reponse publique",
        replyHint: "Selectionnez une question puis redigez la reponse.",
        replyPlaceholder: "Ecrivez la reponse...",
        publish: "Publier",
        draft: "Sauvegarder brouillon"
      },
      media: {
        label: "Medias",
        title: "Bibliotheque d'images",
        upload: "Importer"
      },
      prayerLine: {
        label: "Hotline de priere",
        title: "Gestion des sujets",
        addSubject: "Ajouter un sujet",
        editSubject: "Modifier",
        removeSubject: "Supprimer",
        subjects: "Sujets",
        descriptionLabel: "Description",
        activeLabel: "Actif",
        participants: "Participants",
        messageTitle: "Message global",
        messageSubject: "Objet de l'email",
        messageBody: "Message",
        messagePlaceholder: "Ecrivez votre message...",
        send: "Envoyer aux participants",
        subjectLabel: "Sujet",
        nameLabel: "Nom",
        emailLabel: "Email",
        whatsappLabel: "WhatsApp"
      },
      users: {
        label: "Utilisateurs",
        title: "Acces et roles",
        add: "Ajouter un utilisateur",
        edit: "Editer",
        remove: "Retirer"
      }
    }
  },
  en: {
    common: {
      question: "Question",
      answer: "Answer",
      readingTime: "min read",
      backToStories: "Back to stories",
      backToNews: "Back to news",
      backToHome: "Back to home",
      seeAllNews: "See all news",
      fullCalendar: "Full calendar",
      exploreMinistries: "Explore ministries",
      seeAllStories: "See all stories",
      askQuestion: "Ask a question",
      eventsCta: "View events",
      navigation: "Navigation",
      contact: "Contact",
      copyright: "Copyright 2026 CMFI Nkolbisson Assembly. All rights reserved.",
      menuLabel: "Open menu",
      languageSwitch: "Change language",
      loginLabel: "Sign in",
      chatLabel: "Open chat"
    },
    home: {
      badge: "Local assembly - CMFI",
      heroTitle: "Christian Missionary Fellowship International",
      heroDescription:
        "Local CMFI assembly in Nkolbisson. A faith family to grow together, serve the city, and share the Gospel.",
      heroPrimary: "View events",
      heroSecondary: "Read a Bible story",
      highlightOne: "Main service: Sunday 9:00 AM",
      highlightTwo: "Nkolbisson, Yaounde",
      themeLabel: "Theme of the month",
      themeText: "Renewal, faith, and action.",
      newsLabel: "News",
      newsTitle: "Updates and testimonies",
      eventsLabel: "Events",
      eventsTitle: "Coming up in the community",
      ministriesLabel: "Ministries",
      ministriesTitle: "Serving together",
      ministriesDescription:
        "Each ministry carries a key dimension of the mission. Discover the teams, leaders, and recent actions.",
      ministriesCardOneTitle: "Compassion and care",
      ministriesCardOneText: "Visits, prayer, and practical support for families in need.",
      ministriesCardTwoTitle: "Home groups",
      ministriesCardTwoText: "Bible sharing, prayer, and spiritual support each week.",
      storiesLabel: "Bible stories",
      storiesTitle: "Read, reflect, share",
      storiesDescription:
        "A dedicated space to tell Bible stories with a calm and accessible reading layout.",
      questionsLabel: "Anonymous questions",
      questionsTitle: "We are listening",
      questionsDescription:
        "Ask your questions in confidence. Useful answers are published to build the community."
    },
    eventsPage: {
      label: "Events",
      title: "Living together each season",
      description: "Find services, trainings, and community actions of the assembly."
    },
    eventsFilters: {
      searchLabel: "Search",
      searchPlaceholder: "Title, place, description...",
      ministryLabel: "Ministry",
      periodLabel: "Period",
      upcoming: "Upcoming",
      past: "Past",
      all: "All",
      noResults: "No events match your search."
    },
    ministriesPage: {
      label: "Ministries",
      title: "Serving God and the city",
      description: "Each team serves a key mission: worship, youth, discipleship, outreach, and more.",
      calloutTitle: "Want to serve?",
      calloutText: "Contact a ministry leader or leave a question for the office.",
      calloutFooter: "Pastoral team"
    },
    storiesPage: {
      label: "Bible stories",
      title: "Read, reflect, share",
      description: "Bible stories presented with a gentle and easy reading layout.",
      searchLabel: "Search",
      searchPlaceholder: "Title or theme...",
      filterLabel: "Filter",
      filterAll: "All themes",
      noResults: "No story matches your search."
    },
    newsPage: {
      label: "News",
      title: "Updates and community life",
      description: "Recaps of recent activities, testimonies, and important announcements."
    },
    askPage: {
      label: "Anonymous question",
      title: "Ask your question with discretion",
      description: "No personal information is required. The pastoral team replies with care.",
      formLabel: "Your question",
      formPlaceholder: "Write your question here...",
      formNote: "You can stay fully anonymous. Published answers build the community.",
      submit: "Send question",
      success: "Thank you! Your question was sent anonymously.",
      loginHint: "Sign in to follow replies and chat with a leader.",
      chatLink: "Check your conversations in your account."
    },
    questionsPage: {
      label: "Questions & answers",
      title: "Answers to build faith",
      description: "Anonymous questions with public answers that bless the community."
    },
    prayerLinePage: {
      label: "Hot prayer line",
      title: "Hot prayer and fasting line",
      description: "Select a prayer and fasting subject, then register to receive updates.",
      subjectsTitle: "Prayer subjects",
      join: "Join",
      nameLabel: "Full name",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp number",
      register: "Confirm registration",
      registered: "Registration completed.",
      alreadyRegistered: "Already registered for this subject.",
      mySubjects: "My subjects",
      messagesTitle: "Messages",
      noMessages: "No messages yet.",
      noSubjects: "No subjects available right now."
    },
    admin: {
      space: "Admin space",
      loginTitle: "Sign in",
      loginSubtitle: "Use your admin account to manage content.",
      username: "Username",
      password: "Password",
      loginButton: "Sign in",
      loginError: "Invalid credentials. Please try again.",
      guardChecking: "Checking access...",
      showPassword: "Show password",
      hidePassword: "Hide password",
      roleLabel: "Role: Administrator",
      dashboardLabel: "Dashboard",
      dashboardTitle: "Content management",
      logout: "Sign out",
      quickView: "Quick view",
      welcome: "Welcome, pastoral team",
      welcomeText: "Manage published content, answer questions, and update ministries.",
      cardHint: "Items in database",
      cards: {
        events: "Events",
        updates: "News",
        stories: "Bible stories",
        questions: "Questions",
        media: "Media",
        users: "Users"
      },
      events: {
        label: "Events",
        title: "Manage calendar",
        add: "Add event",
        edit: "Edit",
        remove: "Delete"
      },
      ministries: {
        label: "Ministries",
        title: "Team follow-up",
        add: "Add ministry",
        edit: "Edit",
        remove: "Delete",
        leader: "Leader"
      },
      stories: {
        label: "Bible stories",
        title: "Story management",
        add: "New story",
        edit: "Edit",
        remove: "Delete",
        published: "Published on"
      },
      updates: {
        label: "News",
        title: "Publish updates",
        add: "New update",
        edit: "Edit",
        remove: "Delete",
        published: "Published on"
      },
      questions: {
        label: "Questions",
        inbox: "Inbox",
        export: "Export",
        answered: "Answer published",
        reply: "Reply",
        markPrivate: "Mark private",
        replyTitle: "Public answer",
        replyHint: "Select a question then write the answer.",
        replyPlaceholder: "Write the answer...",
        publish: "Publish",
        draft: "Save draft"
      },
      media: {
        label: "Media",
        title: "Image library",
        upload: "Upload"
      },
      prayerLine: {
        label: "Prayer line",
        title: "Subject management",
        addSubject: "Add subject",
        editSubject: "Edit",
        removeSubject: "Delete",
        subjects: "Subjects",
        descriptionLabel: "Description",
        activeLabel: "Active",
        participants: "Participants",
        messageTitle: "Global message",
        messageSubject: "Email subject",
        messageBody: "Message",
        messagePlaceholder: "Write your message...",
        send: "Send to participants",
        subjectLabel: "Subject",
        nameLabel: "Name",
        emailLabel: "Email",
        whatsappLabel: "WhatsApp"
      },
      users: {
        label: "Users",
        title: "Access and roles",
        add: "Add user",
        edit: "Edit",
        remove: "Remove"
      }
    }
  }
};

export function getCopy(locale?: string) {
  return copy[getLocale(locale)];
}
