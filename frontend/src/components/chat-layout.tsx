import { useState, useEffect } from "react";

import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";

import { Sidebar } from "@/components/contact-sidebar";
import type { Contact } from "@/types";
import { useChatStore } from "@/store/chat-store";
import ChatWindow from "./chat-window";
import { fetchContacts } from "@/lib/api";

export function ChatLayout() {
  const contacts = useChatStore((state) => state.contacts)
  const messages = useChatStore((state) => state.messages)
  const selectedContact = useChatStore((state) => state.selectedContact)
  const setSelectedContact = useChatStore((state) => state.setSelectedContact)
  const setContacts = useChatStore((state) => state.setContacts)
  
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const fetchedContacts = await fetchContacts()
        console.log("Fetched contacts:", fetchedContacts.member)
        setContacts(fetchedContacts.member)
      } catch (error) {
        console.error("Failed to load contacts:", error)
        // Optionally, fall back to mocks or show error
      }
    }
    loadContacts()
  }, [setContacts])

  return (
    <div className="h-screen w-full bg-background">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Sidebar */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <Sidebar contacts={contacts} onSelect={setSelectedContact} />
        </ResizablePanel>

        {/* Main Chat Area */}
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full flex-col">
            {selectedContact && (
              <ChatWindow
                selectedContact={selectedContact}
                messages={messages}
                messageInput={messageInput}
                setMessageInput={setMessageInput}
              />
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
