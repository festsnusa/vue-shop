<template>
  <RouterLink class="catalog__pic" :to="`/item/${id}`">
    <img :src="currentImage" alt="Название товара">
  </RouterLink>
</template>

<script>
export default {
  props: ["id", "products", "currentImage"],
}
</script>

<style lang="scss" scoped></style>