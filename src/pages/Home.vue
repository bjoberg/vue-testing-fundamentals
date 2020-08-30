<template>
  <div class="home-page_wrapper">
    <h1>Things I Need To Do</h1>
    <AddItemForm @on-add="handleAddNewItem" />
    <TodoItem
      class="home-page_todo-item"
      v-for="(item, index) in items"
      :key="index"
      :value="item.value"
      :isComplete="item.isComplete"
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
  watch: {
    items() {
      console.log(this.items);
    },
  },
  methods: {
    handleAddNewItem(value) {
      this.items.push({
        id: Math.random(),
        value,
        isComplete: false,
      });
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