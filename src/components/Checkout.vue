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
        <form class="cart__form form" @submit.prevent="viewResult" method="POST">
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
                <li class="options__item" v-for="delivery in deliveries">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked=""
                      @click="changeDelivery(delivery)">
                    <span class="options__value">
                      {{ delivery.title }}: <b>{{ setDeliveryPrice(delivery.price) }}</b>
                    </span>
                  </label>
                </li>
              </ul>

              <h3 class="cart__title">Оплата</h3>
              <ul class="cart__options options">
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="pay" value="card" checked="">
                    <span class="options__value">
                      Картой при получении
                    </span>
                  </label>
                </li>
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                    <span class="options__value">
                      Наличными при получении
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div class="cart__block">
            <ul class="cart__orders">
              <li class="cart__order">
                <h3>Смартфон Xiaomi Redmi Note 7 Pro 6/128GB</h3>
                <b>990 ₽</b>
                <span>Артикул: 150030</span>
              </li>
            </ul>

            <div class="cart__total">
              <p>Доставка: <b>бесплатно</b></p>
              <p>Итого: <b>3</b> товара на сумму <b>4 070 ₽</b></p>
            </div>

            <button class="cart__button button button--primery" type="submit">
              Оформить заказ
            </button>
          </div>
          <div class="cart__error form__error-block">
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
import useDeliveriesStore from '@/stores/deliveries'

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
    }
  },
  computed: {
    ...mapStores(useDeliveriesStore)
  },
  methods: {
    viewResult() {
      this.orderIsProcessed = true
    },
    changeDelivery(delivery) {
      this.currentDelivery = delivery
      console.log(this.currentDelivery)
    },
    setDeliveryPrice(price) {
      return price === '0' ? "Бесплатно" : `${price} ₽`
    }
  },
  created() {
    useDeliveriesStore().getDeliveries()

    this.deliveriesStore.$subscribe((mutation, state) => {
      this.deliveries = state.deliveries
      this.currentDelivery = this.deliveries[0]
    })

  }
}
</script>

<style lang="scss" scoped></style>