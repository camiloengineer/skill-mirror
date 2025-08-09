<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20 lg:py-32">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-hero-pattern opacity-40"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <!-- Main Heading -->
          <h1 class="text-4xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Meet Your Next
            <span class="text-gradient">AI Interviewer</span>
          </h1>
          
          <!-- Subtitle -->
          <p class="text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Practice with visually appealing and charismatic AI interviewers
            tailored to different company cultures and roles.
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <NuxtLink
              to="/chat"
              class="btn btn-primary px-8 py-4 text-lg hover-lift"
            >
              <Icon name="heroicons:play-20-solid" class="w-5 h-5 mr-2" />
              Try Chat Demo
            </NuxtLink>
            <button
              @click="scrollToFeatures"
              class="btn btn-secondary px-8 py-4 text-lg hover-lift"
            >
              <Icon name="heroicons:eye-20-solid" class="w-5 h-5 mr-2" />
              Learn More
            </button>
          </div>
          
          <!-- Phase Badge -->
          <div class="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full border border-neutral-200 dark:border-neutral-700">
            <div class="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse"></div>
            <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Phase 1: MVP Personal - Chat POC Ready
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Demo Section -->
    <section class="py-20 bg-white dark:bg-neutral-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Available Interviewers
          </h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Choose from our initial set of AI interviewers for your practice sessions.
          </p>
        </div>

        <!-- Simple Character Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div 
            v-for="character in mockCharacters" 
            :key="character.id"
            class="card card-hover p-6 text-center"
          >
            <img 
              :src="character.avatar" 
              :alt="character.name"
              class="w-20 h-20 rounded-full object-cover border-4 border-primary-500 mx-auto mb-4"
            >
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              {{ character.name }}
            </h3>
            <p class="text-neutral-600 dark:text-neutral-400 mb-1">
              {{ character.role }}
            </p>
            <p class="text-sm text-neutral-500 dark:text-neutral-500 mb-4">
              {{ character.company }}
            </p>
            <NuxtLink 
              to="/chat"
              class="btn btn-primary w-full"
            >
              Start Interview
            </NuxtLink>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center">
          <NuxtLink 
            to="/chat"
            class="btn btn-accent px-8 py-4 text-lg hover-lift"
          >
            <Icon name="heroicons:chat-bubble-left-right-20-solid" class="w-5 h-5 mr-2" />
            Try Interactive Chat Demo
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Why Skill Mirror?
          </h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Experience the future of interview preparation with our innovative AI-powered platform.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="feature in features" 
            :key="feature.title"
            class="card p-6 text-center hover-lift"
          >
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon :name="feature.icon" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-neutral-600 dark:text-neutral-400">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO and Meta
useHead({
  title: 'Skill Mirror - AI Interview Platform',
  meta: [
    {
      name: 'description',
      content: 'Practice interviews with visually appealing AI interviewers tailored to different company cultures and roles.'
    }
  ]
})

// Mock character data (same as in chat page)
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

// Features data
const features = [
  {
    icon: 'heroicons:user-group-20-solid',
    title: 'Diverse Characters',
    description: 'Choose from HR professionals, Tech Leads, and CTOs with unique personalities and expertise.'
  },
  {
    icon: 'heroicons:building-office-2-20-solid',
    title: 'Company-Specific',
    description: 'Characters adapted to different company cultures: Startups, FAANG, and Enterprise.'
  },
  {
    icon: 'heroicons:chat-bubble-left-right-20-solid',
    title: 'Interactive Chat',
    description: 'Real-time conversation with AI interviewers that provide realistic interview experiences.'
  }
]

// Methods
const scrollToFeatures = () => {
  const element = document.getElementById('features')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.hover-lift {
  @apply transition-all duration-300 ease-out;
}

.hover-lift:hover {
  @apply transform -translate-y-1 shadow-lg;
}
</style>