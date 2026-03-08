import { create } from "zustand"
import type { Contact, Message } from "@/types"
import { contacts as mockContacts } from "@/mocks/contacts"
import { messages as mockMessages } from "@/mocks/messages"

type ChatState = {
  contacts: Contact[]
  messages: Message[]
  selectedContact: Contact | null
  addMessage: (msg: Message) => void
  setSelectedContact: (contact: Contact) => void
}

export const useChatStore = create<ChatState>((set) => ({
  contacts: mockContacts,
  messages: mockMessages,
  selectedContact: mockContacts[0] ?? null,
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg]
    })),
  setSelectedContact: (contact) =>
    set(() => ({
      selectedContact: contact
    }))
}))
