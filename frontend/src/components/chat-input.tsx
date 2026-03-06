"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useChatStore } from "@/store/chat-store"
import { v4 as uuid } from "uuid"

export default function ChatInput() {
  const [text, setText] = useState("")
  const addMessage = useChatStore(s => s.addMessage)

  const send = () => {
    if (!text.trim()) return

    addMessage({
      id: uuid(),
      content: text,
      sender: "me",
      createdAt: new Date()
    })

    setText("")
  }

  return (
    <div className="flex gap-2 p-4 border-t">
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Message..."
        onKeyDown={e => e.key === "Enter" && send()}
      />
      <Button onClick={send} variant={"outline"}>Send</Button>
    </div>
  )
}