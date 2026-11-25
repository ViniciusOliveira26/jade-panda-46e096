// Difficulty of each unit inside the course (same order as UNITS). Kept apart from the unit files so
// the original pedagogical content stays untouched. Based on the grammar progression of the course:
// verb "be" and basic questions (1–3) → have/has, time prepositions and the simple present (4–7) →
// there is/are, present continuous and count / non-count nouns (8–10).
export type Difficulty = 1 | 2 | 3;

export const UNIT_DIFFICULTY: readonly Difficulty[] = [1, 1, 1, 2, 2, 2, 2, 3, 3, 3];

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  1: "Iniciante",
  2: "Básico",
  3: "Básico avançado",
};

export const unitDifficulty = (i: number): Difficulty => UNIT_DIFFICULTY[i] ?? 1;
