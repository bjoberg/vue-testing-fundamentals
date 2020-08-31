<template>
  <div class="todo-item_wrapper">
    <input
      class="todo-item_input"
      type="checkbox"
      :checked="isComplete"
      @change="handleOnToggleComplete"
    />
    <p class="todo-item_content" :class="[isComplete ? 'todo-item_content--complete': '']">{{value}}</p>
    <button class="todo-item_btn--remove error_btn" @click="handleOnClickRemove">Remove</button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    id: {
      type: Number,
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

<style>
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