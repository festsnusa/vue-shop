<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <RouterLink class="breadcrumbs__link" to="/">
        Каталог
      </RouterLink>
    </li>
    <span v-show="category"> — </span>
    <a href="#" v-show="category">
      <li class="breadcrumbs__item">
        {{ category }}
      </li>
    </a>
    <span v-show="checkout"> — </span>
    <RouterLink to="/cart" v-show="checkout">
      <li class="breadcrumbs__item">
        Корзина
      </li>
    </RouterLink>
    <span> — </span>
    <li class="breadcrumbs__item">
      {{ title }}
    </li>
  </ul>
</template>

<script>
export default {
  props: ["category", "checkout", "title"],
  created() {
    // console.log(this.checkout)
    // console.log(this.title)
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}

.breadcrumbs {
  display: flex;
  gap: 0.75rem;
}
</style>