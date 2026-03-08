import { create } from "zustand"
import type { Contact, Message } from "@/types"
import { messages as mockMessages } from "@/mocks/messages"

type ChatState = {
  contacts: Contact[]
  messages: Message[]
  selectedContact: Contact | null
  addMessage: (msg: Message) => void
  setSelectedContact: (contact: Contact) => void
  setContacts: (contacts: Contact[]) => void
}

export const useChatStore = create<ChatState>((set) => ({
  contacts: [],
  messages: mockMessages,
  selectedContact: null,
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg]
    })),
  setSelectedContact: (contact) =>
    set(() => ({
      selectedContact: contact
    })),
  setContacts: (contacts) =>
    set(() => ({
      contacts,
      selectedContact: contacts[0] ?? null
    }))
}))
