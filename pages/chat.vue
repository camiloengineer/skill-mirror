<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 p-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Skill Mirror Chat POC
        </h1>
        <p class="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Test the AI interview chat interface with our character interviewers.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        <!-- Character Selection Panel -->
        <div class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Choose Your Interviewer
          </h2>
          
          <div class="space-y-4">
            <div 
              v-for="character in mockCharacters" 
              :key="character.id"
              @click="startChat(character)"
              class="flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700 border border-transparent hover:border-primary-200 dark:hover:border-primary-800"
              :class="{ 
                'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800': currentSession?.characterId === character.id 
              }"
            >
              <img 
                :src="character.avatar" 
                :alt="character.name"
                class="w-12 h-12 rounded-full object-cover border-2 border-primary-500 mr-3"
              >
              <div class="flex-1">
                <h3 class="font-semibold text-neutral-900 dark:text-neutral-100">
                  {{ character.name }}
                </h3>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">
                  {{ character.role }} • {{ character.company }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <button 
              @click="clearAllChats"
              class="w-full px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              Clear All Chats
            </button>
          </div>
        </div>

        <!-- Chat Interface -->
        <div class="lg:col-span-2">
          <div v-if="currentSession" class="h-full">
            <ChatInterface />
          </div>
          
          <div v-else class="h-full flex items-center justify-center bg-white dark:bg-neutral-800 rounded-xl shadow-lg">
            <div class="text-center p-8">
              <Icon name="material-symbols:chat-bubble-outline" class="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
              <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Select an Interviewer
              </h3>
              <p class="text-neutral-500 dark:text-neutral-400">
                Choose a character from the left panel to start your interview.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Debug Info -->
      <div class="mt-8 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
        <h3 class="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Debug Info:</h3>
        <div class="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
          <p>Current Session: {{ currentSession ? currentSession.id : 'None' }}</p>
          <p>Messages Count: {{ currentSession?.messages?.length || 0 }}</p>
          <p>Is Typing: {{ isTyping }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useChatStore } from '~/stores/chat-store'
import ChatInterface from '~/components/interview/ChatInterface.vue'

// Meta
useHead({
  title: 'Chat POC - Skill Mirror',
  meta: [
    { name: 'description', content: 'Test the AI interview chat interface' }
  ]
})

const chatStore = useChatStore()

// Mock character data
const mockCharacters = [
  {
    id: 'sarah-cto',
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechCorp',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b515?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'marcus-lead',
    name: 'Marcus Rodriguez',
    role: 'Tech Lead',
    company: 'StartupXYZ',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    id: 'emma-hr',
    name: 'Emma Wilson',
    role: 'HR Director',
    company: 'Enterprise Inc',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80',
  },
]

// Computed
const currentSession = computed(() => chatStore.currentSession)
const isTyping = computed(() => chatStore.isTyping)

// Methods
const startChat = (character: any) => {
  chatStore.startChatSession(character.id, character.name, character.avatar)
}

const clearAllChats = () => {
  if (confirm('Are you sure you want to clear all chat sessions?')) {
    chatStore.clearAllSessions()
  }
}
</script>