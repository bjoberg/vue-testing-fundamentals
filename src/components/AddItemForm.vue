<template>
  <div class="add-item-form_wrapper">
    <input type="text" class="add-item-form_input" placeholder="Add new item" v-model="inputValue" />
    <Button
      class="add-item-form_btn"
      variant="primary"
      :isDisabled="submitBtnDisabled"
      @on-click="addItem"
    >Add Item</Button>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "AddItemForm",
  components: { Button },
  data() {
    return {
      inputValue: "",
    };
  },
  computed: {
    submitBtnDisabled() {
      return this.inputValue === "";
    },
  },
  methods: {
    addItem() {
      this.$emit("on-add", this.inputValue);
      this.inputValue = "";
    },
  },
};
</script>

<style scoped>
.add-item-form_wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 2rem 0rem 2rem 0rem;
}
.add-item-form_input {
  flex-grow: 1;
  margin: 0rem 0.5rem 0rem 0rem;
}
.add-item-form_btn {
  margin: 0rem 0rem 0rem 0.5rem;
}
</style>