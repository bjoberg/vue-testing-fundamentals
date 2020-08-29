<template>
  <div class="add-item-form_wrapper">
    <span>New item:</span>
    <input type="text" aria-label="add-item-form_input" v-model="inputValue" />
    <button @click="addItem">Add</button>
  </div>
</template>

<script>
export default {
  name: "AddItemForm",
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    addItem() {
      this.$emit("on-add", this.inputValue);
    },
  },
};
</script>

<style>
.add-item-from_wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
}
</style>