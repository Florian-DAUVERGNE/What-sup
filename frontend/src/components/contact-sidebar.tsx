"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

type Contact = {
  id: string
  name: string
  avatar?: string
  status?: "online" | "offline" | "typing"
}

type Props = {
  contacts: Contact[]
  onSelect?: (contact: Contact) => void
}

export default function ContactSidebar({ contacts, onSelect }: Props) {
  return (
    <div className="w-72 shrink-0 h-screen border-r flex flex-col">
      {/* Contact List */}
      <ScrollArea className="flex-1">

        <div className="p-2 space-y-1">

          {contacts.map(contact => (
            <button
              key={contact.id}
              onClick={() => onSelect?.(contact)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>
                  {contact.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">
                  {contact.name}
                </span>

                <span className="text-xs text-muted-foreground flex items-center gap-1 capitalize">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      contact.status === "online"
                        ? "bg-green-500"
                        : contact.status === "typing"
                        ? "bg-blue-500 animate-pulse"
                        : "bg-gray-400"
                    }`}
                  />
                  {contact.status ?? "offline"}
                </span>
              </div>
            </button>
          ))}

        </div>

      </ScrollArea>
    </div>
  )
}