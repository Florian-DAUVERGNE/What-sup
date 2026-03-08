"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { statusToColor, statusToText } from "@/lib/statusFunctions";
import type { Contact, Message } from "@/types";
import ChatInput from "./chat-input";


function ChatWindowTitle({ selectedContact }: { selectedContact: Contact }) {
  return (
    <div className="flex items-center justify-between border-b border-border px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="size-10">
            <AvatarImage src={selectedContact.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {selectedContact.username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span
            className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background ${statusToColor(
              selectedContact.status ?? "offline",
            )}`}
          />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">
            {selectedContact.username}
          </h2>
          <p className="text-sm text-muted-foreground">
            {statusToText(selectedContact.status ?? "offline")}
          </p>
        </div>
      </div>
    </div>
  );
}

function MessageArea({ messages }: { messages: Message[] }) {
  return (
    <ScrollArea className="flex-1 p-6 h-75">
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === "me" ? "justify-end" : "justify-start",
            )}>
            <div
              className={cn(
                "max-w-[70%] rounded-2xl px-4 py-2",
                message.sender === "me"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground",
              )}>
              <p>{message.content}</p>
              <p
                className={cn(
                  "mt-1 text-xs",
                  message.sender === "me"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground",
                )}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}



export default function ChatWindow({
  selectedContact,
  messages,
  messageInput,
  setMessageInput,
}: {
  selectedContact: Contact;
  messages: Message[];
  messageInput: string;
  setMessageInput: (value: string) => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <ChatWindowTitle selectedContact={selectedContact} />
      <MessageArea messages={messages} />
      <ChatInput
        messageInput={messageInput}
        setMessageInput={setMessageInput}
      />
    </div>
  );
}