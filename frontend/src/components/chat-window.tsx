"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useChatStore } from "@/store/chat-store"
import MessageBubble from "./message-bubble"

export default function ChatWindow() {
  const messages = useChatStore((s) => s.messages)

  return (
    <ScrollArea className="h-[500px] p-4 space-y-4">
      {messages.map(msg => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </ScrollArea>
  )
}