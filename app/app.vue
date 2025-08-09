<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Global meta configuration
useHead({
  titleTemplate: "%s - Skill Mirror",
  htmlAttrs: {
    lang: "en",
  },
});

// Global styles and theme setup
onMounted(() => {
  // Initialize theme based on user preference
  const colorMode = useColorMode();
  if (process.client) {
    // Any client-side initialization
  }
});
</script>

<style>
@import "../assets/css/main.css";
</style>
