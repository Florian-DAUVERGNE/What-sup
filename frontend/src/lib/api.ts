import type { Contact } from "@/types"

const API_BASE_URL = "http://localhost:8000/api" // Adjust this to your backend URL

export async function fetchContacts(): Promise<Contact[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Failed to fetch contacts:", error)
    throw error
  }
}
