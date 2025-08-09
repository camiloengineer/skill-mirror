<template>
  <div
    class="card p-6 text-center hover:shadow-lg transition-all duration-300 group"
  >
    <!-- Icon -->
    <div class="mb-4">
      <div
        class="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto group-hover:bg-primary-200 dark:group-hover:bg-primary-900/40 transition-colors duration-300"
      >
        <Icon
          :name="feature.icon"
          class="w-6 h-6 text-primary-600 dark:text-primary-400"
        />
      </div>
    </div>

    <!-- Title -->
    <h3
      class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2"
    >
      {{ feature.title }}
    </h3>

    <!-- Description -->
    <p class="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
      {{ feature.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Props {
  feature: Feature;
}

defineProps<Props>();
</script>

<style scoped>
.group:hover .w-12 {
  @apply transform scale-110;
}
</style>
