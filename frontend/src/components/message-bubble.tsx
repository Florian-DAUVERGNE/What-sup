import { Card } from "@/components/ui/card"
import type { Message } from "@/store/chat-store"

export default function MessageBubble({ message }: { message: Message }) {
  return (
    <div className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
      <Card className="p-3 max-w-[70%]">
        <p className="text-sm">{message.content}</p>
      </Card>
    </div>
  )
}