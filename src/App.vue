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
  margin: 2rem;
}
h5 {
  color: #8a8a8a;
}
button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffff;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
  padding: 0.5rem 1rem 0.5rem 1rem;
  text-decoration: none;
  outline: none;
  border: 1px solid black;
  font-weight: bold;
}
button.primary_btn {
  color: #44c767;
  border: 1px solid #44c767;
}
button.primary_btn:hover:not([disabled="disabled"]) {
  color: white;
  background-color: #44c767;
}
button.secondary_btn {
  color: #448cc7;
  border: 1px solid #448cc7;
}
button.secondary_btn:hover:not([disabled="disabled"]) {
  color: white;
  background-color: #448cc7;
}
button.error_btn {
  color: #c74844;
  border: 1px solid #c74844;
}
button.error_btn:hover:not([disabled="disabled"]) {
  color: white;
  background-color: #c74844;
}
button:disabled {
  color: #6b6b6b;
  border: 1px solid #6b6b6b;
  cursor: not-allowed;
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
