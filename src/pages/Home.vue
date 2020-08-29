<template>
  <div>
    <h1>Here is what you need to do today!</h1>
    <AddItemForm @on-add="handleAddNewItem" />
    <div v-for="(item, index) in items" :key="index">{{item.value}}</div>
  </div>
</template>

<script>
import AddItemForm from "../components/AddItemForm.vue";
export default {
  name: "HomePage",
  components: { AddItemForm },
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
      });
    },
  },
};
</script>

<style>
</style>