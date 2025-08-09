<template>
  <div class="flex flex-col h-full bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
    <!-- Chat Header -->
    <div class="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700">
      <div class="flex items-center space-x-3">
        <div class="relative">
          <img 
            :src="currentSession?.characterAvatar || '/placeholder-avatar.jpg'" 
            :alt="currentSession?.characterName"
            class="w-10 h-10 rounded-full object-cover border-2 border-primary-500"
          >
          <div class="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-neutral-800"></div>
        </div>
        <div>
          <h3 class="font-semibold text-neutral-900 dark:text-neutral-100">
            {{ currentSession?.characterName || 'AI Interviewer' }}
          </h3>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">
            {{ isTyping ? 'Typing...' : 'Online' }}
          </p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button 
          @click="endChat"
          class="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          title="End Interview"
        >
          <Icon name="material-symbols:call-end" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Messages Area -->
    <div 
      ref="messagesContainer"
      class="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
    >
      <template v-if="currentSession?.messages?.length">
        <div 
          v-for="message in currentSession.messages" 
          :key="message.id"
          class="flex items-start space-x-3 animate-fade-in"
          :class="{ 'flex-row-reverse space-x-reverse': message.fromUser }"
        >
          <!-- Avatar -->
          <div class="flex-shrink-0">
            <img 
              :src="message.fromUser ? '/user-avatar.jpg' : (currentSession?.characterAvatar || '/placeholder-avatar.jpg')"
              :alt="message.fromUser ? 'You' : currentSession?.characterName"
              class="w-8 h-8 rounded-full object-cover"
            >
          </div>

          <!-- Message Bubble -->
          <div class="flex-1 max-w-xs lg:max-w-md">
            <div 
              class="px-4 py-3 rounded-2xl shadow-sm"
              :class="{
                'bg-primary-600 text-white rounded-br-md': message.fromUser,
                'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-bl-md': !message.fromUser
              }"
            >
              <p class="text-sm leading-relaxed">{{ message.text }}</p>
            </div>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1 px-1">
              {{ formatTime(message.timestamp) }}
            </p>
          </div>
        </div>
      </template>

      <!-- Typing indicator -->
      <div 
        v-if="isTyping"
        class="flex items-start space-x-3 animate-fade-in"
      >
        <div class="flex-shrink-0">
          <img 
            :src="currentSession?.characterAvatar || '/placeholder-avatar.jpg'"
            :alt="currentSession?.characterName"
            class="w-8 h-8 rounded-full object-cover"
          >
        </div>
        <div class="bg-neutral-100 dark:bg-neutral-700 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
          <div class="flex space-x-1">
            <div class="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style="animation-delay: 0s"></div>
            <div class="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700">
      <div class="flex items-center space-x-3">
        <button 
          type="button" 
          class="p-2 text-neutral-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
        >
          <icon-mood-smile class="w-5 h-5" />
        </button>
        
        <div class="flex-1 relative">
          <input
            v-model="messageText"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Type your message..."
            class="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            :disabled="!currentSession"
          >
        </div>
        
        <button 
          @click="sendMessage"
          :disabled="!messageText.trim() || !currentSession"
          class="p-3 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white rounded-full transition-colors shadow-sm hover:shadow-md"
        >
          <icon-send class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { useChatStore } from '~/stores/chat-store'

// Components
import IconMoodSmile from '~/components/icon/icon-mood-smile.vue'
import IconSend from '~/components/icon/icon-send.vue'

const chatStore = useChatStore()
const messageText = ref('')
const messagesContainer = ref<HTMLElement>()

// Computed
const currentSession = computed(() => chatStore.currentSession)
const isTyping = computed(() => chatStore.isTyping)

// Methods
const sendMessage = () => {
  if (!messageText.value.trim() || !currentSession.value) return
  
  chatStore.sendMessage(messageText.value)
  messageText.value = ''
  scrollToBottom()
}

const endChat = () => {
  if (confirm('Are you sure you want to end this interview?')) {
    chatStore.endChatSession()
  }
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Watch for new messages and scroll to bottom
watch(
  () => currentSession.value?.messages?.length,
  () => {
    scrollToBottom()
  },
  { flush: 'post' }
)

// Scroll to bottom on mount
onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
/* Custom scrollbar hiding */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Custom bounce animation for typing indicator */
@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>