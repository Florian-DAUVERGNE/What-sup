export function statusToColor(status: string) {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "typing":
      return "bg-blue-500 animate-pulse";
    default:
      return "bg-gray-400";
  }
}

export function statusToText(status: string) {
  switch (status) {
    case "online":
      return "En ligne";
    case "typing":
      return "Écrit...";
    default:
      return "Hors-ligne";
  }
}