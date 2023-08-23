<template>
  <li class="dictionary__item">
    <span class="dictionary__key">
      {{ keyValue }}
    </span>
    <span class="dictionary__value">
      {{ value }}
    </span>
  </li>
</template>

<script>
export default {
  name: "DictionaryItem",
  props: ["keyValue", "value"],
  created() {
    console.log(this.keyValue)
    console.log(this.value)
  }
}
</script>