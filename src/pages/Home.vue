<template>
  <div class="home-page_wrapper">
    <h1>Things I Need To Do</h1>
    <AddItemForm @on-add="handleAddNewItem" />
    <TodoItem
      class="home-page_todo-item"
      v-for="(item, index) in items"
      :key="index"
      :id="item.id"
      :value="item.value"
      :isComplete="item.isComplete"
      :isEditing="item.isEditing"
      @on-save="handleSaveItem"
      @on-toggle-edit="handleToggleEditItem"
      @on-remove="handleRemoveItem"
      @on-toggle-complete="handleToggleItemIsComplete"
    />
  </div>
</template>

<script>
import AddItemForm from "../components/AddItemForm.vue";
import TodoItem from "../components/TodoItem.vue";

export default {
  name: "HomePage",
  components: { AddItemForm, TodoItem },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    handleAddNewItem(value) {
      this.pushNewTodo(value);
    },
    handleSaveItem(id, value) {
      const index = this.getIndexByTodoId(id);
      this.items.splice(index, 1, {
        ...this.items[index],
        value: value,
      });
      this.toggleIsEditingTodoByIndex(index);
    },
    handleToggleEditItem(id) {
      const index = this.getIndexByTodoId(id);
      this.toggleIsEditingTodoByIndex(index);
    },
    handleRemoveItem(id) {
      this.removeTodoById(id);
    },
    handleToggleItemIsComplete(id) {
      const index = this.getIndexByTodoId(id);
      this.items.splice(index, 1, {
        ...this.items[index],
        isComplete: !this.items[index].isComplete,
      });
    },
    toggleIsEditingTodoByIndex(index) {
      this.items.splice(index, 1, {
        ...this.items[index],
        isEditing: !this.items[index].isEditing,
      });
    },
    pushNewTodo(value) {
      const id = Date.now();
      const isComplete = false;
      const isEditing = false;
      this.items.push({ id, value, isComplete, isEditing });
    },
    removeTodoById(id) {
      const index = this.getIndexByTodoId(id);
      this.items.splice(index, 1);
    },
    getIndexByTodoId(id) {
      return this.items.findIndex((item) => item.id === id);
    },
  },
};
</script>

<style>
.home-page_wrapper {
  max-width: 50rem;
  margin: 2rem auto 2rem auto;
}
.home-page_todo-item {
  margin: 1rem 0rem 1rem 0rem;
}
</style>