// Unidade 9 — Activities and Plans. Conteúdo pedagógico original da versão 1 (não alterar a ordem das
// questões, frases e flashcards: o progresso salvo dos alunos usa a posição de cada item).
import type { Unit } from "../types";

const unit: Unit = {
  "title": "Activities and Plans",
  "page": 102,
  "goals": [
    "Offer to call someone back",
    "Ask about future plans",
    "Catch up with old friends",
    "Talk about activities and plans"
  ],
  "vocab": [
    "Weather expressions",
    "Clothes for weather",
    "Time expressions",
    "Outdoor activities",
    "Weather vocabulary",
    "Four seasons"
  ],
  "grammar": [
    "Present continuous statements",
    "Yes / no questions",
    "Present continuous for future plans",
    "Information questions"
  ],
  "conversation": [
    "Answer the phone with “Hello?”",
    "Identify yourself with “This is…”",
    "Apologize and end a conversation"
  ],
  "listening": [
    "Understand a weather forecast",
    "Identify activities and future plans"
  ],
  "reading": [
    "A daily planner",
    "An interview with a marathon runner"
  ],
  "writing": "Write about your weekend plans.",
  "examples": [
    "Hello? — Hi, this is Mark. Are you busy?",
    "I'm cooking dinner right now. Can I call you back?",
    "What are you doing this weekend? I'm visiting my parents.",
    "It's raining today. Take an umbrella!"
  ],
  "lessons": [
    {
      "title": "Present continuous: actions happening now",
      "explain": "Use be + verb-ing for actions happening right now. Pay attention to the spelling of the -ing form.",
      "head": [
        "Subject",
        "Be + verb-ing",
        "Spelling rule"
      ],
      "rows": [
        [
          "I",
          "I'm cooking.",
          "Most verbs + -ing: cook → cooking"
        ],
        [
          "You / We / They",
          "They're playing soccer.",
          "Final -e: make → making"
        ],
        [
          "He / She / It",
          "She's running.",
          "Short verb, CVC: run → running · swim → swimming"
        ],
        [
          "Negative",
          "He isn't sleeping.",
          "study → studying"
        ]
      ],
      "tip": "Don't forget be: “I am working”, not “I working”."
    },
    {
      "title": "Questions in the present continuous",
      "explain": "Put be before the subject. For information questions, start with a question word.",
      "head": [
        "Question",
        "Answer"
      ],
      "rows": [
        [
          "Are you working now?",
          "Yes, I am. / No, I'm not."
        ],
        [
          "Is it raining?",
          "Yes, it is. / No, it isn't."
        ],
        [
          "What are you doing?",
          "I'm watching a movie."
        ],
        [
          "Where is she going?",
          "She's going to the beach."
        ]
      ],
      "tip": "On the phone: “Hello? — Hi, this is Mark.” Use This is, not I am."
    },
    {
      "title": "Future plans and the weather",
      "explain": "Use the present continuous with a future time expression for plans. Use It's… to talk about the weather.",
      "head": [
        "Plan / Weather",
        "Example"
      ],
      "rows": [
        [
          "this weekend",
          "I'm visiting my parents this weekend."
        ],
        [
          "tomorrow / tonight",
          "We're having dinner out tonight."
        ],
        [
          "next week",
          "She's traveling next week."
        ],
        [
          "Weather",
          "It's sunny. · It's cloudy. · It's raining. · It's snowing. · It's hot / cold."
        ],
        [
          "Seasons",
          "spring · summer · fall (autumn) · winter"
        ]
      ],
      "tip": "Use it for weather: “It's raining”, not “Is raining”."
    }
  ],
  "questions": [
    {
      "prompt": "She ___ studying now.",
      "options": [
        "is",
        "are",
        "am"
      ],
      "answer": 0,
      "explanation": "Present continuous: she is + verb-ing."
    },
    {
      "prompt": "What are you doing?",
      "options": [
        "I am cooking.",
        "I cook yesterday.",
        "I cooking."
      ],
      "answer": 0,
      "explanation": "Use am + verb-ing."
    },
    {
      "prompt": "They ___ playing soccer.",
      "options": [
        "is",
        "are",
        "am"
      ],
      "answer": 1,
      "explanation": "Use are with they."
    },
    {
      "prompt": "Listen! The baby ___.",
      "options": [
        "cries",
        "is crying",
        "crying"
      ],
      "answer": 1,
      "explanation": "Use the present continuous for actions happening now."
    },
    {
      "prompt": "Choose the correct spelling.",
      "options": [
        "runing",
        "running",
        "runnning"
      ],
      "answer": 1,
      "explanation": "Run → running (double n)."
    },
    {
      "prompt": "___ you working tomorrow?",
      "options": [
        "Do",
        "Are",
        "Is"
      ],
      "answer": 1,
      "explanation": "Are you + verb-ing?"
    },
    {
      "prompt": "It's very cold and everything is white. It's ___.",
      "options": [
        "snowing",
        "sunny",
        "hot"
      ],
      "answer": 0,
      "explanation": "Snowing = nevando."
    },
    {
      "prompt": "Hello? — Hi, ___ Mark.",
      "options": [
        "I am",
        "this is",
        "here is"
      ],
      "answer": 1,
      "explanation": "On the phone: This is…"
    }
  ],
  "flashcards": [
    {
      "en": "Weather",
      "pt": "Clima"
    },
    {
      "en": "Sunny",
      "pt": "Ensolarado"
    },
    {
      "en": "Rainy",
      "pt": "Chuvoso"
    },
    {
      "en": "Plan",
      "pt": "Plano"
    },
    {
      "en": "Tomorrow",
      "pt": "Amanhã"
    },
    {
      "en": "Running",
      "pt": "Corrida"
    },
    {
      "en": "Cloudy",
      "pt": "Nublado"
    },
    {
      "en": "Snowing",
      "pt": "Nevando"
    },
    {
      "en": "Hot",
      "pt": "Quente"
    },
    {
      "en": "Cold",
      "pt": "Frio"
    },
    {
      "en": "Umbrella",
      "pt": "Guarda-chuva"
    },
    {
      "en": "Next week",
      "pt": "Semana que vem"
    }
  ],
  "fills": [
    {
      "sentence": "I am ___ a book now. (read)",
      "answers": [
        "reading"
      ],
      "hint": "verbo + -ing",
      "explanation": "Present continuous: am + reading."
    },
    {
      "sentence": "They ___ playing soccer.",
      "answers": [
        "are"
      ],
      "hint": "to be com they",
      "explanation": "They are playing."
    },
    {
      "sentence": "Take an umbrella. It's ___ today.",
      "answers": [
        "rainy",
        "raining"
      ],
      "hint": "chuvoso",
      "explanation": "It's rainy / it's raining."
    },
    {
      "sentence": "What ___ you doing tomorrow?",
      "answers": [
        "are"
      ],
      "hint": "to be com you",
      "explanation": "What are you doing…?"
    },
    {
      "sentence": "She is ___ to the beach on Sunday. (go)",
      "answers": [
        "going"
      ],
      "hint": "verbo + -ing",
      "explanation": "Is going to the beach."
    },
    {
      "sentence": "I'm going ___ visit my grandparents.",
      "answers": [
        "to"
      ],
      "hint": "going ___ + verbo",
      "explanation": "Going to + verb for plans."
    }
  ],
  "examExtra": [
    {
      "prompt": "It's raining. Take an ___.",
      "options": [
        "umbrella",
        "sunglasses",
        "shorts"
      ],
      "answer": 0,
      "explanation": "You need an umbrella when it rains."
    },
    {
      "prompt": "What ___ they doing this weekend?",
      "options": [
        "is",
        "are",
        "do"
      ],
      "answer": 1,
      "explanation": "Present continuous with they: are + verb-ing."
    },
    {
      "prompt": "Which season is usually the coldest?",
      "options": [
        "Summer",
        "Winter",
        "Spring"
      ],
      "answer": 1,
      "explanation": "Winter is the coldest season."
    }
  ],
  "dialogue": {
    "text": "What are you doing tomorrow? I am visiting a friend. Is it sunny? Yes, it is.",
    "speakers": "ABAB"
  },
  "readingPractice": {
    "title": "A message from Nina",
    "text": "Hi Sam! This is Nina. What are you doing this weekend? I'm running in the city marathon on Sunday morning! It's my first marathon, so I'm training a lot this week. Tomorrow I'm running ten kilometers in the park. The forecast says it's sunny on Sunday, but it's raining a little today, so I'm staying home and resting. Are you coming to watch? Call me back!",
    "questions": [
      {
        "prompt": "What is Nina doing on Sunday?",
        "options": [
          "Running in a marathon",
          "Staying home",
          "Watching a movie"
        ],
        "answer": 0,
        "explanation": "“I'm running in the city marathon on Sunday morning!”"
      },
      {
        "prompt": "What is the weather like today?",
        "options": [
          "It's sunny.",
          "It's raining a little.",
          "It's snowing."
        ],
        "answer": 1,
        "explanation": "“It's raining a little today.”"
      },
      {
        "prompt": "What is Nina doing today?",
        "options": [
          "Running ten kilometers",
          "Staying home and resting",
          "Visiting Sam"
        ],
        "answer": 1,
        "explanation": "“I'm staying home and resting.”"
      }
    ]
  },
  "writingPractice": {
    "model": "This weekend I'm not working. On Saturday morning I'm meeting my friends at the beach, because it's sunny and hot. In the evening I'm cooking dinner for my family. On Sunday I'm visiting my grandparents. What are you doing this weekend?",
    "phrases": [
      "This weekend I'm …",
      "On Saturday / Sunday I'm …",
      "It's sunny / raining …",
      "What are you doing …?"
    ],
    "checks": [
      {
        "label": "Use the present continuous (be + -ing)",
        "pattern": "\\b(am|is|are|'m|'s|'re)\\s+(not\\s+)?[a-z]+ing\\b|'m\\s+[a-z]+ing|'re\\s+[a-z]+ing|'s\\s+[a-z]+ing"
      },
      {
        "label": "Use a future time expression",
        "pattern": "this weekend|tomorrow|tonight|next|on (saturday|sunday|monday|tuesday|wednesday|thursday|friday)"
      },
      {
        "label": "Talk about the weather",
        "pattern": "sunny|rain|cloudy|snow|hot|cold|windy|warm"
      }
    ]
  }
};

export default unit;
