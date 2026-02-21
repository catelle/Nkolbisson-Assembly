import type { Answer, Event, Ministry, Question, Story, Update } from "./types";
import { getLocale, type Locale } from "@/lib/locale";

const dataByLocale: Record<Locale, {
  events: Event[];
  ministries: Ministry[];
  updates: Update[];
  stories: Story[];
  questions: Question[];
  answers: Answer[];
}> = {
  fr: {
    events: [
      {
        id: "evt-vision-nuit-priere",
        title: "Nuit de priere et d'adoration",
        description:
          "Une veillee dediee a l'intercession pour les familles et la ville. Louange, temoignages et temps de priere guidee.",
        location: "Temple principal, Nkolbisson",
        startAt: "2026-03-06T19:00:00+01:00",
        endAt: "2026-03-07T00:30:00+01:00",
        ministry: "Priere",
        image: "/images/event-prayer.svg",
        status: "published"
      },
      {
        id: "evt-jeunesse-retreat",
        title: "Retraite Jeunesse Esperance",
        description:
          "Trois jours pour se fortifier dans la foi, recevoir un enseignement pratique et vivre la communion fraternelle.",
        location: "Centre communautaire de Mbankomo",
        startAt: "2026-03-20T09:00:00+01:00",
        endAt: "2026-03-22T17:00:00+01:00",
        ministry: "Jeunesse",
        image: "/images/event-youth.svg",
        status: "published"
      },
      {
        id: "evt-formation-leaders",
        title: "Atelier Leadership Serviteur",
        description:
          "Formation pour responsables de groupes et ministeres, avec etudes bibliques et ateliers de planification.",
        location: "Salle de conference, Nkolbisson",
        startAt: "2026-04-04T08:30:00+01:00",
        endAt: "2026-04-04T16:00:00+01:00",
        ministry: "Discipulat",
        image: "/images/event-leadership.svg",
        status: "published"
      },
      {
        id: "evt-evangelisation-marche",
        title: "Marche d'evangelisation",
        description:
          "Sortie communautaire pour partager l'Evangile et prier pour les quartiers voisins.",
        location: "Depart: Carrefour Nkolbisson",
        startAt: "2026-04-18T08:00:00+01:00",
        endAt: "2026-04-18T12:00:00+01:00",
        ministry: "Evangelisation",
        image: "/images/event-outreach.svg",
        status: "published"
      }
    ],
    ministries: [
      {
        id: "min-jeunesse",
        name: "Ministere Jeunesse",
        summary: "Accompagner les jeunes dans la foi, l'appel et la croissance spirituelle.",
        leader: "Frere Joel Ndzi",
        meetingTime: "Chaque samedi 16h00",
        latestUpdate:
          "Lancement d'un programme de mentorat biblique et d'orientation professionnelle pour etudiants.",
        image: "/images/ministry-youth.svg"
      },
      {
        id: "min-chorale",
        name: "Chorale d'adoration",
        summary: "Servir par la louange et encourager l'assemblee a la presence de Dieu.",
        leader: "Soeur Clarisse Ndzi",
        meetingTime: "Mardi et vendredi 18h30",
        latestUpdate:
          "Nouveau repertoire bilingue pour le mois de Paques et formation vocale.",
        image: "/images/ministry-choir.svg"
      },
      {
        id: "min-enfants",
        name: "Ministere des enfants",
        summary: "Enseigner la Parole aux enfants avec des histoires et activites adaptees.",
        leader: "Soeur Mireille",
        meetingTime: "Dimanche 09h00",
        latestUpdate:
          "Ateliers creatifs sur les paraboles de Jesus et nouveaux supports visuels.",
        image: "/images/ministry-kids.svg"
      },
      {
        id: "min-social",
        name: "Action sociale",
        summary: "Soutien aux familles, visites et actions de solidarite dans la communaute.",
        leader: "Frere Samuel Ndzi",
        meetingTime: "Planning mensuel",
        latestUpdate:
          "Distribution de paniers alimentaires et suivi pastoral des personnes agees.",
        image: "/images/ministry-care.svg"
      }
    ],
    updates: [
      {
        id: "upd-veillee-mars",
        title: "Veillee de mars: une nuit de guerison",
        slug: "veillee-mars-nuit-guerison",
        excerpt:
          "Retour sur la veillee de mars: temoignages, prieres et enseignements sur la guerison interieure.",
        content: [
          "La veillee de mars a rassemble les familles autour d'un theme central: la guerison interieure.",
          "Des moments forts d'adoration ont permis aux participants de se confier pleinement a Dieu.",
          "Un temps special d'intercession a ete conduit pour la ville de Yaounde et les foyers."
        ],
        cover: "/images/news-healing.svg",
        tags: ["Priere", "Temoignages"],
        publishedAt: "2026-03-10"
      },
      {
        id: "upd-formation-leaders",
        title: "Formation des leaders de cellule",
        slug: "formation-leaders-cellule",
        excerpt:
          "Un week-end de formation pour renforcer la vision et la coordination des groupes de maison.",
        content: [
          "Les responsables de cellules ont recu un enseignement sur la conduite spirituelle et la responsabilite.",
          "Des ateliers pratiques ont aide a mieux organiser les visites et la communication intercellules.",
          "Chaque leader repart avec un plan d'action pour les prochains mois."
        ],
        cover: "/images/news-leadership.svg",
        tags: ["Discipulat", "Formation"],
        publishedAt: "2026-03-28"
      },
      {
        id: "upd-evangelisation",
        title: "Mission d'evangelisation a Nkolbisson",
        slug: "mission-evangelisation-nkolbisson",
        excerpt:
          "Une equipe a partage l'Evangile dans trois quartiers, avec prieres et distribution de supports.",
        content: [
          "Plusieurs familles ont recu des prieres et ont accepte une visite pastorale.",
          "Les jeunes ont anime des temps de louange en plein air.",
          "L'equipe prepare un suivi pour les personnes contactees."
        ],
        cover: "/images/news-outreach.svg",
        tags: ["Evangelisation", "Jeunesse"],
        publishedAt: "2026-04-12"
      }
    ],
    stories: [
      {
        id: "story-1",
        title: "David et Goliath",
        subtitle: "Le courage qui vient de la foi",
        slug: "david-et-goliath",
        readingTime: 6,
        tags: ["Foi", "Courage"],
        hero: "/images/story-david.svg",
        publishedAt: "2026-02-14",
        blocks: [
          {
            id: "s1-b1",
            type: "paragraph",
            text:
              "L'armee d'Israel faisait face a un geant redoutable. Chaque jour, Goliath defiait le peuple et semait la peur."
          },
          {
            id: "s1-b2",
            type: "image",
            image: "/images/story-david-stone.svg",
            caption: "David choisit cinq pierres lisses, confiant dans la protection de Dieu.",
            align: "center"
          },
          {
            id: "s1-b3",
            type: "paragraph",
            text:
              "David, un jeune berger, s'est avance avec une foi simple. Il savait que la bataille appartenait au Seigneur."
          },
          {
            id: "s1-b4",
            type: "image_text",
            image: "/images/story-david-victory.svg",
            text:
              "Sa victoire n'etait pas seulement physique, elle temoignait que Dieu eleve ceux qui lui font confiance.",
            caption: "Le peuple reprit courage et entra dans la victoire.",
            align: "right"
          }
        ]
      },
      {
        id: "story-2",
        title: "La brebis retrouvee",
        subtitle: "Un amour qui cherche et qui restaure",
        slug: "la-brebis-retrouvee",
        readingTime: 5,
        tags: ["Misericorde", "Amour"],
        hero: "/images/story-shepherd.svg",
        publishedAt: "2026-02-07",
        blocks: [
          {
            id: "s2-b1",
            type: "paragraph",
            text:
              "Jesus raconta une histoire sur un berger qui laissa quatre-vingt-dix-neuf brebis pour retrouver celle qui etait perdue."
          },
          {
            id: "s2-b2",
            type: "image_text",
            image: "/images/story-shepherd-path.svg",
            text:
              "Le berger ne se reposa pas tant qu'il n'avait pas retrouve la brebis. Sa joie fut immense lorsqu'il la ramena."
          },
          {
            id: "s2-b3",
            type: "paragraph",
            text:
              "Ce recit rappelle l'amour personnel de Dieu pour chacun, et son desir de restaurer ceux qui s'eloignent."
          }
        ]
      },
      {
        id: "story-3",
        title: "Les noces de Cana",
        subtitle: "Un miracle de provision et de joie",
        slug: "noces-de-cana",
        readingTime: 7,
        tags: ["Miracle", "Espoir"],
        hero: "/images/story-cana.svg",
        publishedAt: "2026-01-30",
        blocks: [
          {
            id: "s3-b1",
            type: "paragraph",
            text:
              "A Cana, une fete de mariage risquait de se terminer par une honte: le vin venait a manquer."
          },
          {
            id: "s3-b2",
            type: "image",
            image: "/images/story-cana-jars.svg",
            caption: "Jesus transforma l'eau en vin, manifestant sa gloire.",
            align: "center"
          },
          {
            id: "s3-b3",
            type: "paragraph",
            text:
              "Ce miracle enseigne que Jesus se soucie des details de notre vie et qu'il apporte une joie nouvelle."
          }
        ]
      }
    ],
    questions: [
      {
        id: "q1",
        questionText: "Pourquoi prier si Dieu sait deja tout?",
        createdAt: "2026-02-03",
        status: "answered"
      },
      {
        id: "q2",
        questionText: "Comment trouver la paix quand on traverse une epreuve?",
        createdAt: "2026-02-05",
        status: "answered"
      },
      {
        id: "q3",
        questionText: "Quelle est la difference entre la foi et l'esperance?",
        createdAt: "2026-02-11",
        status: "new"
      },
      {
        id: "q4",
        questionText: "Puis-je demander une visite pastorale pour ma famille?",
        createdAt: "2026-02-12",
        status: "private"
      }
    ],
    answers: [
      {
        id: "a1",
        questionId: "q1",
        answerText:
          "La priere n'informe pas Dieu, elle nous rapproche de lui. C'est une relation vivante ou nous deposons nos fardeaux et recevons sa direction.",
        answeredAt: "2026-02-06",
        answeredBy: "Pasteur Emmanuel",
        isPublic: true
      },
      {
        id: "a2",
        questionId: "q2",
        answerText:
          "La paix vient souvent en meditant la Parole, en priant avec d'autres croyants et en se rappelant que Dieu marche avec nous.",
        answeredAt: "2026-02-10",
        answeredBy: "Soeur Nadine",
        isPublic: true
      }
    ]
  },
  en: {
    events: [
      {
        id: "evt-vision-nuit-priere",
        title: "Night of prayer and worship",
        description:
          "An overnight gathering for intercession for families and the city. Worship, testimonies, and guided prayer.",
        location: "Main sanctuary, Nkolbisson",
        startAt: "2026-03-06T19:00:00+01:00",
        endAt: "2026-03-07T00:30:00+01:00",
        ministry: "Prayer",
        image: "/images/event-prayer.svg",
        status: "published"
      },
      {
        id: "evt-jeunesse-retreat",
        title: "Youth Hope Retreat",
        description:
          "Three days to grow in faith, receive practical teaching, and live strong fellowship.",
        location: "Mbankomo community center",
        startAt: "2026-03-20T09:00:00+01:00",
        endAt: "2026-03-22T17:00:00+01:00",
        ministry: "Youth",
        image: "/images/event-youth.svg",
        status: "published"
      },
      {
        id: "evt-formation-leaders",
        title: "Servant leadership workshop",
        description:
          "Training for group and ministry leaders with Bible studies and planning sessions.",
        location: "Conference hall, Nkolbisson",
        startAt: "2026-04-04T08:30:00+01:00",
        endAt: "2026-04-04T16:00:00+01:00",
        ministry: "Discipleship",
        image: "/images/event-leadership.svg",
        status: "published"
      },
      {
        id: "evt-evangelisation-marche",
        title: "Community outreach walk",
        description:
          "Neighborhood outreach to share the Gospel and pray for nearby areas.",
        location: "Start: Nkolbisson crossroads",
        startAt: "2026-04-18T08:00:00+01:00",
        endAt: "2026-04-18T12:00:00+01:00",
        ministry: "Outreach",
        image: "/images/event-outreach.svg",
        status: "published"
      }
    ],
    ministries: [
      {
        id: "min-jeunesse",
        name: "Youth ministry",
        summary: "Helping young people grow in faith, calling, and spiritual maturity.",
        leader: "Brother Joel Ndzi",
        meetingTime: "Every Saturday 4:00 PM",
        latestUpdate:
          "Launch of a Bible mentoring and career guidance program for students.",
        image: "/images/ministry-youth.svg"
      },
      {
        id: "min-chorale",
        name: "Worship choir",
        summary: "Serving through worship and leading the assembly into God's presence.",
        leader: "Sister Clarisse Ndzi",
        meetingTime: "Tuesday and Friday 6:30 PM",
        latestUpdate: "New bilingual setlist for Easter season and vocal training.",
        image: "/images/ministry-choir.svg"
      },
      {
        id: "min-enfants",
        name: "Children ministry",
        summary: "Teaching the Word to children with stories and age-appropriate activities.",
        leader: "Sister Mireille",
        meetingTime: "Sunday 9:00 AM",
        latestUpdate: "Creative workshops on Jesus' parables and new visual supports.",
        image: "/images/ministry-kids.svg"
      },
      {
        id: "min-social",
        name: "Community care",
        summary: "Family support, visits, and outreach for the local community.",
        leader: "Brother Samuel Ndzi",
        meetingTime: "Monthly planning",
        latestUpdate: "Food basket distribution and pastoral follow-up for elders.",
        image: "/images/ministry-care.svg"
      }
    ],
    updates: [
      {
        id: "upd-veillee-mars",
        title: "March vigil: a night of healing",
        slug: "veillee-mars-nuit-guerison",
        excerpt:
          "Highlights from the March vigil: testimonies, prayers, and teaching on inner healing.",
        content: [
          "The March vigil gathered families around a central theme: inner healing.",
          "Strong worship moments helped participants surrender fully to God.",
          "A special time of intercession was led for the city of Yaounde and local homes."
        ],
        cover: "/images/news-healing.svg",
        tags: ["Prayer", "Testimonies"],
        publishedAt: "2026-03-10"
      },
      {
        id: "upd-formation-leaders",
        title: "Cell leader training",
        slug: "formation-leaders-cellule",
        excerpt:
          "A weekend training to strengthen vision and coordination of home groups.",
        content: [
          "Cell leaders received teaching on spiritual leadership and responsibility.",
          "Practical workshops helped organize visits and inter-cell communication.",
          "Each leader left with an action plan for the coming months."
        ],
        cover: "/images/news-leadership.svg",
        tags: ["Discipleship", "Training"],
        publishedAt: "2026-03-28"
      },
      {
        id: "upd-evangelisation",
        title: "Outreach mission in Nkolbisson",
        slug: "mission-evangelisation-nkolbisson",
        excerpt:
          "A team shared the Gospel in three neighborhoods, with prayer and resource distribution.",
        content: [
          "Several families received prayer and accepted a pastoral visit.",
          "Youth led outdoor worship moments.",
          "The team is preparing follow-up for the people contacted."
        ],
        cover: "/images/news-outreach.svg",
        tags: ["Outreach", "Youth"],
        publishedAt: "2026-04-12"
      }
    ],
    stories: [
      {
        id: "story-1",
        title: "David and Goliath",
        subtitle: "Courage that comes from faith",
        slug: "david-et-goliath",
        readingTime: 6,
        tags: ["Faith", "Courage"],
        hero: "/images/story-david.svg",
        publishedAt: "2026-02-14",
        blocks: [
          {
            id: "s1-b1",
            type: "paragraph",
            text:
              "Israel's army faced a fierce giant. Each day, Goliath challenged the people and spread fear."
          },
          {
            id: "s1-b2",
            type: "image",
            image: "/images/story-david-stone.svg",
            caption: "David chose five smooth stones, trusting God's protection.",
            align: "center"
          },
          {
            id: "s1-b3",
            type: "paragraph",
            text:
              "David, a young shepherd, stepped forward with simple faith. He knew the battle belonged to the Lord."
          },
          {
            id: "s1-b4",
            type: "image_text",
            image: "/images/story-david-victory.svg",
            text:
              "His victory was not only physical; it testified that God lifts those who trust him.",
            caption: "The people took courage and walked into victory.",
            align: "right"
          }
        ]
      },
      {
        id: "story-2",
        title: "The lost sheep",
        subtitle: "A love that seeks and restores",
        slug: "la-brebis-retrouvee",
        readingTime: 5,
        tags: ["Mercy", "Love"],
        hero: "/images/story-shepherd.svg",
        publishedAt: "2026-02-07",
        blocks: [
          {
            id: "s2-b1",
            type: "paragraph",
            text:
              "Jesus told a story about a shepherd who left ninety-nine sheep to find the one that was lost."
          },
          {
            id: "s2-b2",
            type: "image_text",
            image: "/images/story-shepherd-path.svg",
            text:
              "The shepherd did not rest until he found the sheep. His joy was great when he brought it back."
          },
          {
            id: "s2-b3",
            type: "paragraph",
            text:
              "This story reminds us of God's personal love for each person and his desire to restore those who drift."
          }
        ]
      },
      {
        id: "story-3",
        title: "The wedding at Cana",
        subtitle: "A miracle of provision and joy",
        slug: "noces-de-cana",
        readingTime: 7,
        tags: ["Miracle", "Hope"],
        hero: "/images/story-cana.svg",
        publishedAt: "2026-01-30",
        blocks: [
          {
            id: "s3-b1",
            type: "paragraph",
            text:
              "At Cana, a wedding celebration risked ending in shame: the wine had run out."
          },
          {
            id: "s3-b2",
            type: "image",
            image: "/images/story-cana-jars.svg",
            caption: "Jesus turned water into wine, revealing his glory.",
            align: "center"
          },
          {
            id: "s3-b3",
            type: "paragraph",
            text:
              "This miracle teaches that Jesus cares about the details of our lives and brings new joy."
          }
        ]
      }
    ],
    questions: [
      {
        id: "q1",
        questionText: "Why pray if God already knows everything?",
        createdAt: "2026-02-03",
        status: "answered"
      },
      {
        id: "q2",
        questionText: "How can I find peace during a trial?",
        createdAt: "2026-02-05",
        status: "answered"
      },
      {
        id: "q3",
        questionText: "What is the difference between faith and hope?",
        createdAt: "2026-02-11",
        status: "new"
      },
      {
        id: "q4",
        questionText: "Can I request a pastoral visit for my family?",
        createdAt: "2026-02-12",
        status: "private"
      }
    ],
    answers: [
      {
        id: "a1",
        questionId: "q1",
        answerText:
          "Prayer does not inform God; it draws us near to him. It is a living relationship where we lay our burdens down and receive his direction.",
        answeredAt: "2026-02-06",
        answeredBy: "Pastor Emmanuel",
        isPublic: true
      },
      {
        id: "a2",
        questionId: "q2",
        answerText:
          "Peace often comes by meditating on the Word, praying with other believers, and remembering that God walks with us.",
        answeredAt: "2026-02-10",
        answeredBy: "Sister Nadine",
        isPublic: true
      }
    ]
  }
};

export function getEvents(locale?: string) {
  return dataByLocale[getLocale(locale)].events;
}

export function getMinistries(locale?: string) {
  return dataByLocale[getLocale(locale)].ministries;
}

export function getUpdates(locale?: string) {
  return dataByLocale[getLocale(locale)].updates;
}

export function getStories(locale?: string) {
  return dataByLocale[getLocale(locale)].stories;
}

export function getQuestions(locale?: string) {
  return dataByLocale[getLocale(locale)].questions;
}

export function getAnswers(locale?: string) {
  return dataByLocale[getLocale(locale)].answers;
}

export function getStoryTags(locale?: string) {
  return Array.from(new Set(getStories(locale).flatMap((story) => story.tags)));
}

export function getEventMinistries(locale?: string) {
  return Array.from(new Set(getEvents(locale).map((event) => event.ministry)));
}

export function getStoryBySlug(locale: string | undefined, slug: string) {
  return getStories(locale).find((story) => story.slug === slug);
}

export function getUpdateBySlug(locale: string | undefined, slug: string) {
  return getUpdates(locale).find((update) => update.slug === slug);
}
