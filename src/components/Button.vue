<template>
  <div data-test-id="loading-button" class="root">
    <button class="button" :class="buttonVariant" :disabled="isDisabled" @click="handleOnClick">
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    variant: {
      type: String,
      default: "primary",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonVariant() {
      switch (this.variant) {
        case "primary":
          return "primary_btn";
        case "secondary":
          return "secondary_btn";
        case "error":
          return "error_btn";
        default:
          return "primary_btn";
      }
    },
  },
  methods: {
    handleOnClick() {
      this.$emit("on-click");
    },
  },
};
</script>

<style scoped>
.root {
  display: flex;
  align-items: center;
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
  color: #b9b9b9;
  border: 1px solid #b9b9b9;
  cursor: not-allowed;
}
</style>