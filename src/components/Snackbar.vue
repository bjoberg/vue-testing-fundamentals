<template>
  <div v-if="open" class="snackbar_wrapper">
    <slot>Loading...</slot>
  </div>
</template>

<script>
export default {
  name: "Snackbar",
  props: {
    open: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>