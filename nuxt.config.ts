// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // CSS configuration
  css: ["@/assets/css/main.css"],

  // PostCSS configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Modules
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
  ],

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false, // Disabled for now to avoid vue-tsc dependency issues
  },

  // App configuration
  app: {
    head: {
      title: "Skill Mirror - AI Interview Platform",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "AI-powered interview platform with attractive and functional AI interviewers",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
        },
      ],
    },
  },

  // Router configuration
  router: {
    options: { linkExactActiveClass: "active" },
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    secretKey: process.env.SECRET_KEY,

    // Public keys (exposed to client-side)
    public: {
      apiBase: process.env.API_BASE_URL || "/api",
    },
  },
});
