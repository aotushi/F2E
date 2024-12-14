// https://nuxt.com/docs/api/configuration/nuxt-config
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-08",
  devtools: { enabled: true },
  modules: ["nuxtjs-naive-ui", "@nuxt/ui", "@pinia/nuxt"],
  pinia: {
    storesDirs: ["./store/**"],
  },
  css: ["assets/css/reactive.css"],
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
  build: {
    transpile: ['vueuc', /naive-ui/],
  }
});
