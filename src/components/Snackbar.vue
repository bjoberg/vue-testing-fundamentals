<template>
  <div class="wrapper">Adding new items...</div>
</template>

<script>
export default {
  name: "Snackbar",
};
</script>

<style>
.wrapper {
  position: fixed;
  bottom: 1.5rem;
  right: 1rem;
  background-color: #ffffff;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 0.5rem;
}
</style>