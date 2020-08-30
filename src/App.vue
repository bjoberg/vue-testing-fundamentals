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
  text-align: center;
  margin: 2rem;
}
button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
  color: #44c767;
  padding: 0.5rem 1rem 0.5rem 1rem;
  text-decoration: none;
  outline: none;
  border: 1px solid #44c767;
  font-weight: bold;
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
