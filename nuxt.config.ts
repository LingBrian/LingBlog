import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    webname: "LingBrian",
    public: {
      webname: "BrianLing's WebSite"
    }
  },
  ssr: false,
  spaLoadingTemplate: 'spa-loading-template.html',
  build: {
    transpile:
      process.env.NODE_ENV === 'production' ? ['naive-ui', '@vicons/ionicons5', 'vueuc', '@css-render/vue3-ssr', 'juggle/resize-observer'] : ['@juggle/resize-observer'],
  },

  vite: {
    optimizeDeps: {
      include: process.env.NODE_ENV === 'development' ? ['@vicons/ionicons5', 'naive-ui', 'vueuc', 'date-fns-tz'] : [],
    },
    plugins: [
      AutoImport({
        imports: [
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ]
  },

  modules: [],

  devtools: {
    enabled: false,

    timeline: {
      enabled: true
    }
  }
});
