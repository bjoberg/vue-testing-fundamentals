<template>
  <div data-testid="add-item-form" class="add-item-form_wrapper">
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