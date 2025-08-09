<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800 overflow-hidden"
    >
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-hero-pattern opacity-40"></div>

      <div
        class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"
      >
        <div class="text-center">
          <!-- Main Heading -->
          <h1
            class="text-4xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-6"
          >
            Meet Your Next
            <span class="text-gradient">AI Interviewer</span>
          </h1>

          <!-- Subtitle -->
          <p
            class="text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Practice with visually appealing and charismatic AI interviewers
            tailored to different company cultures and roles.
          </p>

          <!-- CTA Buttons -->
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              @click="scrollToCharacters"
              class="btn btn-primary px-8 py-4 text-lg hover-lift"
            >
              <Icon name="heroicons:play-20-solid" class="w-5 h-5 mr-2" />
              Start Interview
            </button>
            <NuxtLink
              to="/demo"
              class="btn btn-secondary px-8 py-4 text-lg hover-lift"
            >
              <Icon name="heroicons:eye-20-solid" class="w-5 h-5 mr-2" />
              Watch Demo
            </NuxtLink>
          </div>

          <!-- Phase Badge -->
          <div
            class="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full border border-neutral-200 dark:border-neutral-700"
          >
            <div
              class="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse"
            ></div>
            <span
              class="text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Phase 1: MVP Personal - Validation in Progress
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Character Selection Section -->
    <section
      id="characters"
      class="py-20 lg:py-32 bg-white dark:bg-neutral-900"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2
            class="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
          >
            Choose Your Interviewer
          </h2>
          <p
            class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
          >
            Select from our curated collection of AI interviewers, each designed
            for specific roles and company cultures.
          </p>
        </div>

        <!-- Company Type Filter -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button
            v-for="companyType in companyTypes"
            :key="companyType.value"
            @click="selectedCompanyType = companyType.value"
            class="btn transition-all duration-200"
            :class="
              selectedCompanyType === companyType.value
                ? 'btn-primary'
                : 'btn-ghost'
            "
          >
            <Icon :name="companyType.icon" class="w-4 h-4 mr-2" />
            {{ companyType.label }}
          </button>
        </div>

        <!-- Characters Grid -->
        <div
          v-if="loading"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <!-- Loading skeletons -->
          <div v-for="i in 6" :key="i" class="card p-6">
            <div class="loading-pulse w-full h-64 rounded-lg mb-4"></div>
            <div class="loading-pulse h-4 w-3/4 mb-2"></div>
            <div class="loading-pulse h-4 w-1/2 mb-4"></div>
            <div class="loading-pulse h-10 w-full"></div>
          </div>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <Icon
            name="heroicons:exclamation-triangle-20-solid"
            class="w-16 h-16 text-error-500 mx-auto mb-4"
          />
          <h3
            class="text-xl font-semibold text-error-600 dark:text-error-400 mb-2"
          >
            Failed to load characters
          </h3>
          <p class="text-neutral-500 dark:text-neutral-500 mb-4">
            {{ error }}
          </p>
          <button @click="fetchActiveCharacters" class="btn btn-primary">
            Try Again
          </button>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <CharactersCharacterCard
            v-for="character in filteredCharacters"
            :key="character.id.value"
            :character="character"
            @select="handleCharacterSelect"
          />
        </div>

        <!-- Empty State -->
        <div v-if="filteredCharacters.length === 0" class="text-center py-12">
          <Icon
            name="heroicons:users-20-solid"
            class="w-16 h-16 text-neutral-400 mx-auto mb-4"
          />
          <h3
            class="text-xl font-semibold text-neutral-600 dark:text-neutral-400 mb-2"
          >
            No characters available
          </h3>
          <p class="text-neutral-500 dark:text-neutral-500">
            Characters for this company type are coming soon.
          </p>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2
            class="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
          >
            Why Skill Mirror?
          </h2>
          <p
            class="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
          >
            Experience the future of interview preparation with our innovative
            AI-powered platform.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UiFeatureCard
            v-for="feature in features"
            :key="feature.title"
            :feature="feature"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { CompanyType } from "~/src/domain/value-objects/enums";
import type { Character } from "~/src/domain/entities/character";
// Import the simplified composable that avoids dependency chain issues
import { useCharacterSimple } from "~/src/presentation/composables/use-character-simple";

// SEO and Meta
useHead({
  title: "AI Interview Platform",
  meta: [
    {
      name: "description",
      content:
        "Practice interviews with visually appealing AI interviewers tailored to different company cultures and roles.",
    },
  ],
});

// Use character composable
const { characters, loading, error, fetchActiveCharacters } =
  useCharacterSimple();

// State
const selectedCompanyType = ref<CompanyType | "all">("all");

// Company type options
const companyTypes = [
  {
    value: "all",
    label: "All Companies",
    icon: "heroicons:building-office-2-20-solid",
  },
  {
    value: CompanyType.STARTUP,
    label: "Startup",
    icon: "heroicons:rocket-launch-20-solid",
  },
  { value: CompanyType.FAANG, label: "FAANG", icon: "heroicons:star-20-solid" },
  {
    value: CompanyType.ENTERPRISE,
    label: "Enterprise",
    icon: "heroicons:building-office-20-solid",
  },
];

// Features for the features section
const features = [
  {
    icon: "heroicons:user-group-20-solid",
    title: "Diverse Characters",
    description:
      "Choose from HR professionals, Tech Leads, and CTOs with unique personalities and expertise.",
  },
  {
    icon: "heroicons:building-office-2-20-solid",
    title: "Company-Specific",
    description:
      "Characters adapted to different company cultures: Startups, FAANG, and Enterprise.",
  },
  {
    icon: "heroicons:play-circle-20-solid",
    title: "Interactive Videos",
    description:
      "Engaging hover animations and greeting videos for a realistic interview experience.",
  },
];

// Computed
const filteredCharacters = computed(() => {
  if (selectedCompanyType.value === "all") {
    return characters.value;
  }
  return characters.value.filter(
    (char) => char.company_type === selectedCompanyType.value
  );
});

// Methods
const scrollToCharacters = () => {
  const element = document.getElementById("characters");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const handleCharacterSelect = (character: Character) => {
  // Navigate to interview setup or character detail
  navigateTo(`/interview/setup/${character.id.value}`);
};

// Lifecycle
onMounted(async () => {
  // Fetch characters using the composable
  await fetchActiveCharacters();
});
</script>

<style scoped>
/* Component-specific styles */
.hover-lift {
  @apply transition-all duration-300 ease-out;
}

.hover-lift:hover {
  @apply transform -translate-y-1 shadow-lg;
}
</style>
