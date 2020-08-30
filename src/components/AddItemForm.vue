<template>
  <div class="add-item-form_wrapper">
    <input type="text" class="add-item-form_input" placeholder="Add new item" v-model="inputValue" />
    <button class="add-item-form_btn" @click="addItem">Add Item</button>
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
      this.inputValue = "";
    },
  },
};
</script>

<style>
.add-item-form_wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  max-width: 50rem;
  margin: 2rem auto 2rem auto;
}
.add-item-form_input {
  flex-grow: 1;
  margin: 0rem 0.5rem 0rem 0rem;
}
.add-item-form_btn {
  margin: 0rem 0rem 0rem 0.5rem;
}
</style>