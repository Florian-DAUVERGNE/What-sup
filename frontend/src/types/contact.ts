import type { Status } from "./status"

export interface Contact {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  time: string
  unread?: number
  status?: Status
}
