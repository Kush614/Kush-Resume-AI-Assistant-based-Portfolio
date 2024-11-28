import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ScrollDownButtonProps {
  onClick: () => void
}

export function ScrollDownButton({ onClick }: ScrollDownButtonProps) {
  return (
    <Button
      className="absolute bottom-4 right-4 rounded-full shadow-lg"
      size="icon"
      onClick={onClick}
    >
      <ChevronDown className="h-4 w-4" />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  )
}

