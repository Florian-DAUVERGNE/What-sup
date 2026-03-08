export type Status = "online" | "offline" | "typing";

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread?: number;
  status?: Status;
}

export interface Message {
  id: string;
  content: string;
  sender: "me" | "other";
  time: string;
}

export interface ChatHeaderProps {
  name: string;
  avatar?: string;
  status?: Status;
}
