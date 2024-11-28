'use client'

import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { ChatSidebar } from '@/components/chat-sidebar'
import { ChatMessages } from '@/components/chat-messages'
import { ChatInput } from '@/components/chat-input'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
}

const initialMessage: Message = {
  id: nanoid(),
  role: 'assistant',
  content: "Hello! I'm an AI assistant that can answer questions about Kush's resume. You can ask me anything about his education, experience, projects, skills, or achievements. What would you like to know?"
}

export default function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const initialConversation: Conversation = {
      id: nanoid(),
      title: "New Conversation",
      messages: [initialMessage]
    }
    setConversations([initialConversation])
    setSelectedConversation(initialConversation.id)
  }, [])

  const currentMessages = conversations.find(c => c.id === selectedConversation)?.messages || []

  const handleNewMessage = async (content: string) => {
    const messageId = nanoid()
    const userMessage: Message = { id: messageId, role: 'user', content }

    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation 
          ? { ...conv, messages: [...conv.messages, userMessage] }
          : conv
      )
    )

    setIsLoading(true)
    try {
      let response: string

      if (content.toLowerCase().includes('full resume')) {
        response = "You can view Kush's full resume here: https://drive.google.com/file/d/1Jc287jVGXussEQ5MWnLds8H4O24i8sIl/view?usp=sharing"
      } else {
        const apiResponse = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: content }),
        })
        const data = await apiResponse.json()
        response = data.response
      }

      const assistantMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: response
      }

      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation 
            ? { ...conv, messages: [...conv.messages, assistantMessage] }
            : conv
        )
      )
    } catch (error) {
      console.error('Error generating response:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuestionClick = (question: string) => {
    handleNewMessage(question)
  }

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar 
        conversations={conversations}
        selectedId={selectedConversation}
        onSelect={setSelectedConversation}
        onQuestionClick={handleQuestionClick}
      />
      <div className="flex-1 flex flex-col">
        <ChatMessages messages={currentMessages} />
        <ChatInput onSubmit={handleNewMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}

