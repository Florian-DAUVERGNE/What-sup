import { useState } from "react";
import {
  Send
} from "lucide-react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Sidebar }  from "@/components/contact-sidebar";
import type { Contact, Message } from "@/types";

const contacts: Contact[] = [
  {
    id: "1",
    name: "Marie Dupont",
    lastMessage: "D'accord, a demain !",
    time: "10:30",
    unread: 2,
    status: "online",
  },
  {
    id: "2",
    name: "Jean Martin",
    lastMessage: "Super, merci pour l'info",
    time: "09:15",
    status: "online",
  },
  {
    id: "3",
    name: "Sophie Bernard",
    lastMessage: "On se retrouve ou ?",
    time: "Hier",
    status: "offline",
  },
  {
    id: "4",
    name: "Pierre Dubois",
    lastMessage: "J'ai envoye le document",
    time: "Hier",
    status: "typing",
  },
  {
    id: "5",
    name: "Emma Leroy",
    lastMessage: "Parfait !",
    time: "Lun",
    status: "offline",
  },
];

const messages: Message[] = [
  {
    id: "1",
    content: "Salut ! Comment ca va ?",
    sender: "other",
    time: "10:00",
  },
  { id: "2", content: "Ca va bien et toi ?", sender: "me", time: "10:02" },
  {
    id: "3",
    content: "Super ! Tu es dispo demain pour le projet ?",
    sender: "other",
    time: "10:05",
  },
  {
    id: "4",
    content: "Oui, je suis libre a partir de 14h",
    sender: "me",
    time: "10:10",
  },
  {
    id: "5",
    content: "Parfait, on se retrouve au bureau alors",
    sender: "other",
    time: "10:15",
  },
  { id: "6", content: "D'accord, a demain !", sender: "other", time: "10:30" },
];

export function ChatLayout() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messageInput, setMessageInput] = useState("");

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
            {/* Chat Header - Contact Info */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="size-10">
                    <AvatarImage src={selectedContact.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedContact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background ${
                          selectedContact.status === "online"
                            ? "bg-green-500"
                            : selectedContact.status === "typing"
                              ? "bg-blue-500 animate-pulse"
                              : "bg-gray-400"
                        }`} />
 
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">
                    {selectedContact.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedContact.status === "online"
                      ? "En ligne"
                      : selectedContact.status === "typing"
                        ? "Écrit..."
                        : "Hors-ligne"}
                  </p>
                </div>
              </div>

            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-6">
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

            {/* Message Input */}
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
                      setMessageInput("");
                    }
                  }}
                />
                <Button size="icon" className="shrink-0">
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
