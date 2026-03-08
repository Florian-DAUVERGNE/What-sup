import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import type { Contact } from "@/types";

function ContactSidebar({ contacts, onSelect }: { contacts: Contact[]; onSelect: (contact: Contact) => void }) {
  return (
    <>
      {/* Contact List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => onSelect(contact)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>
                  {contact.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{contact.name}</span>

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
      </>
  );
}

function HeaderSidebar() {
  return (
    <div className="flex items-center justify-between border-b border-border p-4">
      <h1 className="text-xl font-semibold text-foreground">Contacts</h1>
    </div>
  );
}

export function Sidebar({ contacts, onSelect }: { contacts: Contact[]; onSelect: (contact: Contact) => void }) {
  return (
    <div className="flex h-full flex-col border-r border-border">
      <HeaderSidebar />
      <ContactSidebar contacts={contacts} onSelect={onSelect} />
    </div>
  );
}