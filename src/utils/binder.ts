// utils/binder.ts
import type { CardProps } from "../types/CardProps";

export type BinderCard = CardProps; // ⬅️ store the full card

const KEY = "ygo:binder";
const EVT = "binder:changed";

function safeParse<T>(json: string | null, fallback: T): T {
  try { return json ? (JSON.parse(json) as T) : fallback; } catch { return fallback; }
}

export function getBinder(): BinderCard[] {
  if (typeof window === "undefined") return [];
  return safeParse<BinderCard[]>(localStorage.getItem(KEY), []);
}

function setBinder(cards: BinderCard[]) {
  localStorage.setItem(KEY, JSON.stringify(cards));
  window.dispatchEvent(new Event(EVT));
}

export function addToBinder(card: BinderCard): { added: boolean; reason?: string } {
  const cards = getBinder();
  if (cards.some((c) => c.id === card.id)) return { added: false, reason: "Already in binder" };
  setBinder([...cards, card]);
  return { added: true };
}

export function removeFromBinder(id: number) {
  setBinder(getBinder().filter((c) => c.id !== id));
}

export function clearBinder() { setBinder([]); }

export function subscribeBinder(callback: () => void) {
  const handler = () => callback();
  window.addEventListener(EVT, handler);
  window.addEventListener("storage", (e) => { if (e.key === KEY) handler(); });
  return () => { window.removeEventListener(EVT, handler); };
}
