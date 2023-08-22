<template>
  <label class="check-list__label">
    <input class="check-list__check sr-only" type="checkbox" name="material" v-model="checked"
      @change="checkItem(item.id, checked)">
    <span class="check-list__desc">
      {{ item.title }}
      <span>({{ item.productsCount }})</span>
    </span>
  </label>
</template>

<script>
export default {
  props: ["item", "checkItem"],
  data() {
    return {
      checked: false,
    }
  },
}
</script>