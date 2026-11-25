// Unidade 8 — Houses and Homes. Conteúdo pedagógico original da versão 1 (não alterar a ordem das
// questões, frases e flashcards: o progresso salvo dos alunos usa a posição de cada item).
import type { Unit } from "../types";

const unit: Unit = {
  "title": "Houses and Homes",
  "page": 90,
  "goals": [
    "Ask about someone's home",
    "Agree and disagree about styles",
    "Talk about where you live, work, or study",
    "Compare home preferences"
  ],
  "vocab": [
    "Rooms, furniture and appliances",
    "Buildings",
    "Parts of a building",
    "Places in cities and towns",
    "House and apartment vocabulary"
  ],
  "grammar": [
    "There is and There are",
    "Questions with How many",
    "Where questions in simple present",
    "Prepositions of place"
  ],
  "conversation": [
    "Add information with “And…”",
    "Use “Actually, no / yes”",
    "Soften a negative opinion"
  ],
  "listening": [
    "Identify rooms and furniture",
    "Understand housing preferences"
  ],
  "reading": [
    "Descriptions of people and their homes"
  ],
  "writing": "Write about where you live.",
  "examples": [
    "There's a big sofa in the living room.",
    "How many bedrooms are there? There are three.",
    "Where do you live? I live in an apartment downtown.",
    "The lamp is between the bed and the window."
  ],
  "lessons": [
    {
      "title": "There is / There are",
      "explain": "Use there is with singular nouns and there are with plural nouns to say that something exists in a place.",
      "head": [
        "",
        "Singular",
        "Plural"
      ],
      "rows": [
        [
          "Affirmative",
          "There's a sofa.",
          "There are two bedrooms."
        ],
        [
          "Negative",
          "There isn't a garage.",
          "There aren't any chairs."
        ],
        [
          "Question",
          "Is there a garden?",
          "Are there any windows?"
        ],
        [
          "Short answer",
          "Yes, there is. / No, there isn't.",
          "Yes, there are. / No, there aren't."
        ]
      ],
      "tip": "Don't use have for existence: “There is a park near my house”, not “Have a park near my house”."
    },
    {
      "title": "How many…? and Where…? in the simple present",
      "explain": "Use How many + plural noun to ask about quantity. Use Where do / does…? to ask where people live, work or study.",
      "head": [
        "Question",
        "Answer"
      ],
      "rows": [
        [
          "How many bedrooms are there?",
          "There are three."
        ],
        [
          "How many bathrooms are there?",
          "There's only one."
        ],
        [
          "Where do you live?",
          "I live in an apartment downtown."
        ],
        [
          "Where does she work?",
          "She works at a hospital."
        ]
      ],
      "tip": "Always use a plural noun after How many: “How many rooms…?”, not “How many room…?”."
    },
    {
      "title": "Prepositions of place",
      "explain": "Use prepositions to say where things are in a room or a building.",
      "head": [
        "Preposition",
        "Example"
      ],
      "rows": [
        [
          "in",
          "The towels are in the bathroom."
        ],
        [
          "on",
          "The lamp is on the table."
        ],
        [
          "under",
          "The cat is under the bed."
        ],
        [
          "next to",
          "The sofa is next to the window."
        ],
        [
          "between",
          "The bed is between two lamps."
        ],
        [
          "in front of / behind",
          "The TV is in front of the sofa. The garden is behind the house."
        ]
      ],
      "tip": "“In front of” = na frente de. “Across from” = do outro lado (da rua)."
    }
  ],
  "questions": [
    {
      "prompt": "___ a sofa in the living room.",
      "options": [
        "There are",
        "There is",
        "They is"
      ],
      "answer": 1,
      "explanation": "There is is used with a singular noun."
    },
    {
      "prompt": "There ___ two bedrooms.",
      "options": [
        "is",
        "are",
        "am"
      ],
      "answer": 1,
      "explanation": "Use there are with plural nouns."
    },
    {
      "prompt": "The book is ___ the table.",
      "options": [
        "on",
        "between",
        "understand"
      ],
      "answer": 0,
      "explanation": "On expresses position on a surface."
    },
    {
      "prompt": "___ there a microwave in the kitchen?",
      "options": [
        "Are",
        "Is",
        "Do"
      ],
      "answer": 1,
      "explanation": "Is there + singular noun."
    },
    {
      "prompt": "There ___ any chairs in the room.",
      "options": [
        "isn't",
        "aren't",
        "not"
      ],
      "answer": 1,
      "explanation": "Plural negative: there aren't."
    },
    {
      "prompt": "The cat is ___ the bed. (embaixo)",
      "options": [
        "under",
        "on",
        "between"
      ],
      "answer": 0,
      "explanation": "Under = embaixo de."
    },
    {
      "prompt": "How many ___ are there?",
      "options": [
        "bathroom",
        "bathrooms",
        "a bathroom"
      ],
      "answer": 1,
      "explanation": "Use a plural noun after how many."
    },
    {
      "prompt": "Choose the correct sentence.",
      "options": [
        "Have a park near my house.",
        "There is a park near my house.",
        "There are a park near my house."
      ],
      "answer": 1,
      "explanation": "Use there is for existence (singular)."
    }
  ],
  "flashcards": [
    {
      "en": "Kitchen",
      "pt": "Cozinha"
    },
    {
      "en": "Bedroom",
      "pt": "Quarto"
    },
    {
      "en": "Living room",
      "pt": "Sala de estar"
    },
    {
      "en": "Bathroom",
      "pt": "Banheiro"
    },
    {
      "en": "Furniture",
      "pt": "Mobília"
    },
    {
      "en": "There is",
      "pt": "Há (singular)"
    },
    {
      "en": "Sofa",
      "pt": "Sofá"
    },
    {
      "en": "Lamp",
      "pt": "Luminária"
    },
    {
      "en": "Refrigerator",
      "pt": "Geladeira"
    },
    {
      "en": "Stove",
      "pt": "Fogão"
    },
    {
      "en": "Garage",
      "pt": "Garagem"
    },
    {
      "en": "Stairs",
      "pt": "Escada"
    }
  ],
  "fills": [
    {
      "sentence": "There ___ three bedrooms in my house.",
      "answers": [
        "are"
      ],
      "hint": "there is / there are (plural)",
      "explanation": "Use there are with plural nouns."
    },
    {
      "sentence": "There ___ a sofa in the living room.",
      "answers": [
        "is"
      ],
      "hint": "there is / there are (singular)",
      "explanation": "Use there is with a singular noun."
    },
    {
      "sentence": "I cook in the ___.",
      "answers": [
        "kitchen"
      ],
      "hint": "cômodo onde se cozinha",
      "explanation": "Kitchen = cozinha."
    },
    {
      "sentence": "The lamp is ___ the table. (em cima)",
      "answers": [
        "on"
      ],
      "hint": "em cima de uma superfície",
      "explanation": "On = sobre / em cima de."
    },
    {
      "sentence": "___ there a garage? Yes, there is.",
      "answers": [
        "is"
      ],
      "hint": "pergunta com there is",
      "explanation": "Is there…? Yes, there is."
    },
    {
      "sentence": "I live ___ an apartment.",
      "answers": [
        "in"
      ],
      "hint": "dentro de um lugar",
      "explanation": "Live in an apartment."
    }
  ],
  "examExtra": [
    {
      "prompt": "How many ___ are there?",
      "options": [
        "room",
        "rooms",
        "a room"
      ],
      "answer": 1,
      "explanation": "Use plural nouns with how many."
    },
    {
      "prompt": "The lamp is ___ the sofa and the chair.",
      "options": [
        "between",
        "on",
        "in"
      ],
      "answer": 0,
      "explanation": "Between = in the middle of two things."
    },
    {
      "prompt": "Where ___ you live?",
      "options": [
        "does",
        "do",
        "are"
      ],
      "answer": 1,
      "explanation": "Use do with you."
    }
  ],
  "dialogue": {
    "text": "Is there a kitchen? Yes, there is. Are there two bedrooms? No, there is only one.",
    "speakers": "ABAB"
  },
  "readingPractice": {
    "title": "Home sweet home",
    "text": "Hi, I'm Akemi. I live in a small apartment on the tenth floor of a tall building downtown. There's one bedroom, a living room, a bathroom and a little kitchen. There isn't a garage, but there's an elevator. My favorite room is the living room. There's a big window, and there are a lot of plants. My sofa is in front of the window, and my cat sleeps under it all day!",
    "questions": [
      {
        "prompt": "How many bedrooms are there?",
        "options": [
          "One",
          "Two",
          "Three"
        ],
        "answer": 0,
        "explanation": "“There's one bedroom.”"
      },
      {
        "prompt": "Is there a garage?",
        "options": [
          "Yes, there is.",
          "No, there isn't.",
          "Yes, there are two."
        ],
        "answer": 1,
        "explanation": "“There isn't a garage.”"
      },
      {
        "prompt": "Where is the sofa?",
        "options": [
          "Under the window",
          "In front of the window",
          "In the kitchen"
        ],
        "answer": 1,
        "explanation": "“My sofa is in front of the window.”"
      }
    ]
  },
  "writingPractice": {
    "model": "I live in a house in Campinas. There are three bedrooms and two bathrooms. There's a small garden, but there isn't a pool. My favorite room is my bedroom. There's a desk next to the window, and my bed is between two lamps.",
    "phrases": [
      "I live in a house / an apartment …",
      "There is / There are …",
      "There isn't / There aren't …",
      "The … is next to / between …"
    ],
    "checks": [
      {
        "label": "Use there is / there are",
        "pattern": "there is|there's|there are|there isn't|there aren't"
      },
      {
        "label": "Name a room",
        "pattern": "\\b(kitchen|bedroom|bathroom|living room|dining room|garage|garden)\\b"
      },
      {
        "label": "Use a preposition of place",
        "pattern": "\\b(in|on|under|next to|between|behind|in front of)\\b"
      }
    ]
  }
};

export default unit;
