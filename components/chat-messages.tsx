import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, ExternalLink, User, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface ChatMessagesProps {
  messages: Message[]
}

function sanitizeUrl(url: string): string {
  let cleanUrl = url.trim()
  
  try {
    const urlObj = new URL(cleanUrl)
    
    // Remove repeating path segments
    const pathSegments = urlObj.pathname.split('/').filter(Boolean)
    const uniqueSegments = Array.from(new Set(pathSegments))
    urlObj.pathname = '/' + uniqueSegments.join('/')
    
    // Remove repeating query parameters
    const uniqueParams = new URLSearchParams()
    for (const [key, value] of urlObj.searchParams.entries()) {
      if (!uniqueParams.has(key)) {
        uniqueParams.append(key, value)
      }
    }
    urlObj.search = uniqueParams.toString()
    
    return urlObj.toString()
  } catch (e) {
    console.error('Error sanitizing URL:', e)
    return cleanUrl
  }
}

function getLinkText(url: string): string {
  try {
    const cleanUrl = new URL(url)
    
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
    
    // For other URLs, display a simplified version
    return `${cleanUrl.hostname}${cleanUrl.pathname.length > 1 ? cleanUrl.pathname : ''}`
  } catch (e) {
    console.error('Error getting link text:', e)
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
      className="text-blue-400 hover:underline inline-flex items-center gap-1"
    >
      {linkText}
      <ExternalLink className="w-4 h-4" />
    </a>
  )
}

function MessageContent({ content }: { content: string }) {
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
  const [showScrollDown, setShowScrollDown] = useState(false)

  useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (scrollArea) {
      const isScrolledToBottom = scrollArea.scrollHeight - scrollArea.scrollTop === scrollArea.clientHeight
      setShowScrollDown(!isScrolledToBottom)
      
      if (isScrolledToBottom) {
        scrollArea.scrollTop = scrollArea.scrollHeight
      }
    }
  }, [messages])

  const handleScroll = () => {
    const scrollArea = scrollAreaRef.current
    if (scrollArea) {
      const isScrolledToBottom = scrollArea.scrollHeight - scrollArea.scrollTop === scrollArea.clientHeight
      setShowScrollDown(!isScrolledToBottom)
    }
  }

  const scrollToBottom = () => {
    const scrollArea = scrollAreaRef.current
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }

  return (
    <div className="relative flex-1 glass-effect">
      <ScrollArea className="h-full p-4" ref={scrollAreaRef} onScroll={handleScroll}>
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === 'assistant' ? 'bg-white/5' : 'bg-white/10'} p-4 rounded-lg`}>
              {message.role === 'assistant' ? (
                <Avatar>
                  <AvatarFallback>AI</AvatarFallback>
                  <AvatarImage>
                    <Bot className="w-6 h-6 text-blue-400" />
                  </AvatarImage>
                </Avatar>
              ) : (
                <Avatar>
                  <AvatarFallback>U</AvatarFallback>
                  <AvatarImage>
                    <User className="w-6 h-6 text-green-400" />
                  </AvatarImage>
                </Avatar>
              )}
              <div className="flex-1 space-y-2">
                <div className="font-medium text-white/90">{message.role === 'assistant' ? 'Kush.ai' : 'You'}</div>
                <div className="text-sm text-white/80">
                  <MessageContent content={message.content} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      {showScrollDown && (
        <Button
          className="absolute bottom-4 right-4 rounded-full bg-white/10 hover:bg-white/20"
          size="icon"
          onClick={scrollToBottom}
        >
          <ChevronDown className="h-4 w-4 text-white" />
          <span className="sr-only">Scroll to bottom</span>
        </Button>
      )}
    </div>
  )
}

