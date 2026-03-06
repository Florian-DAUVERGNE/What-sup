import { create } from "zustand"

export type Message = {
  id: string
  content: string
  sender: "me" | "other"
  createdAt: Date
}

type ChatState = {
  messages: Message[]
  addMessage: (msg: Message) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg]
    }))
}))