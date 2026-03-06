"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Phone, Search, Settings } from "lucide-react"

type ChatHeaderProps = {
  name: string
  avatar?: string
  status?: "online" | "offline" | "typing"
}

export default function ChatHeader({
  name,
  avatar,
  status = "offline"
}: ChatHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between p-4">

        {/* Left */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} />
            <AvatarFallback>
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-sm font-semibold">{name}</span>

            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <span
                className={`h-2 w-2 rounded-full ${
                  status === "online"
                    ? "bg-green-500"
                    : status === "typing"
                    ? "bg-blue-500 animate-pulse"
                    : "bg-gray-400"
                }`}
              />
              {status}
            </span>
          </div>
        </div>
      </div>

      <Separator />
    </>
  )
}