<template>
  <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">Каталог</span>

      <RouterLink class="header__logo" to="/">
        <img src="../assets/img/svg/logo-moire.svg" alt="Логотип интернет магазина Moire" width="116" height="34">
      </RouterLink>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>

      <RouterLink to="/cart" aria-label="Корзина с товарами">
        <img src="@/assets/img/cart.png" alt="cart">
        <span class="header__count" aria-label="Количество товаров">{{ itemsCount }}</span>
      </RouterLink>
    </div>
  </header>
</template>

<script>
import { mapStores } from 'pinia';
import useBasketStore from "@/stores/basket"

export default {
  data() {
    return {
      itemsCount: 0,
    }
  },
  computed: {
    ...mapStores(useBasketStore)
  },
  created() {

    this.itemsCount = this.basketStore.itemsCount
    this.basketStore.$subscribe((mutation, state) => {
      this.itemsCount = state.itemsCount
    })
  }
}
</script>