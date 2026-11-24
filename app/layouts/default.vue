<template>
  <div class="min-h-screen flex flex-col bg-brand-cream dark:bg-brand-black text-slate-900 dark:text-slate-100 transition-colors duration-300">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
    <FloatingActions />
    <BookingModal />
  </div>
</template>
