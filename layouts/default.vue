<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
    <!-- Navigation Header -->
    <header
      class="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700"
    >
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <div
                class="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center"
              >
                <span class="text-white font-bold text-sm">SM</span>
              </div>
              <span
                class="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
              >
                Skill Mirror
              </span>
            </NuxtLink>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink
              to="/"
              class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              :class="{
                'text-primary-600 dark:text-primary-400': $route.path === '/',
              }"
            >
              Characters
            </NuxtLink>
            <NuxtLink
              to="/interviews"
              class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              :class="{
                'text-primary-600 dark:text-primary-400':
                  $route.path.startsWith('/interviews'),
              }"
            >
              Interviews
            </NuxtLink>
            <NuxtLink
              to="/demo"
              class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              :class="{
                'text-primary-600 dark:text-primary-400':
                  $route.path === '/demo',
              }"
            >
              Demo
            </NuxtLink>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-4">
            <!-- Theme Toggle -->
            <button
              @click="toggleColorMode"
              class="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <Icon
                :name="
                  isDark ? 'heroicons:sun-20-solid' : 'heroicons:moon-20-solid'
                "
                class="w-5 h-5"
              />
            </button>

            <!-- Mobile Menu Button -->
            <button
              @click="toggleMobileMenu"
              class="md:hidden p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <Icon
                :name="
                  mobileMenuOpen
                    ? 'heroicons:x-mark-20-solid'
                    : 'heroicons:bars-3-20-solid'
                "
                class="w-5 h-5"
              />
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-1"
        >
          <div
            v-if="mobileMenuOpen"
            class="md:hidden border-t border-neutral-200 dark:border-neutral-700 py-4"
          >
            <div class="flex flex-col space-y-4">
              <NuxtLink
                to="/"
                @click="closeMobileMenu"
                class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                :class="{
                  'text-primary-600 dark:text-primary-400': $route.path === '/',
                }"
              >
                Characters
              </NuxtLink>
              <NuxtLink
                to="/interviews"
                @click="closeMobileMenu"
                class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                :class="{
                  'text-primary-600 dark:text-primary-400':
                    $route.path.startsWith('/interviews'),
                }"
              >
                Interviews
              </NuxtLink>
              <NuxtLink
                to="/demo"
                @click="closeMobileMenu"
                class="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                :class="{
                  'text-primary-600 dark:text-primary-400':
                    $route.path === '/demo',
                }"
              >
                Demo
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer
      class="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 mt-auto"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center space-x-2 mb-4 md:mb-0">
            <div
              class="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center"
            >
              <span class="text-white font-bold text-xs">SM</span>
            </div>
            <span class="text-sm text-neutral-600 dark:text-neutral-400">
              © 2025 Skill Mirror. AI Interview Platform.
            </span>
          </div>
          <div
            class="flex items-center space-x-6 text-sm text-neutral-600 dark:text-neutral-400"
          >
            <span>Phase 1: MVP Personal</span>
            <span class="hidden sm:inline">•</span>
            <span class="hidden sm:inline">Built with Clean Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const route = useRoute();

// Mobile menu state
const mobileMenuOpen = ref(false);

// Computed properties
const isDark = computed(() => colorMode.value === "dark");

// Methods
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

// Close mobile menu when route changes
watch(
  () => route.path,
  () => {
    closeMobileMenu();
  }
);

// Close mobile menu when clicking outside (if needed)
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    if (mobileMenuOpen.value) {
      const target = event.target as Element;
      const mobileMenu = document.querySelector("[data-mobile-menu]");
      if (mobileMenu && !mobileMenu.contains(target)) {
        closeMobileMenu();
      }
    }
  };
  document.addEventListener("click", handleClickOutside);

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
