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
  // Remove any markdown formatting and clean the URL
  let cleanUrl = url.trim()
  
  // Remove any duplicate segments in the URL path
  const urlObj = new URL(cleanUrl)
  const pathSegments = urlObj.pathname.split('/').filter(Boolean)
  const uniqueSegments = Array.from(new Set(pathSegments))
  urlObj.pathname = '/' + uniqueSegments.join('/')
  
  return urlObj.toString()
}

function getLinkText(url: string): string {
  try {
    const cleanUrl = new URL(url)
    
    // Handle different types of links
    if (cleanUrl.hostname === 'www.linkedin.com' || cleanUrl.hostname === 'linkedin.com') {
      if (cleanUrl.pathname.includes('/posts/')) {
        return 'Solar Vehicle Challenge Details'
      }
      return 'LinkedIn Profile'
    }
    
    if (cleanUrl.hostname === 'github.com') {
      const repo = cleanUrl.pathname.split('/').pop()
      return repo ? `GitHub: ${repo}` : 'GitHub Profile'
    }
    
    if (cleanUrl.hostname === 'drive.google.com') {
      if (url.includes('1Jc287jVGXussEQ5MWnLds8H4O24i8sIl')) {
        return 'Full Resume'
      }
      return 'Project Details: Anantha App'
    }
    
    if (cleanUrl.hostname.includes('netlify.app')) {
      const projectName = cleanUrl.hostname.includes('kushiseringovertask') 
        ? 'Shoe Shopping Cart' 
        : 'Meme Generator'
      return `Live Demo: ${projectName}`
    }
    
    return cleanUrl.hostname
  } catch (e) {
    return url
  }
}

function LinkWithoutPreview({ href }: { href: string }) {
  const cleanUrl = sanitizeUrl(href)
  const linkText = getLinkText(cleanUrl)

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
  // Match URLs more precisely
  const urlRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
  const matches = content.match(urlRegex) || []

  if (matches.length === 0) {
    return <span>{content}</span>
  }

  const parts = content.split(urlRegex)

  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < matches.length && <LinkWithoutPreview href={matches[index]} />}
        </React.Fragment>
      ))}
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

