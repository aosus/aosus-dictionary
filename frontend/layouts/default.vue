<template>
  <div id="app">
    <Header />
    <Nuxt class="min-h-1/1 flex-1" />
    <Footer />
  </div>
</template>

<style>
#__layout,
#app {
  min-height: 100vh;
  font-family: "Almarai", -apple-system, Helvetica, Arial, sans-serif;
  background: #031e03;
  color: white;
  @apply flex flex-col;
}
</style>