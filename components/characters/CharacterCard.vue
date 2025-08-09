<template>
  <div
    class="character-card card hover:shadow-xl transition-all duration-300 group cursor-pointer"
  >
    <!-- Character Image/Video Container -->
    <div class="relative overflow-hidden rounded-t-xl">
      <!-- Static Avatar (always visible) -->
      <img
        :src="character.appearance.avatar_url"
        :alt="character.name.value"
        class="character-avatar w-full h-64 object-cover transition-opacity duration-300"
        :class="{ 'opacity-0': isHovered && hasGreetingVideo }"
        @error="handleImageError"
      />

      <!-- Greeting Video (shown on hover) -->
      <video
        v-if="hasGreetingVideo"
        ref="greetingVideo"
        :src="character.appearance.greeting_video_url"
        class="absolute inset-0 w-full h-64 object-cover transition-opacity duration-300"
        :class="{ 'opacity-100': isHovered, 'opacity-0': !isHovered }"
        muted
        loop
        playsinline
        @loadeddata="onVideoLoaded"
        @error="handleVideoError"
      />

      <!-- Overlay with character info -->
      <div
        class="character-overlay absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div class="absolute bottom-4 left-4 right-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-white font-semibold text-lg">
                {{ character.name.value }}
              </h3>
              <p class="text-white/90 text-sm">{{ roleLabel }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <!-- Company Type Badge -->
              <span
                class="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-white text-xs font-medium"
              >
                {{ companyTypeLabel }}
              </span>
              <!-- Gender Icon -->
              <Icon
                :name="
                  character.gender === 'male'
                    ? 'heroicons:user-20-solid'
                    : 'heroicons:user-20-solid'
                "
                class="w-4 h-4 text-white/80"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="isVideoLoading"
        class="absolute inset-0 bg-black/20 flex items-center justify-center"
      >
        <div class="loading-spinner w-8 h-8"></div>
      </div>
    </div>

    <!-- Character Details -->
    <div class="p-6">
      <!-- Header -->
      <div class="mb-4">
        <h3
          class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1"
        >
          {{ character.name.value }}
        </h3>
        <div class="flex items-center justify-between">
          <span
            class="text-sm font-medium text-primary-600 dark:text-primary-400"
          >
            {{ roleLabel }}
          </span>
          <span
            class="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-neutral-600 dark:text-neutral-400"
          >
            {{ companyTypeLabel }}
          </span>
        </div>
      </div>

      <!-- Description -->
      <p
        class="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3"
      >
        {{ character.description.value }}
      </p>

      <!-- Personality Traits -->
      <div class="mb-4">
        <h4
          class="text-xs font-medium text-neutral-500 dark:text-neutral-500 uppercase tracking-wide mb-2"
        >
          Key Traits
        </h4>
        <div class="flex flex-wrap gap-1">
          <span
            v-for="trait in displayTraits"
            :key="trait"
            class="text-xs px-2 py-1 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300 rounded-md"
          >
            {{ trait }}
          </span>
        </div>
      </div>

      <!-- Action Button -->
      <button
        @click="handleSelect"
        class="w-full btn btn-primary group-hover:shadow-md transition-all duration-200"
        :disabled="!character.is_active"
      >
        <Icon
          name="heroicons:chat-bubble-left-right-20-solid"
          class="w-4 h-4 mr-2"
        />
        Start Interview
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import type { Character } from "~/src/domain/entities/character";

// Props
interface Props {
  character: Character;
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  select: [character: Character];
}>();

// State
const isHovered = ref(false);
const isVideoLoading = ref(false);
const videoError = ref(false);
const greetingVideo = ref<HTMLVideoElement | null>(null);

// Computed
const hasGreetingVideo = computed(
  () =>
    Boolean(props.character.appearance.greeting_video_url) && !videoError.value
);

const roleLabel = computed(() => {
  const roleLabels = {
    hr: "HR Specialist",
    tech_lead: "Tech Lead",
    cto: "CTO",
    product_manager: "Product Manager",
    senior_engineer: "Senior Engineer",
  };
  return roleLabels[props.character.role] || props.character.role;
});

const companyTypeLabel = computed(() => {
  const companyLabels = {
    startup: "Startup",
    faang: "FAANG",
    enterprise: "Enterprise",
  };
  return (
    companyLabels[props.character.company_type] || props.character.company_type
  );
});

const displayTraits = computed(() => {
  return props.character.personality.traits.slice(0, 3);
});

// Methods
const handleMouseEnter = () => {
  isHovered.value = true;
  if (hasGreetingVideo.value && greetingVideo.value) {
    greetingVideo.value.currentTime = 0;
    greetingVideo.value.play().catch(() => {
      // Video play failed, handle gracefully
    });
  }
};

const handleMouseLeave = () => {
  isHovered.value = false;
  if (greetingVideo.value) {
    greetingVideo.value.pause();
  }
};

const handleSelect = () => {
  if (props.character.is_active) {
    emit("select", props.character);
  }
};

const handleImageError = () => {
  console.warn(`Failed to load avatar for ${props.character.name.value}`);
};

const handleVideoError = () => {
  videoError.value = true;
  console.warn(
    `Failed to load greeting video for ${props.character.name.value}`
  );
};

const onVideoLoaded = () => {
  isVideoLoading.value = false;
};

// Lifecycle
onMounted(() => {
  // Add hover listeners
  const cardElement = document.querySelector(".character-card");
  if (cardElement) {
    cardElement.addEventListener("mouseenter", handleMouseEnter);
    cardElement.addEventListener("mouseleave", handleMouseLeave);
  }

  // Preload greeting video if available
  if (hasGreetingVideo.value) {
    isVideoLoading.value = true;
  }
});

onUnmounted(() => {
  // Clean up video
  if (greetingVideo.value) {
    greetingVideo.value.pause();
    greetingVideo.value.currentTime = 0;
  }
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.character-card:hover .character-avatar {
  transform: scale(1.05);
}

.character-card {
  @apply transform transition-all duration-300 ease-out;
}

.character-card:hover {
  @apply -translate-y-2;
}
</style>
