<template>
  <div class="todo-item_wrapper">
    <input
      class="todo-item_input"
      type="checkbox"
      :value="id"
      :checked="isComplete"
      @change="handleOnToggleComplete"
      :disabled="isEditing"
    />
    <p
      v-if="!isEditing"
      class="todo-item_content"
      :class="[isComplete ? 'todo-item_content--complete': '']"
    >{{value}}</p>
    <input v-else class="todo-item_content" type="text" v-model="itemValue" />
    <button
      class="todo-item_btn--edit secondary_btn"
      @click="handleOnClickEdit"
      :disabled="isComplete"
    >{{editButtonText}}</button>
    <button
      class="todo-item_btn--remove error_btn"
      @click="handleOnClickRemove"
      :disabled="isEditing"
    >Remove</button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    value: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      itemValue: this.value,
    };
  },
  computed: {
    editButtonText() {
      return this.isEditing ? "Save" : "Edit";
    },
  },
  methods: {
    handleOnClickEdit() {
      if (this.isEditing) this.$emit("on-edit", this.id, this.itemValue);
      this.isEditing = !this.isEditing;
    },
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