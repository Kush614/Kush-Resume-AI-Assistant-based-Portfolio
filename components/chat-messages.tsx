import { useEffect, useRef } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, ExternalLink, User } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface ChatMessagesProps {
  messages: Message[]
}

function sanitizeUrl(url: string): string {
  let cleanUrl = url.replace(/\[(.*?)\]$$(.*?)$$/, '$2').replace(/[[\]()]/g, '').trim()
  const urlPattern = /(https?:\/\/[^\/]+)(.*)/
  const matches = cleanUrl.match(urlPattern)
  if (matches) {
    const domain = matches[1]
    let path = matches[2]
    path = path.replace(new RegExp(domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '')
    const segments = path.split('/').filter(Boolean)
    const uniqueSegments = segments.filter((segment, index, self) =>
      index === self.findIndex((t) => t === segment)
    )
    path = '/' + uniqueSegments.join('/')
    cleanUrl = domain + path
  }
  return cleanUrl
}

function LinkWithoutPreview({ href }: { href: string }) {
  const cleanUrl = sanitizeUrl(href)
  let linkText = cleanUrl
  if (cleanUrl.includes('linkedin.com/posts')) {
    linkText = "LinkedIn Post: Solar Vehicle Challenge"
  } else if (cleanUrl.includes('drive.google.com')) {
    linkText = "Google Drive: Resume"
  } else if (cleanUrl.includes('github.com')) {
    linkText = `GitHub: ${cleanUrl.split('/').pop()}`
  } else if (cleanUrl.includes('netlify.app')) {
    linkText = `Live Demo: ${cleanUrl.split('//')[1].split('.')[0]}`
  }

  return (
    <a
      href={cleanUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline inline-flex items-center gap-1"
    >
      {linkText}
      <ExternalLink className="w-4 h-4" />
    </a>
  )
}

function MessageContent({ content }: { content: string }) {
  const urlRegex = /(?:\[.*?\]$$)?https?:\/\/[^\s)]+(?:$$)?/g
  const matches = Array.from(new Set(content.match(urlRegex) || []))
  let parts = [content]
  matches.forEach(match => {
    const newParts: string[] = []
    parts.forEach(part => {
      const splitPart = part.split(match)
      splitPart.forEach((subPart, index) => {
        if (index > 0) {
          newParts.push(match)
        }
        if (subPart) {
          newParts.push(subPart)
        }
      })
    })
    parts = newParts
  })

  return (
    <>
      {parts.map((part, index) => {
        if (matches.includes(part)) {
          return <LinkWithoutPreview key={`link-${index}`} href={part} />
        }
        return <span key={`text-${index}`}>{part}</span>
      })}
    </>
  )
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
      <div className="space-y-4 max-w-3xl mx-auto">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-3">
            {message.role === 'assistant' ? (
              <Avatar>
                <AvatarFallback>AI</AvatarFallback>
                <AvatarImage>
                  <Bot className="w-6 h-6" />
                </AvatarImage>
              </Avatar>
            ) : (
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
                <AvatarImage>
                  <User className="w-6 h-6" />
                </AvatarImage>
              </Avatar>
            )}
            <div className="flex-1 space-y-2">
              <div className="font-medium">{message.role === 'assistant' ? 'AI Assistant' : 'You'}</div>
              <div className="text-sm">
                <MessageContent content={message.content} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

