<script>
import { mapStores } from 'pinia';
import useBasketStore from "@/stores/basket"
import useAccessKeyStore from "@/stores/accessKey"

import CartItem from "@/components/CartItem.vue"
import Breadcrumbs from "@/components/Breadcrumbs.vue"

export default {
  data() {
    return {
      items: [],
      totalPrice: 0,
    }
  },
  components: {
    CartItem,
    Breadcrumbs,
  },
  computed: {
    ...mapStores(useBasketStore),
    computeItemsCount() {
      const itemsLength = this.items.length
      const arr = [2, 3, 4]
      return itemsLength === 0 ? "Нет выбранных товаров"
        : itemsLength === 1 ? "1 товар"
          : arr.includes(itemsLength) ? `${itemsLength} товара`
            : `${itemsLength} товаров`
    }
  },
  methods: {
    redirectToCheckout() {
      if (this.totalPrice === 0) {
        alert("В корзине пусто!")
        return
      }

      this.$router.push({ name: 'checkout' })
    },
    calculateTotal() {

      this.totalPrice = 0

      this.items.map(item => {
        this.totalPrice += item.price * item.quantity
      })
    }
  },
  created() {

    let accessKey = useAccessKeyStore().accessKey

    if (accessKey === "") {
      useAccessKeyStore().setAccessKey()
      accessKey = useAccessKeyStore().accessKey
    }

    useBasketStore().getBasket(accessKey)

    this.basketStore.$subscribe((mutation, state) => {
      this.items = state.basket
      this.calculateTotal()
    })
  }
}
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <Breadcrumbs title="Корзина" />

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{ computeItemsCount }}
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" @submit.prevent>
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in items" :item="item" :key="items" />
          </ul>
        </div>

        <div class="cart__block" v-show="items.length">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price" :key="totalPrice">
            Итого: <span>{{ totalPrice }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit" @click="redirectToCheckout">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>