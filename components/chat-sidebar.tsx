import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Grid2X2 } from 'lucide-react'
import { pinnedQuestions } from '@/lib/pinned-questions'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChatSidebarProps {
  conversations: { id: string; title: string }[]
  onSelect: (id: string) => void
  selectedId?: string
  onQuestionClick: (question: string) => void
}

export function ChatSidebar({ conversations, onSelect, selectedId, onQuestionClick }: ChatSidebarProps) {
  return (
    <div className="flex flex-col w-[300px] h-screen glass-effect border-r border-white/10">
      <div className="px-4 py-2">
        <div className="flex items-center gap-2 mb-2">
          <Grid2X2 className="w-4 h-4 text-white/70" />
          <span className="text-sm font-medium text-white/70">Quick Questions</span>
        </div>
        <div className="space-y-1">
          <TooltipProvider>
            {pinnedQuestions.map((item) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left font-normal text-white/90 hover:bg-white/10"
                    onClick={() => onQuestionClick(item.question)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span className="truncate">{item.question}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.question}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 py-2">
          {conversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant="ghost"
              className={`w-full justify-start text-left font-normal text-white/90 hover:bg-white/10 ${
                selectedId === conversation.id ? 'bg-white/20' : ''
              }`}
              onClick={() => onSelect(conversation.id)}
            >
              <span className="truncate">{conversation.title}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

