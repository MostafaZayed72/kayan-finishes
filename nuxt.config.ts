export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Kayan | Construction & Finishes',
      meta: [
        { name: 'description', content: 'شركة كيان للإنشاءات والتشطيبات المتكاملة — تصميم داخلي، تشطيب شقق وفلل، وتنفيذ هندسي بأعلى معايير الجودة في مصر.' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#E8631A' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Kayan Finishes' }
      ],
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/icons/icon-192.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat+Alternates:wght@400;500;600;700;800;900&display=swap' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      { code: 'ar', iso: 'ar-EG', dir: 'rtl', file: 'ar.json', name: 'العربية' },
      { code: 'en', iso: 'en-US', dir: 'ltr', file: 'en.json', name: 'English' }
    ],
    defaultLocale: 'ar',
    langDir: 'app/locales/',
    restructureDir: false,
    strategy: 'prefix_except_default',
    lazy: true,
    detectBrowserLanguage: false
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: false,
  }
})
