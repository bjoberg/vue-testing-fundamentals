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
      if (this.variant === "secondary") return "secondary_btn";
      if (this.variant === "error") return "error_btn";
      return "primary_btn";
    },
  },
  methods: {
    handleOnClick() {
      this.$emit("on-click");
    },
  },
};
</script>