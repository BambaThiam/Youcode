import { cn } from "@/lib/utils"
import { Loader2, LucideProps } from "lucide-react"


const Loader = ( {className, ...props} : LucideProps) => {
  return (
    <Loader2 className={cn("animate-spin", className)} size={24} />
  )
}

export default Loader