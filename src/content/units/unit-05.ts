// Unidade 5 — Time and Events. Conteúdo pedagógico original da versão 1 (não alterar a ordem das
// questões, frases e flashcards: o progresso salvo dos alunos usa a posição de cada item).
import type { Unit } from "../types";

const unit: Unit = {
  "title": "Time and Events",
  "page": 54,
  "goals": [
    "Ask about the time of events",
    "Make plans to attend events",
    "Ask about birthdays",
    "Describe periods of time"
  ],
  "vocab": [
    "What time is it?",
    "Late, early, on time",
    "Events",
    "Days of the week",
    "Ordinal numbers",
    "Months of the year"
  ],
  "grammar": [
    "When, What time, What day and What month",
    "Prepositions in, on, at"
  ],
  "conversation": [
    "Express concern with “Uh-oh”",
    "Get someone's attention with “Hey”",
    "Show enthusiasm with “Great!”"
  ],
  "listening": [
    "Identify events and times",
    "Recognize who is late, early, or on time"
  ],
  "reading": [
    "Invitations and community events",
    "Neighborhood event announcements"
  ],
  "writing": "Write about events in your city.",
  "examples": [
    "What time is it? It's seven thirty.",
    "The concert is on Friday at 8:00 p.m.",
    "When's your birthday? It's on May fifth.",
    "Uh-oh. We're late! — Hey, the party starts at nine."
  ],
  "lessons": [
    {
      "title": "Telling the time",
      "explain": "Ask What time is it? and answer with It's… English speakers usually use the 12-hour clock with a.m. (morning) and p.m. (afternoon / evening).",
      "head": [
        "Time",
        "How to say it"
      ],
      "rows": [
        [
          "7:00",
          "It's seven o'clock."
        ],
        [
          "7:15",
          "It's seven fifteen. / It's a quarter past seven."
        ],
        [
          "7:30",
          "It's seven thirty. / It's half past seven."
        ],
        [
          "7:45",
          "It's seven forty-five. / It's a quarter to eight."
        ],
        [
          "12:00 p.m. / a.m.",
          "It's noon. / It's midnight."
        ],
        [
          "8:00 p.m.",
          "It's eight p.m. (= 20h)"
        ]
      ],
      "tip": "Don't say “It's 20 hours”. Say “It's eight p.m.” or “It's eight in the evening”."
    },
    {
      "title": "Prepositions of time: in, on, at",
      "explain": "Choose the preposition by the type of time expression.",
      "head": [
        "Preposition",
        "Use",
        "Examples"
      ],
      "rows": [
        [
          "at",
          "clock times, night, noon",
          "at 9:00 · at noon · at night"
        ],
        [
          "on",
          "days and dates",
          "on Monday · on May 5th · on the weekend"
        ],
        [
          "in",
          "months, years, seasons, parts of the day",
          "in June · in 2026 · in the summer · in the morning"
        ]
      ],
      "tip": "Say “at night” but “in the morning”, “in the afternoon” and “in the evening”."
    },
    {
      "title": "Ordinal numbers, dates and When questions",
      "explain": "Use ordinal numbers for dates. Ask When…?, What day…?, What month…? or What time…? about events.",
      "head": [
        "Number",
        "Ordinal",
        "Example"
      ],
      "rows": [
        [
          "1",
          "first (1st)",
          "January is the first month."
        ],
        [
          "2",
          "second (2nd)",
          "My birthday is on March 2nd."
        ],
        [
          "3",
          "third (3rd)",
          "The party is on the third."
        ],
        [
          "5",
          "fifth (5th)",
          "When's the concert? It's on May fifth."
        ],
        [
          "12",
          "twelfth (12th)",
          "December is the twelfth month."
        ],
        [
          "21",
          "twenty-first (21st)",
          "The meeting is on the 21st."
        ]
      ],
      "tip": "Write “May 5th” but say “May fifth”. Numbers 1, 2 and 3 are irregular: first, second, third."
    }
  ],
  "questions": [
    {
      "prompt": "What time ___ the event?",
      "options": [
        "are",
        "is",
        "am"
      ],
      "answer": 1,
      "explanation": "Use is with a singular event."
    },
    {
      "prompt": "The party is ___ Monday.",
      "options": [
        "on",
        "at",
        "in"
      ],
      "answer": 0,
      "explanation": "Use on with days of the week."
    },
    {
      "prompt": "Which is a month?",
      "options": [
        "Tuesday",
        "October",
        "Morning"
      ],
      "answer": 1,
      "explanation": "October is a month."
    },
    {
      "prompt": "It's 7:30. It's ___ past seven.",
      "options": [
        "half",
        "quarter",
        "thirty"
      ],
      "answer": 0,
      "explanation": "7:30 = half past seven."
    },
    {
      "prompt": "The class is ___ the morning.",
      "options": [
        "at",
        "on",
        "in"
      ],
      "answer": 2,
      "explanation": "In the morning."
    },
    {
      "prompt": "When's your birthday? — It's ___ October 10th.",
      "options": [
        "in",
        "on",
        "at"
      ],
      "answer": 1,
      "explanation": "Use on with dates."
    },
    {
      "prompt": "What day comes after Wednesday?",
      "options": [
        "Tuesday",
        "Thursday",
        "Friday"
      ],
      "answer": 1,
      "explanation": "Wednesday → Thursday."
    },
    {
      "prompt": "The movie starts at 8:00. You arrive at 7:50. You are ___.",
      "options": [
        "late",
        "early",
        "on time"
      ],
      "answer": 1,
      "explanation": "Before the time = early."
    }
  ],
  "flashcards": [
    {
      "en": "Monday",
      "pt": "Segunda-feira"
    },
    {
      "en": "Birthday",
      "pt": "Aniversário"
    },
    {
      "en": "Early",
      "pt": "Cedo"
    },
    {
      "en": "Late",
      "pt": "Atrasado(a)"
    },
    {
      "en": "Month",
      "pt": "Mês"
    },
    {
      "en": "Weekend",
      "pt": "Fim de semana"
    },
    {
      "en": "Concert",
      "pt": "Show"
    },
    {
      "en": "Party",
      "pt": "Festa"
    },
    {
      "en": "Today",
      "pt": "Hoje"
    },
    {
      "en": "Noon",
      "pt": "Meio-dia"
    },
    {
      "en": "Midnight",
      "pt": "Meia-noite"
    },
    {
      "en": "On time",
      "pt": "Na hora (pontual)"
    }
  ],
  "fills": [
    {
      "sentence": "The class is ___ 9:00.",
      "answers": [
        "at"
      ],
      "hint": "preposição com horas",
      "explanation": "Use at with clock times."
    },
    {
      "sentence": "My birthday is ___ June.",
      "answers": [
        "in"
      ],
      "hint": "preposição com meses",
      "explanation": "Use in with months."
    },
    {
      "sentence": "The party is ___ Friday.",
      "answers": [
        "on"
      ],
      "hint": "preposição com dias da semana",
      "explanation": "Use on with days."
    },
    {
      "sentence": "What ___ is it? It's three o'clock.",
      "answers": [
        "time"
      ],
      "hint": "que horas são?",
      "explanation": "What time is it?"
    },
    {
      "sentence": "January is the ___ month of the year. (primeiro)",
      "answers": [
        "first"
      ],
      "hint": "número ordinal de one",
      "explanation": "One → first."
    },
    {
      "sentence": "The movie starts at 7, and we arrive at 7:30. We are ___.",
      "answers": [
        "late"
      ],
      "hint": "atrasados",
      "explanation": "Late = atrasado(a)."
    }
  ],
  "examExtra": [
    {
      "prompt": "The concert is ___ 8:00.",
      "options": [
        "on",
        "in",
        "at"
      ],
      "answer": 2,
      "explanation": "Use at with clock times."
    },
    {
      "prompt": "My birthday is ___ May.",
      "options": [
        "at",
        "in",
        "on"
      ],
      "answer": 1,
      "explanation": "Use in with months."
    },
    {
      "prompt": "Which is an ordinal number?",
      "options": [
        "Three",
        "Third",
        "Thirty"
      ],
      "answer": 1,
      "explanation": "Third is an ordinal number."
    }
  ],
  "dialogue": {
    "text": "What time is the party? It is at seven on Saturday. Great! See you there.",
    "speakers": "ABAA"
  },
  "readingPractice": {
    "title": "Community events this week",
    "text": "COMMUNITY EVENTS THIS WEEK\n\n• Monday: Free yoga class in the park at 7:00 a.m.\n• Wednesday: Movie night at the library at 8:00 p.m.\n• Saturday, June 14th: Street food festival from noon to 6:00 p.m.\n• Sunday: Kids' music concert at 10:30 a.m.\n\nPlease be on time — the yoga class starts at 7:00 sharp!",
    "questions": [
      {
        "prompt": "When is the movie night?",
        "options": [
          "On Monday at 7:00 a.m.",
          "On Wednesday at 8:00 p.m.",
          "On Sunday at 10:30 a.m."
        ],
        "answer": 1,
        "explanation": "Wednesday: Movie night at 8:00 p.m."
      },
      {
        "prompt": "What is on June 14th?",
        "options": [
          "A street food festival",
          "A yoga class",
          "A music concert"
        ],
        "answer": 0,
        "explanation": "Saturday, June 14th: Street food festival."
      },
      {
        "prompt": "The food festival is from noon to…",
        "options": [
          "6:00 p.m.",
          "8:00 p.m.",
          "10:30 a.m."
        ],
        "answer": 0,
        "explanation": "From noon to 6:00 p.m."
      }
    ]
  },
  "writingPractice": {
    "model": "There is a great music festival in my city. It's in July. This year, it's on July 20th. It starts at 4:00 p.m. on Saturday. My birthday is on March 3rd. My party is at 8:00 p.m.",
    "phrases": [
      "The … is in (month).",
      "It's on (day / date).",
      "It starts at (time).",
      "My birthday is on …"
    ],
    "checks": [
      {
        "label": "Use in / on / at",
        "pattern": "\\b(in|on|at)\\b"
      },
      {
        "label": "Mention a day or a month",
        "pattern": "\\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|march|april|may|june|july|august|september|october|november|december)\\b"
      },
      {
        "label": "Mention a time (8:00, o'clock, p.m.…)",
        "pattern": "\\d|o'clock|a\\.m|p\\.m|noon|midnight"
      }
    ]
  }
};

export default unit;
