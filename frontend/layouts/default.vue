<template>
  <div id="app">
    <Header />
    <Nuxt class=" min-h-1/1 flex-1"/>
    <Footer />
  </div>
</template>

<style>
#__layout,
#app {
  min-height: 100vh;
  font-family: "Almarai", -apple-system, Helvetica, Arial, sans-serif;
  @apply flex flex-col;
}
</style>