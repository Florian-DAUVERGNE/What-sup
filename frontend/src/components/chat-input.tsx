"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useChatStore } from "@/store/chat-store"
import { v4 as uuid } from "uuid"
import type { Message } from "@/types/message"
import { Send } from "lucide-react"

export default function ChatInput({
  messageInput,
  setMessageInput,
}: {
  messageInput: string;
  setMessageInput: (value: string) => void;
}) {
  const addMessage = useChatStore((state) => state.addMessage);

  const handleSend = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: uuid(),
      content: messageInput,
      sender: "me",
      time: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    addMessage(newMessage);
    setMessageInput("");
  };

  return (
    <div className="border-t border-border p-4">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Tapez votre message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button size="icon" className="shrink-0" onClick={handleSend}>
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}