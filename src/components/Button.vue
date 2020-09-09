<template>
  <div data-test-id="loading-button" class="button_root">
    <button class="button" :class="buttonVariant" :disabled="isDisabled" @click="handleOnClick">
      <span class="button_text">
        <slot />
      </span>
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