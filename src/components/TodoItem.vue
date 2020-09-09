<template>
  <div class="todo-item_wrapper">
    <input
      class="todo-item_input"
      type="checkbox"
      :checked="isComplete"
      @change="handleOnToggleComplete"
    />
    <p class="todo-item_content" :class="{'todo-item_content--complete': isComplete}">{{value}}</p>
    <Button class="todo-item_btn--remove" variant="error" @on-click="handleOnClickRemove">Remove</Button>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "TodoItem",
  components: { Button },
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleOnClickRemove() {
      this.$emit("on-remove", this.id);
    },
    handleOnToggleComplete() {
      this.$emit("on-toggle-complete", this.id);
    },
  },
};
</script>