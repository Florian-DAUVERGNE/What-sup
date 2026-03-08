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
import { contacts } from "@/mocks/contacts";
import { messages } from "@/mocks/messages";

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
