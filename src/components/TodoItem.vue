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

<style scoped>
.todo-item_wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.todo-item_content {
  flex-grow: 1;
  margin: 0rem 0.5rem 0rem 0.5rem;
}
.todo-item_content--complete {
  text-decoration: line-through;
}
.todo-item_input {
  margin: 0rem 0.5rem 0rem 0.5rem;
}
.todo-item_btn--edit {
  margin: 0rem 0.5rem 0rem 0.5rem;
}
.todo-item_btn--remove {
  margin: 0rem 0rem 0rem 0.5rem;
}
</style>