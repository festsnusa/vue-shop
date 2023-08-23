<template>
  <main class="content container">
    <div class="checkout" v-if="!orderIsProcessed">
      <div class="content__top">
        <Breadcrumbs :сheckout="true" title="Корзина" />
        <!-- <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="index.html">
              Каталог
            </a>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="cart.html">
              Корзина
            </a>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              Оформление заказа
            </a>
          </li>
        </ul>

        <div class="content__row">
          <h1 class="content__title">
            Оформление заказа
          </h1>
        </div> -->
      </div>

      <section class="cart" v-if="!orderIsProcessed">
        <form class="cart__form form" @submit.prevent>
          <div class="cart__field">
            <div class="cart__data">
              <Input value="ФИО" name="name" type="text" placeholder="Введите ваше полное имя" />
              <Input value="Адрес доставки" name="address" type="text" placeholder="Введите ваш адрес" />
              <Input value="Телефон" name="phone" type="tel" placeholder="Введите ваш телефон" />
              <Input value="Email" name="email" type="email" placeholder="Введи ваш Email" />
              <label class="form__label">
                <textarea class="form__input form__input--area" name="comments" placeholder="Ваши пожелания"></textarea>
                <span class="form__value">Комментарий к заказу</span>
              </label>
            </div>

            <div class="cart__options">
              <h3 class="cart__title">Доставка</h3>
              <ul class="cart__options options">
                <li class="options__item" v-for="(delivery, i) in deliveries">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="delivery" :value="delivery.id"
                      :checked="i === 0" @click="changeDelivery(delivery)">
                    <span class="options__value">
                      {{ delivery.title }}: <b>{{ setDeliveryPrice(delivery.price) }}</b>
                    </span>
                  </label>
                </li>
              </ul>

              <h3 class="cart__title">Оплата</h3>
              <ul class="cart__options options">
                <li class="options__item" v-for="(payment, i) in payments">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="pay" :value="payment.id" :checked="i === 0">
                    <span class="options__value">
                      {{ payment.title }}
                    </span>
                  </label>
                </li>
                <!-- <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                    <span class="options__value">
                      Наличными при получении
                    </span>
                  </label>
                </li> -->
              </ul>
            </div>
          </div>

          <div class="cart__block">
            <ul class="cart__orders">
              <li class="cart__order" v-for="item in items">
                <h3>{{ item.product.title }}</h3>
                <b> {{ item.price * item.quantity }}₽</b>
                <span>Артикул: 150030</span>
              </li>
            </ul>

            <div class="cart__total">
              <p>Доставка: <b>бесплатно</b></p>
              <p>Итого: <b>{{ computeItemsCount }}</b> на сумму <b>{{ totalPrice }} ₽</b></p>
            </div>

            <button class="cart__button button button--primery">
              Оформить заказ
            </button>
          </div>
          <div class="cart__error form__error-block" v-show="errorOccured">
            <h4>Заявка не отправлена!</h4>
            <p>
              Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
            </p>
          </div>
        </form>
      </section>
    </div>

    <Result v-else />
  </main>
</template>

<script>
import Result from '@/components/Result.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Input from '@/components/Input.vue'
import useAccessKeyStore from '@/stores/accessKey'
import useBasketStore from '@/stores/basket'
import useDeliveriesStore from '@/stores/deliveries'
import usePaymentsStore from '@/stores/payments'

import { mapStores } from 'pinia'

export default {
  components: {
    Result,
    Breadcrumbs,
    Input,
  },
  data() {
    return {
      orderIsProcessed: false,
      deliveries: [],
      currentDelivery: "",
      items: [],
      totalPrice: 0,
      errorOccured: false,
      payments: [],
      currentPayment: [],
    }
  },
  computed: {
    ...mapStores(useBasketStore, useDeliveriesStore, usePaymentsStore),
    computeItemsCount() {
      const itemsLength = this.items.length
      const arr = [2, 3, 4]
      return itemsLength === 0 ? "0"
        : itemsLength === 1 ? "1 товар"
          : arr.includes(itemsLength) ? `${itemsLength} товара`
            : `${itemsLength} товаров`
    }
  },
  methods: {
    viewResult() {
      this.orderIsProcessed = true
    },
    changeDelivery(delivery) {
      this.currentDelivery = delivery
      console.log(this.currentDelivery)
      this.updatePayments()
    },
    setDeliveryPrice(price) {
      return price === '0' ? "Бесплатно" : `${price} ₽`
    },
    updatePayments() {
      usePaymentsStore().getPayments(this.currentDelivery.id)
    },
    calculateTotal() {

      this.totalPrice = 0

      this.items.map(item => {
        this.totalPrice += item.price * item.quantity
      })
    }
  },
  created() {
    useDeliveriesStore().getDeliveries()

    this.deliveriesStore.$subscribe((mutation, state) => {
      this.deliveries = state.deliveries
      this.currentDelivery = this.deliveries[0]
      this.updatePayments()
    })

    this.paymentsStore.$subscribe((mutation, state) => {
      this.payments = state.payments
    })

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

<style lang="scss" scoped></style>