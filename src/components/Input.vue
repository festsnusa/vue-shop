<template>
  <label class="form__label">
    <input class="form__input" :type="type" :name="name" :placeholder="placeholder">
    <span class="form__value">{{ value }}</span>
    <span class="form__error" v-if="type === 'tel'">Неверный формат телефона</span>
  </label>
</template>

<script>
export default {
  name: "Input",
  props: ["value", "name", "type", "placeholder"],
}
</script>

<style lang="scss" scoped></style>