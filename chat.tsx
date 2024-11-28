'use client'

import { useState } from 'react'
import { Bot, Send, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample resume data based on the provided resume
const resumeData = {
  name: "Kush Ise",
  education: [
    {
      school: "University of California Riverside",
      degree: "Master of Science in Computer Science",
      date: "Sep. 2024 – Dec 2025"
    },
    {
      school: "Pimpri Chinchwad College of Engineering",
      degree: "Bachelor of Engineering in Computer Engineering",
      date: "Aug. 2019 – Jul 2023"
    }
  ],
  experience: [
    {
      title: "Software Development Engineer",
      company: "Jio Platforms Limited",
      location: "Mumbai, India",
      date: "Dec 2023 – Jul 2024",
      highlights: [
        "Developed and optimized UI components in React",
        "Integrated Jio Pay API for secure payment processing",
        "Led development of a comprehensive product portal"
      ]
    }
  ],
  skills: {
    languages: ["Java", "Python", "C/C++", "SQL", "JavaScript", "HTML/CSS"],
    frameworks: ["React", "Node.js", "Material-UI", "Redux", "Spring Boot", "Flask"]
  }
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Simple function to generate responses based on keywords
function generateResponse(query: string): string {
  query = query.toLowerCase()
  
  if (query.includes('education')) {
    return `${resumeData.name} has a ${resumeData.education[0].degree} from ${resumeData.education[0].school} and a ${resumeData.education[1].degree} from ${resumeData.education[1].school}.`
  }
  
  if (query.includes('experience')) {
    return `Most recently, ${resumeData.name} worked as a ${resumeData.experience[0].title} at ${resumeData.experience[0].company} in ${resumeData.experience[0].location}, where they ${resumeData.experience[0].highlights[0].toLowerCase()}.`
  }
  
  if (query.includes('skills')) {
    return `${resumeData.name}'s technical skills include: ${resumeData.skills.languages.join(', ')} and frameworks like ${resumeData.skills.frameworks.join(', ')}.`
  }
  
  return "I can tell you about Kush's education, experience, or skills. What would you like to know?"
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm a chat assistant that can answer questions about Kush's resume. What would you like to know?"
    }
  ])
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input
    }

    const assistantMessage: Message = {
      role: 'assistant',
      content: generateResponse(input)
    }

    setMessages(prev => [...prev, userMessage, assistantMessage])
    setInput('')
  }

  return (
    <div className="max-w-2xl mx-auto p-4 h-[90vh] flex flex-col">
      <Card className="flex-1">
        <ScrollArea className="h-[calc(90vh-120px)] p-4">
          <CardContent className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'assistant' ? 'items-start' : 'items-start flex-row-reverse'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  {message.role === 'assistant' ? (
                    <Bot className="w-5 h-5" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>
                <div
                  className={`rounded-lg px-3 py-2 max-w-[80%] ${
                    message.role === 'assistant'
                      ? 'bg-muted'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about education, experience, or skills..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="w-4 h-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  )
}

