<template>
  <main class="content container">
    <div class="content__top">
      <Breadcrumbs title="Оформление заказа" />
      <h1 class="content__title">
        Заказ оформлен <span>№ {{ basket.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <DictionaryItem keyValue="Получатель" :value="basket.name" />
            <DictionaryItem keyValue="Адрес доставки" :value="basket.address" />
            <DictionaryItem keyValue="Телефон" :value="basket.phone" />
            <DictionaryItem keyValue="Email" :value="basket.email" />
            <DictionaryItem keyValue="Способ оплаты" :value="basket.paymentType" />
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in items">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.quantity * item.price }} ₽</b>
              <span>Артикул: 150030</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>{{ basket.deliveryType.title }}: <b>{{ basket.deliveryType.price }}</b> ₽</p>
            <p>Итого: <b>{{ computeItemsCount }}</b> на сумму <b>{{ totalPrice }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapStores } from 'pinia'
import useOrderStore from "@/stores/order"

import DictionaryItem from '@/components/DictionaryItem.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

export default {
  components: { DictionaryItem, Breadcrumbs },
  computed: {
    ...mapStores(useOrderStore),
    computeItemsCount() {
      const itemsLength = this.items.length
      const arr = [2, 3, 4]
      return itemsLength === 0 ? "0"
        : itemsLength === 1 ? "1 товар"
          : arr.includes(itemsLength) ? `${itemsLength} товара`
            : `${itemsLength} товаров`
    },
  },
  data() {
    return {
      items: [],
      basket: [],
      totalPrice: 0,
    }
  },
  methods: {
    calculateTotal() {

      this.totalPrice = +this.basket.deliveryType.price

      this.items.map(item => {
        this.totalPrice += item.price * item.quantity
      })
    },
  },
  created() {

    this.basket = useOrderStore().order
    this.items = this.basket.basket.items
    this.calculateTotal()

    if (this.$route.params.id != this.basket.id) {
      this.$router.push({ name: 'home' })
    }

    this.orderStore.$subscribe((mutation, state) => {
      this.basket = state.order
      this.items = state.order.basket.items
      this.calculateTotal()
    })
  }
}
</script>

<style lang="scss" scoped></style>