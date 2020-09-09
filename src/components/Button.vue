<template>
  <button class="button" :class="buttonVariant" :disabled="isDisabled" @click="handleOnClick">
    <span class="button_text">
      <slot>Button</slot>
    </span>
  </button>
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