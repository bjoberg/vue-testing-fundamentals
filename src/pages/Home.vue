<template>
  <div class="home-page_wrapper">
    <PageHeader>
      <template v-slot:title>Things I Need To Do</template>
      <template v-slot:subtitle>
        <span>
          <i class="fas fa-info-circle" /> Add items to your list using the textbox below.
        </span>
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
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import AddItemForm from "../components/AddItemForm.vue";
import TodoItem from "../components/TodoItem.vue";

export default {
  name: "HomePage",
  components: { PageHeader, AddItemForm, TodoItem },
  data() {
    return {
      items: [],
    };
  },
  watch: {
    items() {
      console.log(this.items);
    },
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
    toggleIsEditingTodoByIndex(index) {
      this.items.splice(index, 1, {
        ...this.items[index],
        isEditing: !this.items[index].isEditing,
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