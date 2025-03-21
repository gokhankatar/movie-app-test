export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: [
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate",
    "nuxt-swiper",
    'nuxt-lodash'
  ],
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: 'image/x-icon',
          href: "/favicon.ico"
        }
      ]
    }
  },
  lodash: {
    prefix: "_",
    prefixSkip: ["string"],
    upperAfterPrefix: false,
    exclude: ["map"],
    alias: [
      ["camelCase", "stringToCamelCase"],
      ["kebabCase", "stringToKebab"],
      ["isDate", "isLodashDate"]
    ],
  },
});