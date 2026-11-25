// Unidade 2 — Personal Information. Conteúdo pedagógico original da versão 1 (não alterar a ordem das
// questões, frases e flashcards: o progresso salvo dos alunos usa a posição de cada item).
import type { Unit } from "../types";

const unit: Unit = {
  "title": "Personal Information",
  "page": 18,
  "goals": [
    "Describe relationships",
    "Ask for contact information",
    "Find out where people are from",
    "Meet new people"
  ],
  "vocab": [
    "First and last names",
    "Titles",
    "Contact information",
    "Relationships",
    "Numbers 0–20",
    "Countries and nationalities",
    "More titles"
  ],
  "grammar": [
    "Possessive adjectives",
    "Possessive nouns",
    "Be: information questions with What",
    "Be from / Questions with Where"
  ],
  "conversation": [
    "Describe relationships when you introduce people",
    "Repeat a question to clarify",
    "Confirm information with “That’s right”"
  ],
  "listening": [
    "Identify personal information",
    "Complete contact details"
  ],
  "reading": [
    "Personal information forms",
    "A contact page from an online directory"
  ],
  "writing": "Write about yourself and answer personal questions.",
  "examples": [
    "This is my friend, Paulo. His last name is Silva.",
    "What's your phone number? It's 555-0193.",
    "Where are you from? I'm from Brazil. I'm Brazilian.",
    "Is that Ana's email address? That's right."
  ],
  "lessons": [
    {
      "title": "Possessive adjectives",
      "explain": "Possessive adjectives show who something belongs to. They come before a noun and never change for plural.",
      "head": [
        "Subject",
        "Possessive",
        "Example"
      ],
      "rows": [
        [
          "I",
          "my",
          "My name is Lucas."
        ],
        [
          "You",
          "your",
          "What's your last name?"
        ],
        [
          "He",
          "his",
          "His sister is a nurse."
        ],
        [
          "She",
          "her",
          "Her phone number is 555-0193."
        ],
        [
          "It",
          "its",
          "The company and its address."
        ],
        [
          "We",
          "our",
          "Our teacher is from Canada."
        ],
        [
          "They",
          "their",
          "Their son is eight."
        ]
      ],
      "tip": "His = dele and her = dela. The possessive matches the owner, not the thing: “Paulo and his sister”."
    },
    {
      "title": "Possessive nouns ('s)",
      "explain": "Add 's to a name or noun to show possession. For plural nouns that end in -s, add only an apostrophe.",
      "head": [
        "Form",
        "Example"
      ],
      "rows": [
        [
          "Name + 's",
          "Ana's email address · Carlos's car"
        ],
        [
          "Singular noun + 's",
          "my brother's wife · the teacher's book"
        ],
        [
          "Plural noun + '",
          "my parents' house · the students' class"
        ]
      ],
      "tip": "Portuguese: “o carro da Ana”. English: “Ana's car” — the owner comes first."
    },
    {
      "title": "Information questions: What and Where … from?",
      "explain": "Use What to ask for information and Where … from? to ask about someone's country or city.",
      "head": [
        "Question",
        "Answer"
      ],
      "rows": [
        [
          "What's your name?",
          "My name's Júlia."
        ],
        [
          "What's your phone number?",
          "It's 555-0182."
        ],
        [
          "What's her email address?",
          "It's lara@mail.com."
        ],
        [
          "Where are you from?",
          "I'm from Brazil. I'm Brazilian."
        ],
        [
          "Where is he from?",
          "He's from Japan. He's Japanese."
        ]
      ],
      "tip": "Countries and nationalities always start with a capital letter: “I'm Brazilian”, not “I'm brazilian”."
    }
  ],
  "questions": [
    {
      "prompt": "Complete: ___ name is Lucas.",
      "options": [
        "My",
        "I",
        "Me"
      ],
      "answer": 0,
      "explanation": "My is a possessive adjective."
    },
    {
      "prompt": "Where ___ you from?",
      "options": [
        "is",
        "are",
        "am"
      ],
      "answer": 1,
      "explanation": "Use are with you."
    },
    {
      "prompt": "Which is a nationality?",
      "options": [
        "Brazil",
        "Brazilian",
        "Brasilia"
      ],
      "answer": 1,
      "explanation": "Brazilian is the nationality."
    },
    {
      "prompt": "This is Pedro. ___ last name is Lima.",
      "options": [
        "Her",
        "His",
        "Your"
      ],
      "answer": 1,
      "explanation": "Use his for a man."
    },
    {
      "prompt": "We are from Mexico. We are ___.",
      "options": [
        "Mexico",
        "Mexican",
        "Mexicans"
      ],
      "answer": 1,
      "explanation": "The nationality is Mexican (adjectives don't take -s)."
    },
    {
      "prompt": "___ is your email address?",
      "options": [
        "Where",
        "What",
        "Who"
      ],
      "answer": 1,
      "explanation": "Use what to ask for information."
    },
    {
      "prompt": "That's ___ car. (the car of Maria)",
      "options": [
        "Maria",
        "Maria's",
        "Marias'"
      ],
      "answer": 1,
      "explanation": "Use 's to show possession."
    },
    {
      "prompt": "Choose the number 13.",
      "options": [
        "Thirty",
        "Thirteen",
        "Three"
      ],
      "answer": 1,
      "explanation": "13 = thirteen; 30 = thirty."
    }
  ],
  "flashcards": [
    {
      "en": "First name",
      "pt": "Primeiro nome"
    },
    {
      "en": "Last name",
      "pt": "Sobrenome"
    },
    {
      "en": "Nationality",
      "pt": "Nacionalidade"
    },
    {
      "en": "Address",
      "pt": "Endereço"
    },
    {
      "en": "Phone number",
      "pt": "Telefone"
    },
    {
      "en": "Married",
      "pt": "Casado(a)"
    },
    {
      "en": "Husband",
      "pt": "Marido"
    },
    {
      "en": "Wife",
      "pt": "Esposa"
    },
    {
      "en": "Friend",
      "pt": "Amigo(a)"
    },
    {
      "en": "Email address",
      "pt": "Endereço de e-mail"
    },
    {
      "en": "Single",
      "pt": "Solteiro(a)"
    },
    {
      "en": "Country",
      "pt": "País"
    }
  ],
  "fills": [
    {
      "sentence": "What is ___ name? (seu)",
      "answers": [
        "your"
      ],
      "hint": "possessivo de you",
      "explanation": "Your = seu / sua."
    },
    {
      "sentence": "___ name is Carla. (Meu)",
      "answers": [
        "my"
      ],
      "hint": "possessivo de I",
      "explanation": "My = meu / minha."
    },
    {
      "sentence": "I am ___ Brazil.",
      "answers": [
        "from"
      ],
      "hint": "de onde você é",
      "explanation": "Be from + country."
    },
    {
      "sentence": "Where ___ he from?",
      "answers": [
        "is"
      ],
      "hint": "verbo to be com he",
      "explanation": "Where is he from?"
    },
    {
      "sentence": "Silva is my ___ name. (sobrenome)",
      "answers": [
        "last",
        "family"
      ],
      "hint": "sobrenome = ___ name",
      "explanation": "Last name = sobrenome."
    },
    {
      "sentence": "She is ___ sister. (dele)",
      "answers": [
        "his"
      ],
      "hint": "possessivo de he",
      "explanation": "His = dele."
    }
  ],
  "examExtra": [
    {
      "prompt": "This is ___ car.",
      "options": [
        "Ana",
        "Ana's",
        "Anas"
      ],
      "answer": 1,
      "explanation": "Use 's to show possession."
    },
    {
      "prompt": "What ___ your phone number?",
      "options": [
        "is",
        "are",
        "am"
      ],
      "answer": 0,
      "explanation": "Use is with a singular noun."
    },
    {
      "prompt": "Choose the number 15.",
      "options": [
        "Fifty",
        "Fifteen",
        "Five"
      ],
      "answer": 1,
      "explanation": "15 = fifteen."
    }
  ],
  "dialogue": {
    "text": "What is your name? My name is Peter. Where are you from? I am from Brazil. What is your phone number?",
    "speakers": "ABABA"
  },
  "readingPractice": {
    "title": "New student form",
    "text": "NEW STUDENT FORM — First name: Sofia · Last name: Martins · Title: Ms. · Nationality: Portuguese · Phone: 555-0147 · Email: sofia.m@mail.com\n\nHi! I'm Sofia. I'm from Lisbon, Portugal, but I live in London now. My husband's name is David. He's from Canada. Our son, Leo, is eight. His best friend is from Brazil!",
    "questions": [
      {
        "prompt": "What is Sofia's last name?",
        "options": [
          "Martins",
          "Portuguese",
          "Ms."
        ],
        "answer": 0,
        "explanation": "Last name: Martins."
      },
      {
        "prompt": "Where is David from?",
        "options": [
          "Portugal",
          "Canada",
          "Brazil"
        ],
        "answer": 1,
        "explanation": "“He's from Canada.”"
      },
      {
        "prompt": "Who is Leo?",
        "options": [
          "Sofia's husband",
          "Sofia and David's son",
          "Sofia's friend"
        ],
        "answer": 1,
        "explanation": "“Our son, Leo, is eight.”"
      }
    ]
  },
  "writingPractice": {
    "model": "My name is Júlia Santos. My first name is Júlia and my last name is Santos. I'm from Recife, Brazil. I'm Brazilian. My phone number is 555-0182. My best friend is Lara. Her email address is lara@mail.com.",
    "phrases": [
      "My first / last name is …",
      "I'm from … I'm …",
      "My phone number is …",
      "His / Her name is …"
    ],
    "checks": [
      {
        "label": "Use possessive adjectives (my, your, his, her…)",
        "pattern": "\\b(my|your|his|her|our|their)\\b"
      },
      {
        "label": "Say where you are from",
        "pattern": "\\bfrom\\b"
      },
      {
        "label": "Include a nationality",
        "pattern": "\\b(brazilian|american|canadian|mexican|japanese|portuguese|chinese|italian|spanish|french|german|english|british|argentinian|korean)\\b"
      }
    ]
  }
};

export default unit;
