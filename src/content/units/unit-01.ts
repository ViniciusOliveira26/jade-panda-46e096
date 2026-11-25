// Unidade 1 — People and Occupations. Conteúdo pedagógico original da versão 1 (não alterar a ordem das
// questões, frases e flashcards: o progresso salvo dos alunos usa a posição de cada item).
import type { Unit } from "../types";

const unit: Unit = {
  "title": "People and Occupations",
  "page": 6,
  "goals": [
    "Introduce people",
    "Identify people",
    "Spell names",
    "Describe people"
  ],
  "vocab": [
    "Subject pronouns",
    "Occupations",
    "The alphabet",
    "More occupations"
  ],
  "grammar": [
    "Verb to be: singular and plural statements",
    "Contractions",
    "Yes / No questions and short answers",
    "Proper nouns and common nouns"
  ],
  "conversation": [
    "Use “too” to return a greeting",
    "Use “Excuse me” to introduce a question",
    "Use “Thanks” to show appreciation"
  ],
  "listening": [
    "Identify the correct occupation",
    "Recognize letters and names"
  ],
  "reading": [
    "A magazine article about famous people and their occupations",
    "Simple forms and business cards"
  ],
  "writing": "Write affirmative and negative statements about people.",
  "examples": [
    "I'm a student. She's a doctor.",
    "Are you a teacher? Yes, I am. / No, I'm not.",
    "They aren't engineers. They're nurses.",
    "How do you spell your name? M-A-R-I-A."
  ],
  "lessons": [
    {
      "title": "The verb be: am / is / are",
      "explain": "Use the verb be to say who people are and what they do. The form of be changes with the subject. In speaking, we usually use contractions.",
      "head": [
        "Subject",
        "Be",
        "Contraction",
        "Example"
      ],
      "rows": [
        [
          "I",
          "am",
          "I'm",
          "I'm a student."
        ],
        [
          "You",
          "are",
          "You're",
          "You're a teacher."
        ],
        [
          "He / She / It",
          "is",
          "He's / She's / It's",
          "She's a doctor."
        ],
        [
          "We",
          "are",
          "We're",
          "We're nurses."
        ],
        [
          "They",
          "are",
          "They're",
          "They're engineers."
        ]
      ],
      "tip": "Never drop the verb: say “She is a doctor”, not “She doctor”."
    },
    {
      "title": "Negatives, yes / no questions and short answers",
      "explain": "Add not after be to make a negative. To ask a question, put be before the subject. Answer with a short answer.",
      "head": [
        "Form",
        "Example"
      ],
      "rows": [
        [
          "Negative",
          "I'm not a teacher. · She isn't a nurse. · They aren't engineers."
        ],
        [
          "Question",
          "Are you a student? · Is he a doctor?"
        ],
        [
          "Short answer (yes)",
          "Yes, I am. · Yes, he is."
        ],
        [
          "Short answer (no)",
          "No, I'm not. · No, he isn't."
        ]
      ],
      "tip": "Don't contract affirmative short answers: “Yes, I am”, not “Yes, I'm”."
    },
    {
      "title": "A / an with occupations",
      "explain": "Use a before a consonant sound and an before a vowel sound. In English, a singular occupation always needs a or an.",
      "head": [
        "Article",
        "Example"
      ],
      "rows": [
        [
          "a",
          "a doctor · a teacher · a student · a nurse"
        ],
        [
          "an",
          "an engineer · an artist · an actor · an office assistant"
        ],
        [
          "no article (plural)",
          "They're doctors. · We're students."
        ]
      ],
      "tip": "In Portuguese we say “Ela é médica”, but in English you need the article: “She is a doctor.”"
    }
  ],
  "questions": [
    {
      "prompt": "Choose the correct sentence.",
      "options": [
        "She are a doctor.",
        "She is a doctor.",
        "She am a doctor."
      ],
      "answer": 1,
      "explanation": "Use is with she."
    },
    {
      "prompt": "What is the plural of teacher?",
      "options": [
        "Teachers",
        "Teacheres",
        "Teach"
      ],
      "answer": 0,
      "explanation": "Add -s to form the plural."
    },
    {
      "prompt": "Choose the correct pronoun for Maria.",
      "options": [
        "He",
        "They",
        "She"
      ],
      "answer": 2,
      "explanation": "Maria is referred to as she."
    },
    {
      "prompt": "___ you a nurse? — No, I'm not.",
      "options": [
        "Is",
        "Are",
        "Am"
      ],
      "answer": 1,
      "explanation": "Use are with you."
    },
    {
      "prompt": "He is ___ engineer.",
      "options": [
        "a",
        "an",
        "the"
      ],
      "answer": 1,
      "explanation": "Use an before a vowel sound: an engineer."
    },
    {
      "prompt": "Choose the negative sentence.",
      "options": [
        "They aren't teachers.",
        "They not teachers.",
        "They isn't teachers."
      ],
      "answer": 0,
      "explanation": "They + are not = they aren't."
    },
    {
      "prompt": "How do you spell “doctor”?",
      "options": [
        "D-O-C-T-O-R",
        "D-O-K-T-O-R",
        "D-O-C-T-E-R"
      ],
      "answer": 0,
      "explanation": "Doctor: D-O-C-T-O-R."
    },
    {
      "prompt": "Is she a student? — Yes, ___.",
      "options": [
        "she is",
        "she's",
        "she are"
      ],
      "answer": 0,
      "explanation": "Short answer: Yes, she is (no contraction)."
    }
  ],
  "flashcards": [
    {
      "en": "Doctor",
      "pt": "Médico(a)"
    },
    {
      "en": "Teacher",
      "pt": "Professor(a)"
    },
    {
      "en": "Nurse",
      "pt": "Enfermeiro(a)"
    },
    {
      "en": "Engineer",
      "pt": "Engenheiro(a)"
    },
    {
      "en": "Student",
      "pt": "Estudante"
    },
    {
      "en": "Police officer",
      "pt": "Policial"
    },
    {
      "en": "Artist",
      "pt": "Artista"
    },
    {
      "en": "Chef",
      "pt": "Chef de cozinha"
    },
    {
      "en": "Lawyer",
      "pt": "Advogado(a)"
    },
    {
      "en": "Actor",
      "pt": "Ator / Atriz"
    },
    {
      "en": "Manager",
      "pt": "Gerente"
    },
    {
      "en": "Receptionist",
      "pt": "Recepcionista"
    }
  ],
  "fills": [
    {
      "sentence": "I ___ a student.",
      "answers": [
        "am"
      ],
      "hint": "verbo to be com I",
      "explanation": "I am a student."
    },
    {
      "sentence": "She ___ a nurse.",
      "answers": [
        "is"
      ],
      "hint": "verbo to be com she",
      "explanation": "She is a nurse."
    },
    {
      "sentence": "We ___ engineers.",
      "answers": [
        "are"
      ],
      "hint": "verbo to be com we",
      "explanation": "We are engineers."
    },
    {
      "sentence": "He is ___ doctor.",
      "answers": [
        "a"
      ],
      "hint": "artigo antes de som de consoante",
      "explanation": "Use a before a consonant sound."
    },
    {
      "sentence": "She is ___ engineer.",
      "answers": [
        "an"
      ],
      "hint": "artigo antes de som de vogal",
      "explanation": "Use an before a vowel sound."
    },
    {
      "sentence": "___ are teachers. (Eles)",
      "answers": [
        "they"
      ],
      "hint": "pronome: eles / elas",
      "explanation": "They = eles / elas."
    }
  ],
  "examExtra": [
    {
      "prompt": "___ you a student?",
      "options": [
        "Is",
        "Are",
        "Am"
      ],
      "answer": 1,
      "explanation": "Use are with you."
    },
    {
      "prompt": "They ___ engineers.",
      "options": [
        "is",
        "am",
        "are"
      ],
      "answer": 2,
      "explanation": "Use are with they."
    },
    {
      "prompt": "Choose the contraction of \"I am\".",
      "options": [
        "I'm",
        "Im'",
        "I's"
      ],
      "answer": 0,
      "explanation": "I am = I'm."
    }
  ],
  "dialogue": {
    "text": "Hello! My name is Anna. I am a teacher. What do you do? I am a student. Nice to meet you!",
    "speakers": "AAAABB"
  },
  "readingPractice": {
    "title": "Meet the team",
    "text": "Hello! I'm Laura Costa, and this is my team at City Hospital. I'm a nurse. Daniel is a doctor. He's from São Paulo, and he's very friendly. Mei and Tom are students. They aren't doctors yet, but they're very good. Our receptionist is Mr. Brown. He's an artist, too! He paints on weekends. We're a great team.",
    "questions": [
      {
        "prompt": "What is Laura's job?",
        "options": [
          "She's a nurse.",
          "She's a doctor.",
          "She's a student."
        ],
        "answer": 0,
        "explanation": "“I'm a nurse.”"
      },
      {
        "prompt": "Are Mei and Tom doctors?",
        "options": [
          "Yes, they are.",
          "No, they aren't. They're students.",
          "No, they're receptionists."
        ],
        "answer": 1,
        "explanation": "“They aren't doctors yet.”"
      },
      {
        "prompt": "Who is an artist?",
        "options": [
          "Daniel",
          "Mr. Brown",
          "Laura"
        ],
        "answer": 1,
        "explanation": "“He's an artist, too!” — Mr. Brown."
      }
    ]
  },
  "writingPractice": {
    "model": "My name is Carlos. I'm a student. I'm not a teacher. My friend Ana is an engineer. She isn't a doctor. My parents are nurses. They're very busy!",
    "phrases": [
      "I'm a / an …",
      "I'm not a / an …",
      "He's / She's a / an …",
      "They aren't … They're …"
    ],
    "checks": [
      {
        "label": "Use the verb be (am / is / are)",
        "pattern": "\\b(am|is|are)\\b|'m\\b|'s\\b|'re\\b"
      },
      {
        "label": "Write a negative (not / isn't / aren't)",
        "pattern": "\\bnot\\b|n't\\b"
      },
      {
        "label": "Use a / an + occupation",
        "pattern": "\\b(a|an)\\s+[a-z]+"
      }
    ]
  }
};

export default unit;
