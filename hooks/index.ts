import { toast as toastSonner } from "sonner"

export const toast = (message: string, description?: string) => {
  return toastSonner(message, {
    description,
    duration: 3000,
  })
}
