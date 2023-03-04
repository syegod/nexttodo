import { useAuth } from "@/context/AuthContext"

export default function Home() {
  const {currentUser} = useAuth()
  console.log(currentUser);
  return (
    <div className="min-h-full">
    </div>
  )
}