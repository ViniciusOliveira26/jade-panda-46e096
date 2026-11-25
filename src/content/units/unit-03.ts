// Unidade 3 — Neighborhoods. Conteúdo pedagógico original da versão 1 (não alterar a ordem das
// questões, frases e flashcards: o progresso salvo dos alunos usa a posição de cada item).
import type { Unit } from "../types";

const unit: Unit = {
  "title": "Neighborhoods",
  "page": 30,
  "goals": [
    "Ask about locations",
    "Suggest how to get to places",
    "Talk about means of transportation",
    "Describe a neighborhood"
  ],
  "vocab": [
    "Means of transportation",
    "Places in the neighborhood",
    "Locations nearby",
    "Imperative verbs",
    "Routine destinations",
    "More neighborhood places"
  ],
  "grammar": [
    "Where questions with be",
    "Subject pronoun it",
    "The imperative",
    "By + means of transportation"
  ],
  "conversation": [
    "Ask for more information",
    "Check understanding of directions with “OK?”",
    "Show interest with “What about you?”"
  ],
  "listening": [
    "Identify vehicles and places",
    "Understand instructions and directions"
  ],
  "reading": [
    "Simple street maps",
    "An email describing a neighborhood"
  ],
  "writing": "Write about your neighborhood.",
  "examples": [
    "Excuse me. Where's the bank? It's around the corner.",
    "Go straight and turn left. OK?",
    "Don't take the bus. Take the train.",
    "I go to work by subway. What about you?"
  ],
  "lessons": [
    {
      "title": "Where questions and places",
      "explain": "Use Where is…? (Where's…?) to ask about a location. Use it in the answer so you don't repeat the place.",
      "head": [
        "Expression",
        "Example"
      ],
      "rows": [
        [
          "next to",
          "The bank is next to the pharmacy."
        ],
        [
          "across from",
          "The park is across from my building."
        ],
        [
          "between",
          "The café is between the bank and the park."
        ],
        [
          "around the corner",
          "The bus stop is around the corner."
        ],
        [
          "near",
          "Is the hospital near here?"
        ],
        [
          "on + street",
          "It's on Main Street."
        ]
      ],
      "tip": "Use on with streets (on Main Street) and at with exact addresses (at 25 Main Street)."
    },
    {
      "title": "The imperative: giving directions",
      "explain": "Use the base form of the verb to give directions and instructions. For the negative, use Don't + verb.",
      "head": [
        "Affirmative",
        "Negative"
      ],
      "rows": [
        [
          "Go straight.",
          "Don't turn here."
        ],
        [
          "Turn left / right.",
          "Don't walk. It's far."
        ],
        [
          "Walk two blocks.",
          "Don't take the bus. Take the train."
        ],
        [
          "Take the subway.",
          "Don't cross the street here."
        ]
      ],
      "tip": "Add please to sound polite: “Please turn left at the corner.” Check understanding with “OK?”."
    },
    {
      "title": "By + means of transportation",
      "explain": "Use by + transportation to say how you go somewhere. Don't use an article after by.",
      "head": [
        "Expression",
        "Example"
      ],
      "rows": [
        [
          "by bus / by car",
          "I go to work by bus."
        ],
        [
          "by train / by subway",
          "She goes to school by subway."
        ],
        [
          "by taxi / by bike",
          "We go home by taxi."
        ],
        [
          "on foot",
          "I go to the park on foot."
        ]
      ],
      "tip": "Say “on foot”, not “by foot”. And no article: “by bus”, not “by the bus”."
    }
  ],
  "questions": [
    {
      "prompt": "Where ___ the bank?",
      "options": [
        "are",
        "am",
        "is"
      ],
      "answer": 2,
      "explanation": "Use is for a singular place."
    },
    {
      "prompt": "Choose a means of transportation.",
      "options": [
        "Bus",
        "Kitchen",
        "Bedroom"
      ],
      "answer": 0,
      "explanation": "A bus is transportation."
    },
    {
      "prompt": "Choose the correct instruction.",
      "options": [
        "Turn left.",
        "Turns left.",
        "Turning left."
      ],
      "answer": 0,
      "explanation": "Use the imperative for directions."
    },
    {
      "prompt": "The pharmacy is ___ the bank and the café.",
      "options": [
        "between",
        "next",
        "across"
      ],
      "answer": 0,
      "explanation": "Between X and Y."
    },
    {
      "prompt": "I go to school ___ foot.",
      "options": [
        "by",
        "on",
        "in"
      ],
      "answer": 1,
      "explanation": "Say on foot."
    },
    {
      "prompt": "Choose the polite question.",
      "options": [
        "Where the bank?",
        "Excuse me. Where's the bank?",
        "Bank where is?"
      ],
      "answer": 1,
      "explanation": "Excuse me + Where's…?"
    },
    {
      "prompt": "“Across from” means…",
      "options": [
        "on the opposite side",
        "behind",
        "very far"
      ],
      "answer": 0,
      "explanation": "Across from = do outro lado / em frente."
    },
    {
      "prompt": "___ take a taxi. It's very expensive.",
      "options": [
        "Don't",
        "Doesn't",
        "Not"
      ],
      "answer": 0,
      "explanation": "Negative imperative: Don't + verb."
    }
  ],
  "flashcards": [
    {
      "en": "Bank",
      "pt": "Banco"
    },
    {
      "en": "Hospital",
      "pt": "Hospital"
    },
    {
      "en": "Bus stop",
      "pt": "Ponto de ônibus"
    },
    {
      "en": "Street",
      "pt": "Rua"
    },
    {
      "en": "Restaurant",
      "pt": "Restaurante"
    },
    {
      "en": "Turn left",
      "pt": "Vire à esquerda"
    },
    {
      "en": "Pharmacy",
      "pt": "Farmácia"
    },
    {
      "en": "Supermarket",
      "pt": "Supermercado"
    },
    {
      "en": "Train station",
      "pt": "Estação de trem"
    },
    {
      "en": "Subway",
      "pt": "Metrô"
    },
    {
      "en": "Across from",
      "pt": "Em frente a (do outro lado)"
    },
    {
      "en": "Around the corner",
      "pt": "Virando a esquina"
    }
  ],
  "fills": [
    {
      "sentence": "There ___ a bank on Main Street.",
      "answers": [
        "is"
      ],
      "hint": "there is / there are (singular)",
      "explanation": "Use there is with a singular noun."
    },
    {
      "sentence": "The pharmacy is ___ to the hospital. (ao lado)",
      "answers": [
        "next"
      ],
      "hint": "ao lado de = ___ to",
      "explanation": "Next to = ao lado de."
    },
    {
      "sentence": "I go to school ___ bus.",
      "answers": [
        "by"
      ],
      "hint": "preposição + meio de transporte",
      "explanation": "Use by + transportation."
    },
    {
      "sentence": "Turn ___ at the corner. (direita)",
      "answers": [
        "right"
      ],
      "hint": "direita",
      "explanation": "Turn right = vire à direita."
    },
    {
      "sentence": "Go ___ for two blocks. (reto)",
      "answers": [
        "straight"
      ],
      "hint": "siga reto",
      "explanation": "Go straight = siga em frente."
    },
    {
      "sentence": "The café is ___ the bank and the park. (entre)",
      "answers": [
        "between"
      ],
      "hint": "entre dois lugares",
      "explanation": "Between = entre."
    }
  ],
  "examExtra": [
    {
      "prompt": "I go to work ___ bus.",
      "options": [
        "by",
        "in",
        "with"
      ],
      "answer": 0,
      "explanation": "Use by + means of transportation."
    },
    {
      "prompt": "Which is a place in the neighborhood?",
      "options": [
        "Pharmacy",
        "Taxi",
        "Train"
      ],
      "answer": 0,
      "explanation": "A pharmacy is a place."
    },
    {
      "prompt": "Choose the negative imperative.",
      "options": [
        "Don't walk.",
        "Not walk.",
        "Doesn't walk."
      ],
      "answer": 0,
      "explanation": "Negative imperative: Don't + verb."
    }
  ],
  "dialogue": {
    "text": "Excuse me. Where is the bank? Go straight and turn left. Is it near the bus stop? Yes, it is.",
    "speakers": "AABAB"
  },
  "readingPractice": {
    "title": "An email about my neighborhood",
    "text": "Hi Marcos,\n\nI love my new neighborhood! There's a big park across from my building, and the supermarket is around the corner. The bus stop is next to the pharmacy. I go to work by subway — the station is only five minutes from my apartment. On weekends, I walk to a nice café on Green Street. What about you? Do you like your neighborhood?\n\nWrite soon!\nClara",
    "questions": [
      {
        "prompt": "Where is the park?",
        "options": [
          "Around the corner",
          "Across from Clara's building",
          "Next to the pharmacy"
        ],
        "answer": 1,
        "explanation": "“There's a big park across from my building.”"
      },
      {
        "prompt": "How does Clara go to work?",
        "options": [
          "By bus",
          "On foot",
          "By subway"
        ],
        "answer": 2,
        "explanation": "“I go to work by subway.”"
      },
      {
        "prompt": "Where is the bus stop?",
        "options": [
          "Next to the pharmacy",
          "On Green Street",
          "Across from the park"
        ],
        "answer": 0,
        "explanation": "“The bus stop is next to the pharmacy.”"
      }
    ]
  },
  "writingPractice": {
    "model": "I live in Vila Mariana. My neighborhood is nice. The bank is next to the supermarket, and the pharmacy is around the corner. I go to school by bus. To get to my house from the station, go straight and turn left.",
    "phrases": [
      "The … is next to / across from …",
      "I go to work / school by …",
      "Go straight and turn left / right.",
      "My neighborhood is …"
    ],
    "checks": [
      {
        "label": "Use a place expression (next to, across from…)",
        "pattern": "next to|across from|between|near|around the corner"
      },
      {
        "label": "Say how you travel (by bus, on foot…)",
        "pattern": "\\bby (bus|car|train|subway|taxi|bike)\\b|on foot"
      },
      {
        "label": "Give a direction (go, turn, walk…)",
        "pattern": "\\b(go|turn|walk|take)\\b"
      }
    ]
  }
};

export default unit;
