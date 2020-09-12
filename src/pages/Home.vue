<template>
  <div>
    <div class="home-page_wrapper">
      <PageHeader>
        <template v-slot:title>Things I Need To Do</template>
        <template v-slot:subtitle>
          <span>
            <i class="fas fa-info-circle" /> Add items to your list using the textbox below.
          </span>
        </template>
      </PageHeader>
      <Button
        variant="secondary"
        @on-click="handleAddRandom"
        :isDisabled="pageIsLoading"
      >Add {{numRandomItemsToAdd}} Random</Button>
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
    <Snackbar :open="pageIsLoading">Adding todos...</Snackbar>
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
      pageIsLoading: false,
      numRandomItemsToAdd: 3,
    };
  },
  methods: {
    async handleAddRandom() {
      this.pageIsLoading = true;
      const randTodos = await getRandomTodos(this.numRandomItemsToAdd);
      this.items = [...this.items, ...randTodos];
      this.pageIsLoading = false;
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