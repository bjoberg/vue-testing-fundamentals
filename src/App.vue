<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script>
import HomePage from "./pages/Home.vue";

export default {
  name: "App",
  components: {
    HomePage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
h5 {
  color: #8a8a8a;
}
input {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border-radius: 4px;
  border: 1px solid #1d1f1e;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
}
</style>
