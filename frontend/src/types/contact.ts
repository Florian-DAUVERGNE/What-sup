import type { Status } from "./status"

export interface Contact {
  id: string
  username: string
  avatar?: string
  lastMessage: string
  time: string
  unread?: number
  status?: Status
}
