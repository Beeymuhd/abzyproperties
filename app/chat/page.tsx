'use client'

import { useState, useRef, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getSession } from '@/lib/auth'
import {
  Send,
  Phone,
  Paperclip,
  Smile,
  MoreVertical,
  Clock,
} from 'lucide-react'
import { toast } from 'sonner'

interface ChatMessage {
  id: string
  sender: 'user' | 'agent'
  message: string
  timestamp: Date
  read: boolean
}

const mockConversations = [
  {
    id: 1,
    agentName: 'Chinedu Okonkwo',
    agentAvatar: 'CO',
    lastMessage: 'Let me check the availability for you',
    unread: 2,
    property: 'Modern Duplex in Abuja',
    status: 'online',
  },
  {
    id: 2,
    agentName: 'Amara Obi',
    agentAvatar: 'AO',
    lastMessage: 'The inspection is scheduled for next Saturday',
    unread: 0,
    property: 'Premium Office Space',
    status: 'away',
  },
  {
    id: 3,
    agentName: 'Ibrahim Hassan',
    agentAvatar: 'IH',
    lastMessage: 'Thanks for your inquiry, we\'ll get back to you',
    unread: 0,
    property: 'Luxury Apartment',
    status: 'online',
  },
]

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'agent',
    message: 'Hi! Welcome to Abzy Properties. How can I help you today?',
    timestamp: new Date(Date.now() - 60000),
    read: true,
  },
  {
    id: '2',
    sender: 'user',
    message: 'I\'m interested in the Modern Duplex in Lekki',
    timestamp: new Date(Date.now() - 45000),
    read: true,
  },
  {
    id: '3',
    sender: 'agent',
    message: 'Great choice! That\'s one of our best properties. Would you like to schedule a viewing?',
    timestamp: new Date(Date.now() - 30000),
    read: true,
  },
  {
    id: '4',
    sender: 'user',
    message: 'Yes, can we schedule for this weekend?',
    timestamp: new Date(Date.now() - 15000),
    read: true,
  },
  {
    id: '5',
    sender: 'agent',
    message: 'Let me check the availability for you',
    timestamp: new Date(),
    read: false,
  },
]

export default function ChatPage() {
  const [conversations, setConversations] = useState(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  )
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const [session, setSession] = useState(getSession())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSession(getSession())
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date(),
      read: true,
    }

    setMessages([...messages, message])
    setNewMessage('')

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        message: 'Thanks for your message! Our team will get back to you shortly.',
        timestamp: new Date(),
        read: false,
      }
      setMessages((prev) => [...prev, agentMessage])
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-screen flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="font-bold text-lg">Messages</h2>
                <p className="text-xs text-muted-foreground">
                  {conversations.length} conversations
                </p>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 p-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedConversation.id === conv.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            selectedConversation.id === conv.id
                              ? 'bg-primary-foreground/20'
                              : 'bg-muted'
                          }`}
                        >
                          {conv.agentAvatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold line-clamp-1">
                            {conv.agentName}
                          </p>
                          <p className="text-xs opacity-75 line-clamp-1">
                            {conv.property}
                          </p>
                        </div>
                      </div>
                      {conv.unread > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-destructive text-destructive-foreground">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs opacity-70 line-clamp-1">
                      {conv.lastMessage}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          conv.status === 'online'
                            ? 'bg-green-500'
                            : 'bg-amber-500'
                        }`}
                      />
                      <p className="text-xs opacity-60">
                        {conv.status === 'online' ? 'Online' : 'Away'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col overflow-hidden">
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                    {selectedConversation.agentAvatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {selectedConversation.agentName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation.property}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        selectedConversation.status === 'online'
                          ? 'bg-green-500'
                          : 'bg-amber-500'
                      }`}
                    />
                    <span className="text-xs text-muted-foreground capitalize">
                      {selectedConversation.status}
                    </span>
                  </div>
                  <Button size="icon" variant="ghost">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`flex items-end gap-2 max-w-xs ${
                        msg.sender === 'user'
                          ? 'flex-row-reverse'
                          : 'flex-row'
                      }`}
                    >
                      {msg.sender === 'agent' && (
                        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                          {selectedConversation.agentAvatar}
                        </div>
                      )}

                      <div
                        className={`rounded-2xl px-4 py-2 backdrop-blur-sm ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-muted rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm break-words">{msg.message}</p>
                        <p
                          className={`text-xs mt-1 opacity-70 flex items-center gap-1 ${
                            msg.sender === 'user'
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          {formatTime(msg.timestamp)}
                          {msg.sender === 'user' && msg.read && (
                            <Clock className="w-3 h-3" />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border space-y-3">
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="flex-1"
                  />
                  <Button size="icon" variant="ghost">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your response time: typically under 2 hours
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
