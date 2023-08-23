<template>
  <label class="form__label">
    <input v-if="type === 'tel'" class="form__input" type="tel" :name="tel" :placeholder="placeholder"
      v-mask="'+7(###)-###-##-##'">
    <input v-else class="form__input" :type="type" :name="name" :placeholder="placeholder">
    <span class="form__value">{{ value }}</span>
  </label>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: "Input",
  props: ["value", "name", "type", "placeholder"],
  directives: { mask },
  data() {
    return {
      isError: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>