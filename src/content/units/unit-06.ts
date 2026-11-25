// Unidade 6 — Clothes. Conteúdo pedagógico original da versão 1 (não alterar a ordem das
// questões, frases e flashcards: o progresso salvo dos alunos usa a posição de cada item).
import type { Unit } from "../types";

const unit: Unit = {
  "title": "Clothes",
  "page": 66,
  "goals": [
    "Give and accept compliments",
    "Ask about sizes and colors",
    "Describe clothes",
    "Shop for clothes"
  ],
  "vocab": [
    "Colors",
    "Clothes",
    "Like, want, need and have",
    "Clothing sizes",
    "Opposite adjectives",
    "More clothes"
  ],
  "grammar": [
    "Simple present: like, want, need, have",
    "Affirmative and negative statements",
    "Yes / no questions",
    "Information questions",
    "This, that, these, those",
    "Adjective placement and too"
  ],
  "conversation": [
    "Ask for confirmation with “Really?”",
    "Accept compliments with “Thanks!”",
    "Express disappointment"
  ],
  "listening": [
    "Identify the clothes people mention",
    "Understand what people want or need"
  ],
  "reading": [
    "Online clothing ads"
  ],
  "writing": "Write about clothes you like, want, need, and have.",
  "examples": [
    "I like your shoes! — Thanks!",
    "Do you have this shirt in a medium? Yes, we do.",
    "These pants are too short. I need a bigger size.",
    "She doesn't like red. She wants a black dress."
  ],
  "lessons": [
    {
      "title": "Simple present: like, want, need, have",
      "explain": "Use the simple present to talk about likes, wishes and needs. With he / she / it, add -s. Use do / does for questions and negatives.",
      "head": [
        "Subject",
        "Affirmative",
        "Negative",
        "Question"
      ],
      "rows": [
        [
          "I / You / We / They",
          "I like red.",
          "I don't like red.",
          "Do you like red?"
        ],
        [
          "He / She / It",
          "She likes red.",
          "She doesn't like red.",
          "Does she like red?"
        ],
        [
          "have",
          "He has a jacket.",
          "He doesn't have a jacket.",
          "Does he have a jacket?"
        ]
      ],
      "tip": "After does / doesn't, the verb has no -s: “Does she want…?”, not “Does she wants…?”."
    },
    {
      "title": "This, that, these, those",
      "explain": "Use this / these for things near you and that / those for things far from you.",
      "head": [
        "",
        "Near",
        "Far"
      ],
      "rows": [
        [
          "Singular",
          "this shirt",
          "that shirt"
        ],
        [
          "Plural",
          "these shoes",
          "those shoes"
        ]
      ],
      "tip": "Pants, jeans, shorts and glasses are always plural: “These jeans are nice.”"
    },
    {
      "title": "Adjectives, opposites and too",
      "explain": "Adjectives come before the noun. Use too + adjective when something is more than you want or need.",
      "head": [
        "Structure",
        "Example"
      ],
      "rows": [
        [
          "adjective + noun",
          "a black jacket · blue jeans"
        ],
        [
          "Opposites",
          "big ≠ small · long ≠ short · cheap ≠ expensive · tight ≠ loose"
        ],
        [
          "too + adjective",
          "These shoes are too small. I need a bigger size."
        ],
        [
          "Compliment",
          "I like your dress! — Thanks!"
        ]
      ],
      "tip": "The adjective comes before the noun: “a black jacket”, not “a jacket black”."
    }
  ],
  "questions": [
    {
      "prompt": "I ___ blue shirts.",
      "options": [
        "likes",
        "like",
        "liking"
      ],
      "answer": 1,
      "explanation": "Use like with I."
    },
    {
      "prompt": "___ shoes are these? (near)",
      "options": [
        "Those",
        "That",
        "These"
      ],
      "answer": 2,
      "explanation": "These refers to plural objects nearby."
    },
    {
      "prompt": "She ___ a new dress.",
      "options": [
        "need",
        "needs",
        "needing"
      ],
      "answer": 1,
      "explanation": "Add -s with she in simple present."
    },
    {
      "prompt": "___ she like green?",
      "options": [
        "Do",
        "Does",
        "Is"
      ],
      "answer": 1,
      "explanation": "Use does with she."
    },
    {
      "prompt": "These shoes are ___ small. I need a bigger size.",
      "options": [
        "too",
        "very much",
        "to"
      ],
      "answer": 0,
      "explanation": "Too = more than necessary."
    },
    {
      "prompt": "___ jacket over there is nice. (far, singular)",
      "options": [
        "This",
        "That",
        "These"
      ],
      "answer": 1,
      "explanation": "That = far, singular."
    },
    {
      "prompt": "I ___ need a new bag. I have three!",
      "options": [
        "don't",
        "doesn't",
        "am not"
      ],
      "answer": 0,
      "explanation": "Negative with I: don't + verb."
    },
    {
      "prompt": "The opposite of cheap is…",
      "options": [
        "expensive",
        "small",
        "long"
      ],
      "answer": 0,
      "explanation": "Cheap ≠ expensive."
    }
  ],
  "flashcards": [
    {
      "en": "Shirt",
      "pt": "Camisa"
    },
    {
      "en": "Shoes",
      "pt": "Sapatos"
    },
    {
      "en": "Dress",
      "pt": "Vestido"
    },
    {
      "en": "Size",
      "pt": "Tamanho"
    },
    {
      "en": "Cheap",
      "pt": "Barato(a)"
    },
    {
      "en": "Expensive",
      "pt": "Caro(a)"
    },
    {
      "en": "Jacket",
      "pt": "Jaqueta"
    },
    {
      "en": "Pants",
      "pt": "Calça"
    },
    {
      "en": "Sneakers",
      "pt": "Tênis"
    },
    {
      "en": "Skirt",
      "pt": "Saia"
    },
    {
      "en": "Small",
      "pt": "Pequeno(a)"
    },
    {
      "en": "Large",
      "pt": "Grande"
    }
  ],
  "fills": [
    {
      "sentence": "She ___ red dresses. (gosta)",
      "answers": [
        "likes"
      ],
      "hint": "like com she",
      "explanation": "Add -s with she: likes."
    },
    {
      "sentence": "I ___ like this jacket. (não)",
      "answers": [
        "don't",
        "do not"
      ],
      "hint": "negativa com I",
      "explanation": "I don't like…"
    },
    {
      "sentence": "___ she want a new bag?",
      "answers": [
        "does"
      ],
      "hint": "pergunta com she",
      "explanation": "Use does in questions with he / she."
    },
    {
      "sentence": "___ shoes over there are nice. (Aqueles)",
      "answers": [
        "those"
      ],
      "hint": "plural, longe",
      "explanation": "Those = aqueles (far, plural)."
    },
    {
      "sentence": "How much ___ these jeans?",
      "answers": [
        "are"
      ],
      "hint": "jeans é plural",
      "explanation": "Jeans is plural: how much are…"
    },
    {
      "sentence": "This shirt is too small. I need a ___ size. (maior)",
      "answers": [
        "larger",
        "bigger"
      ],
      "hint": "comparativo de large / big",
      "explanation": "Larger / bigger = maior."
    }
  ],
  "examExtra": [
    {
      "prompt": "___ you like this jacket?",
      "options": [
        "Does",
        "Do",
        "Are"
      ],
      "answer": 1,
      "explanation": "Use do with you."
    },
    {
      "prompt": "He ___ like red.",
      "options": [
        "don't",
        "doesn't",
        "isn't"
      ],
      "answer": 1,
      "explanation": "Use doesn't with he."
    },
    {
      "prompt": "Choose the correct order.",
      "options": [
        "a shirt blue",
        "a blue shirt",
        "blue a shirt"
      ],
      "answer": 1,
      "explanation": "Adjectives come before nouns."
    }
  ],
  "dialogue": {
    "text": "I like this blue shirt. Do you have a larger size? Yes, we do. How much is it?",
    "speakers": "AABA"
  },
  "readingPractice": {
    "title": "Summer sale at StyleBox",
    "text": "SUMMER SALE AT STYLEBOX!\n\n• Cotton T-shirts — only $12. Sizes S, M and L. Colors: white, blue and green.\n• Black jeans — $35 (were $50). Sizes 36 to 44.\n• Leather shoes — $60. Comfortable and elegant.\n\nDo you need a new jacket? All jackets are 30% off this weekend! Free delivery on orders over $40.",
    "questions": [
      {
        "prompt": "How much are the T-shirts?",
        "options": [
          "$12",
          "$35",
          "$60"
        ],
        "answer": 0,
        "explanation": "Cotton T-shirts — only $12."
      },
      {
        "prompt": "What colors are the T-shirts?",
        "options": [
          "Black and white",
          "White, blue and green",
          "Red and blue"
        ],
        "answer": 1,
        "explanation": "Colors: white, blue and green."
      },
      {
        "prompt": "When are the jackets 30% off?",
        "options": [
          "This weekend",
          "Every day",
          "On Monday"
        ],
        "answer": 0,
        "explanation": "“All jackets are 30% off this weekend!”"
      }
    ]
  },
  "writingPractice": {
    "model": "I like comfortable clothes. I have three pairs of jeans and a lot of T-shirts. My favorite color is blue. I want a new black jacket, but it's expensive. I need new sneakers, because my old sneakers are too small. I don't like dresses.",
    "phrases": [
      "I like / don't like …",
      "I want a new …",
      "I need …",
      "These … are too …"
    ],
    "checks": [
      {
        "label": "Use like / want / need / have",
        "pattern": "\\b(like|likes|want|wants|need|needs|have|has)\\b"
      },
      {
        "label": "Write a negative (don't / doesn't)",
        "pattern": "don't|doesn't|do not|does not"
      },
      {
        "label": "Mention a color",
        "pattern": "\\b(black|white|blue|red|green|yellow|pink|gray|grey|brown|purple|orange)\\b"
      }
    ]
  }
};

export default unit;
