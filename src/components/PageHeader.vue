<template>
  <header>
    <h1>
      <slot name="title" />
    </h1>
    <h5>
      <slot name="subtitle" />
    </h5>
  </header>
</template>

<script>
export default {
  name: "PageHeader",
};
</script>