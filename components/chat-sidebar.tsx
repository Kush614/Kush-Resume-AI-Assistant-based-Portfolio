import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Bot, Grid2X2 } from 'lucide-react'
import { pinnedQuestions } from '@/lib/pinned-questions'

interface ChatSidebarProps {
  conversations: { id: string; title: string }[]
  onSelect: (id: string) => void
  selectedId?: string
  onQuestionClick: (question: string) => void
}

export function ChatSidebar({ conversations, onSelect, selectedId, onQuestionClick }: ChatSidebarProps) {
  return (
    <div className="flex flex-col w-[260px] h-screen bg-background border-r">
      <div className="p-3">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Bot className="w-4 h-4" />
          New Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 mb-2">
            <Grid2X2 className="w-4 h-4" />
            <span className="text-sm font-medium">Quick Questions</span>
          </div>
          <div className="space-y-1">
            {pinnedQuestions.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start text-left font-normal text-sm py-1 h-auto"
                onClick={() => onQuestionClick(item.question)}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="truncate">{item.question}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="px-3 py-2">
          <div className="flex items-center gap-2 mb-2">
            <Grid2X2 className="w-4 h-4" />
            <span className="text-sm font-medium">Chat History</span>
          </div>
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <Button
                key={conversation.id}
                variant="ghost"
                className={`w-full justify-start text-left font-normal text-sm py-1 h-auto ${
                  selectedId === conversation.id ? 'bg-accent' : ''
                }`}
                onClick={() => onSelect(conversation.id)}
              >
                <span className="truncate">{conversation.title}</span>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

