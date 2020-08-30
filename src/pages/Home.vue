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
    pushNewTodo(value) {
      const id = Date.now();
      const isComplete = false;
      this.items.push({ id, value, isComplete });
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