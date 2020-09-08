<template>
  <div>
    <div class="home-page_wrapper">
      <PageHeader>
        <template v-slot:title>Things I Need To Do</template>
        <template v-slot:subtitle>
          <span>
            <i class="fas fa-info-circle" /> Add items to your list using the textbox below.
          </span>
          <Button variant="secondary" @on-click="handleAddRandom">Add Random</Button>
        </template>
      </PageHeader>
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
    <Snackbar :open="isLoading" />
  </div>
</template>

<script>
import AddItemForm from "../components/AddItemForm.vue";
import Button from "../components/Button.vue";
import PageHeader from "../components/PageHeader.vue";
import TodoItem from "../components/TodoItem.vue";
import Snackbar from "../components/Snackbar.vue";
import { getRandomTodos, getNewTodo } from "../services/TodoService";

export default {
  name: "HomePage",
  components: { AddItemForm, Button, PageHeader, TodoItem, Snackbar },
  data() {
    return {
      items: [],
      isLoading: false,
    };
  },
  watch: {
    items() {
      console.log(this.items);
    },
  },
  methods: {
    handleAddRandom() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.items = [...this.items, ...getRandomTodos(5)];
      }, 2000);
    },
    handleAddNewItem(value) {
      this.items.push(getNewTodo(value));
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
/* .container {
  position: relative;
  background-color: gray;
} */
.home-page_wrapper {
  max-width: 50rem;
  margin: 2rem auto 2rem auto;
}
.home-page_todo-item {
  margin: 1rem 0rem 1rem 0rem;
}
</style>