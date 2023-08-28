<template>
  <label class="form__label">
    <input v-if="type === 'tel'" class="form__input" type="tel" name="phone" :placeholder="placeholder"
      v-mask="'+7(###)-###-##-##'" @change="updateValue">
    <input v-else class="form__input" :type="type" :name="name" :placeholder="placeholder" @change="updateValue">
    <span class="form__value">{{ value }}</span>
    <span class="form__error" v-show="errorVisible">{{ errorMessage }}</span>
  </label>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: "Input",
  props: ["value", "name", "type", "placeholder", "errorMessage", "errorVisible"],
  directives: { mask },
  methods: {
    updateValue(e) {
      this.$emit('updateValue', e.target.name, e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped></style>