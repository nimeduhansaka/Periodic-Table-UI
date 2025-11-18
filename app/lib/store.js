"use client";

// Simple client-side in-memory store with localStorage persistence for demo purposes.
// In production, replace with a real database and auth provider.
import { create } from "zustand";

export const useAuth = create((set) => ({
  user: null,
  login: (name) => set({ user: { name } }),
  logout: () => set({ user: null }),
}));

export const useNotes = create((set, get) => ({
  notes: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("elementNotes") || "{}")
    : {},
  addNote: (elementSymbol, text) => {
    const { user } = useAuth.getState();
    if (!user) return;
    const current = { ...get().notes };
    const list = current[elementSymbol] || [];
    const entry = { id: Date.now(), text, author: user.name, createdAt: new Date().toISOString() };
    current[elementSymbol] = [entry, ...list];
    set({ notes: current });
    if (typeof window !== "undefined") {
      localStorage.setItem("elementNotes", JSON.stringify(current));
    }
  },
}));
