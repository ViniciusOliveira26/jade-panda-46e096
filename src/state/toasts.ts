// Small notifications shown at the bottom right ("Progresso atualizado", etc.).
import { useSyncExternalStore } from "react";

export interface Toast {
  id: number;
  text: string;
  hiding: boolean;
}

let toasts: Toast[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const set = (t: Toast[]) => {
  toasts = t;
  emit();
};

export function toast(text: string) {
  const id = nextId++;
  set([...toasts, { id, text, hiding: false }]);
  setTimeout(() => set(toasts.map((t) => (t.id === id ? { ...t, hiding: true } : t))), 2800);
  setTimeout(() => set(toasts.filter((t) => t.id !== id)), 3300);
}

export function useToasts(): Toast[] {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => toasts,
    () => toasts
  );
}
