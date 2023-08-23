<template>
  <li class="dictionary__item">
    <span class="dictionary__key">
      {{ key }}
    </span>
    <span class="dictionary__value">
      {{ value }}
    </span>
  </li>
</template>

<script>
export default {
  name: "DictionaryItem",
  props: ["key", "value"],
}
</script>