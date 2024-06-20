import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const UserCard = () => {
  return (
    <div className="flex h-10 items-center justify-center gap-2 rounded-lg border px-4">
      <Avatar className="size-5">
        <AvatarFallback>CN</AvatarFallback>
        <AvatarImage src="/avatar.png" sizes="20" />
      </Avatar>
      <p className="hidden text-white md:block">Alicia Koch</p>
    </div>
  )
}
