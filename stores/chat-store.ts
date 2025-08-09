import { defineStore } from 'pinia'

export interface ChatMessage {
  id: string
  text: string
  fromUser: boolean
  timestamp: Date
  isTyping?: boolean
}

export interface ChatSession {
  id: string
  characterId: string
  characterName: string
  characterAvatar: string
  messages: ChatMessage[]
  isActive: boolean
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    currentSession: null as ChatSession | null,
    sessions: [] as ChatSession[],
    isTyping: false,
  }),

  actions: {
    startChatSession(characterId: string, characterName: string, characterAvatar: string) {
      const sessionId = `session-${Date.now()}`
      
      const session: ChatSession = {
        id: sessionId,
        characterId,
        characterName,
        characterAvatar,
        messages: [
          {
            id: `msg-${Date.now()}`,
            text: `Hello! I'm ${characterName}. I'm excited to conduct your interview today. How are you feeling?`,
            fromUser: false,
            timestamp: new Date(),
          }
        ],
        isActive: true,
      }

      this.sessions.push(session)
      this.currentSession = session
    },

    sendMessage(text: string) {
      if (!this.currentSession || !text.trim()) return

      // Add user message
      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}-user`,
        text: text.trim(),
        fromUser: true,
        timestamp: new Date(),
      }
      
      this.currentSession.messages.push(userMessage)

      // Simulate AI typing
      this.isTyping = true
      
      // Simulate AI response (mock)
      setTimeout(() => {
        if (!this.currentSession) return
        
        const aiResponse: ChatMessage = {
          id: `msg-${Date.now()}-ai`,
          text: this.generateAIResponse(text),
          fromUser: false,
          timestamp: new Date(),
        }
        
        this.currentSession.messages.push(aiResponse)
        this.isTyping = false
      }, 1500 + Math.random() * 1000) // Random delay for realism
    },

    generateAIResponse(userText: string): string {
      // Simple mock responses for demo
      const responses = [
        "That's interesting! Can you tell me more about your experience with that?",
        "Great point! How would you handle a challenging situation like that?",
        "I appreciate your honesty. What would you do differently next time?",
        "Excellent! Can you walk me through your thought process on that?",
        "That shows good problem-solving skills. What other approaches did you consider?",
        "I see. How do you typically collaborate with team members on such tasks?",
        "Good insight! What metrics would you use to measure success in that scenario?",
        "Interesting approach! How would you scale that solution for a larger team?",
      ]
      
      return responses[Math.floor(Math.random() * responses.length)]
    },

    endChatSession() {
      if (this.currentSession) {
        this.currentSession.isActive = false
        this.currentSession = null
      }
    },

    clearAllSessions() {
      this.sessions = []
      this.currentSession = null
      this.isTyping = false
    }
  },
})