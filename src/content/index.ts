// The 10 units of the course, in order. To add a unit, create unit-11.ts and add it here.
import type { Unit } from "./types";
import unit01 from "./units/unit-01";
import unit02 from "./units/unit-02";
import unit03 from "./units/unit-03";
import unit04 from "./units/unit-04";
import unit05 from "./units/unit-05";
import unit06 from "./units/unit-06";
import unit07 from "./units/unit-07";
import unit08 from "./units/unit-08";
import unit09 from "./units/unit-09";
import unit10 from "./units/unit-10";

export const UNITS: readonly Unit[] = [unit01, unit02, unit03, unit04, unit05, unit06, unit07, unit08, unit09, unit10];

export type { Unit, Question, Flashcard, FillItem, GrammarLesson } from "./types";
