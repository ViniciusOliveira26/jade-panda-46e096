// Unidade 4 — Families. Conteúdo pedagógico original da versão 1 (não alterar a ordem das
// questões, frases e flashcards: o progresso salvo dos alunos usa a posição de cada item).
import type { Unit } from "../types";

const unit: Unit = {
  "title": "Families",
  "page": 42,
  "goals": [
    "Talk about family photos",
    "Ask about relatives",
    "Describe appearance",
    "Talk about your family"
  ],
  "vocab": [
    "Family relationships",
    "Adjectives to describe people",
    "Numbers 21–101",
    "Hair and face",
    "More adjectives"
  ],
  "grammar": [
    "Who questions with be",
    "Be with adjectives",
    "How old questions",
    "Very, really, so",
    "Have / has",
    "Describing people with be and have"
  ],
  "conversation": [
    "Change the topic with “And…”",
    "Invite someone to talk with “Tell me about…”",
    "Show interest with “Really?”"
  ],
  "listening": [
    "Identify the people being described",
    "Match conversations to families"
  ],
  "reading": [
    "Descriptions of famous actors and their families"
  ],
  "writing": "Write about your relatives.",
  "examples": [
    "Who's that? That's my grandmother.",
    "How old is your brother? He's twenty-five.",
    "My sister is really tall. She has long, curly hair.",
    "Tell me about your family. — Really? Five brothers?"
  ],
  "lessons": [
    {
      "title": "Family words and Who questions",
      "explain": "Use Who to ask about people. Answer with That's / This is + my + family word.",
      "head": [
        "Male",
        "Female",
        "Both"
      ],
      "rows": [
        [
          "father",
          "mother",
          "parents"
        ],
        [
          "brother",
          "sister",
          "siblings"
        ],
        [
          "son",
          "daughter",
          "children"
        ],
        [
          "grandfather",
          "grandmother",
          "grandparents"
        ],
        [
          "uncle",
          "aunt",
          "cousin"
        ],
        [
          "husband",
          "wife",
          "—"
        ]
      ],
      "tip": "False friend! “Parents” = pai e mãe. “Relatives” = parentes. “Who's that? That's my aunt.”"
    },
    {
      "title": "Have / has and How old…?",
      "explain": "Use have / has to talk about family members and appearance. Use be + years old to talk about age.",
      "head": [
        "Subject",
        "Verb",
        "Example"
      ],
      "rows": [
        [
          "I / You / We / They",
          "have",
          "I have two brothers."
        ],
        [
          "He / She / It",
          "has",
          "She has blue eyes."
        ],
        [
          "Question about age",
          "be",
          "How old is your sister? She's 15 (years old)."
        ]
      ],
      "tip": "For age, use be: “I am 20 years old”, not “I have 20 years”."
    },
    {
      "title": "Describing people: be + adjective, have + hair / eyes",
      "explain": "Use be + adjective for general appearance and have / has for hair and eyes. Use very, really or so to make an adjective stronger.",
      "head": [
        "Structure",
        "Example"
      ],
      "rows": [
        [
          "be + adjective",
          "He's tall. · They're young."
        ],
        [
          "very / really / so + adjective",
          "My grandmother is really friendly."
        ],
        [
          "have + adjective + hair",
          "She has long, curly hair."
        ],
        [
          "have + adjective + eyes",
          "He has brown eyes."
        ]
      ],
      "tip": "Adjectives never take -s: “They are tall”, not “They are talls”."
    }
  ],
  "questions": [
    {
      "prompt": "How old ___ your sister?",
      "options": [
        "are",
        "is",
        "am"
      ],
      "answer": 1,
      "explanation": "Use is with your sister."
    },
    {
      "prompt": "He ___ brown eyes.",
      "options": [
        "have",
        "has",
        "is"
      ],
      "answer": 1,
      "explanation": "Use has with he."
    },
    {
      "prompt": "Choose the adjective.",
      "options": [
        "Beautiful",
        "Beauty",
        "Beautifully"
      ],
      "answer": 0,
      "explanation": "Beautiful describes a person or thing."
    },
    {
      "prompt": "My father's brother is my ___.",
      "options": [
        "cousin",
        "uncle",
        "nephew"
      ],
      "answer": 1,
      "explanation": "Your father's brother is your uncle."
    },
    {
      "prompt": "She ___ long, curly hair.",
      "options": [
        "is",
        "have",
        "has"
      ],
      "answer": 2,
      "explanation": "Use has with she."
    },
    {
      "prompt": "How old are you? — ___",
      "options": [
        "I have 20 years.",
        "I'm 20 years old.",
        "I'm 20 years."
      ],
      "answer": 1,
      "explanation": "Use be + years old for age."
    },
    {
      "prompt": "Choose the number 72.",
      "options": [
        "Seventy-two",
        "Twenty-seven",
        "Seventeen-two"
      ],
      "answer": 0,
      "explanation": "72 = seventy-two."
    },
    {
      "prompt": "“Parents” means…",
      "options": [
        "mother and father",
        "all your relatives",
        "your cousins"
      ],
      "answer": 0,
      "explanation": "Parents = pai e mãe."
    }
  ],
  "flashcards": [
    {
      "en": "Mother",
      "pt": "Mãe"
    },
    {
      "en": "Father",
      "pt": "Pai"
    },
    {
      "en": "Sister",
      "pt": "Irmã"
    },
    {
      "en": "Brother",
      "pt": "Irmão"
    },
    {
      "en": "Tall",
      "pt": "Alto(a)"
    },
    {
      "en": "Curly hair",
      "pt": "Cabelo cacheado"
    },
    {
      "en": "Grandmother",
      "pt": "Avó"
    },
    {
      "en": "Uncle",
      "pt": "Tio"
    },
    {
      "en": "Aunt",
      "pt": "Tia"
    },
    {
      "en": "Cousin",
      "pt": "Primo(a)"
    },
    {
      "en": "Parents",
      "pt": "Pais (pai e mãe)"
    },
    {
      "en": "Short",
      "pt": "Baixo(a)"
    }
  ],
  "fills": [
    {
      "sentence": "My mother's mother is my ___.",
      "answers": [
        "grandmother",
        "grandma"
      ],
      "hint": "avó",
      "explanation": "Your mother's mother is your grandmother."
    },
    {
      "sentence": "My father ___ blue eyes.",
      "answers": [
        "has"
      ],
      "hint": "have com he / she",
      "explanation": "Use has with he, she, it."
    },
    {
      "sentence": "My sister ___ tall.",
      "answers": [
        "is"
      ],
      "hint": "verbo to be com she",
      "explanation": "My sister is tall."
    },
    {
      "sentence": "___ is that? It's my uncle.",
      "answers": [
        "who"
      ],
      "hint": "pergunta sobre pessoas",
      "explanation": "Use who to ask about people."
    },
    {
      "sentence": "I ___ two brothers.",
      "answers": [
        "have"
      ],
      "hint": "have com I",
      "explanation": "Use have with I, you, we, they."
    },
    {
      "sentence": "My brother is twenty ___ old.",
      "answers": [
        "years"
      ],
      "hint": "idade",
      "explanation": "Age: twenty years old."
    }
  ],
  "examExtra": [
    {
      "prompt": "___ is that? It's my father.",
      "options": [
        "What",
        "Who",
        "Where"
      ],
      "answer": 1,
      "explanation": "Use who to ask about people."
    },
    {
      "prompt": "Choose the number 45.",
      "options": [
        "Forty-five",
        "Fourteen-five",
        "Fifty-four"
      ],
      "answer": 0,
      "explanation": "45 = forty-five."
    },
    {
      "prompt": "My brother is ___ tall.",
      "options": [
        "very",
        "many",
        "much"
      ],
      "answer": 0,
      "explanation": "Very makes an adjective stronger."
    }
  ],
  "dialogue": {
    "text": "This is my family. My mother is tall. My father has brown hair. My sister is a student.",
    "speakers": "AAAA"
  },
  "readingPractice": {
    "title": "My family",
    "text": "Hi! I'm Lucas, and I'm 19 years old. There are five people in my family. My father, Roberto, is 50. He's tall and he has short gray hair. My mother, Helena, is 47. She's really friendly and she has long brown hair. My sister, Bia, is 15. She has curly hair and green eyes, just like my grandmother! My brother, Rafa, is only six. He's very funny.",
    "questions": [
      {
        "prompt": "How old is Lucas's mother?",
        "options": [
          "50",
          "47",
          "15"
        ],
        "answer": 1,
        "explanation": "“My mother, Helena, is 47.”"
      },
      {
        "prompt": "Who has green eyes?",
        "options": [
          "Lucas's mother",
          "Lucas's sister",
          "Lucas's brother"
        ],
        "answer": 1,
        "explanation": "Bia has curly hair and green eyes."
      },
      {
        "prompt": "Describe Roberto.",
        "options": [
          "Short, with long hair",
          "Tall, with short gray hair",
          "Funny and six years old"
        ],
        "answer": 1,
        "explanation": "“He's tall and he has short gray hair.”"
      }
    ]
  },
  "writingPractice": {
    "model": "I have a small family. My mother's name is Rosa. She's 52 years old. She's short and she has long black hair. My brother is Diego. He's 24. He's very tall and he has brown eyes. I also have two cousins.",
    "phrases": [
      "I have … brothers / sisters.",
      "My … is … years old.",
      "He's / She's very …",
      "He / She has … hair / eyes."
    ],
    "checks": [
      {
        "label": "Use have / has",
        "pattern": "\\b(have|has)\\b"
      },
      {
        "label": "Use a family word",
        "pattern": "\\b(mother|father|sister|brother|parents|grandmother|grandfather|uncle|aunt|cousin|son|daughter|wife|husband)\\b"
      },
      {
        "label": "Describe appearance (tall, hair, eyes…)",
        "pattern": "\\b(tall|short|young|old|hair|eyes|thin|beautiful|handsome)\\b"
      }
    ]
  }
};

export default unit;
