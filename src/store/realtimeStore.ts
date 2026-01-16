import { create } from "zustand";

interface RealtimeMessage {
  id: string;
  type: string;
  payload: unknown;
  timestamp: string;
}

interface RealtimeState {
  messages: RealtimeMessage[];
  connectionStatus: "disconnected" | "connecting" | "connected";
  addMessage: (message: RealtimeMessage) => void;
  clearMessages: () => void;
  setConnectionStatus: (status: "disconnected" | "connecting" | "connected") => void;
}

export const useRealtimeStore = create<RealtimeState>((set) => ({
  messages: [],
  connectionStatus: "disconnected",
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message].slice(-100), // Keep last 100 messages
    })),
  clearMessages: () => set({ messages: [] }),
  setConnectionStatus: (status) => set({ connectionStatus: status }),
}));
