<template>
  <main class="content container">
    <div class="checkout">
      <div class="content__top">
        <Breadcrumbs :сheckout="currentDelivery" title="Оформление заказа" />
      </div>

      <section class="cart">
        <div class="cart__form form">
          <div class="cart__field">
            <div class="cart__data">
              <Input @updateValue="updateInputValue" value="ФИО" name="name" type="text"
                placeholder="Введите ваше полное имя" errorMessage="Необходимо заполнить ФИО"
                :errorVisible="fullNameError" />
              <Input @updateValue="updateInputValue" value="Адрес доставки" name="address" type="text"
                placeholder="Введите ваш адрес" errorMessage="Необходимо заполнить адрес"
                :errorVisible="fullAddressError" />
              <Input @updateValue="updateInputValue" value="Телефон" name="phone" type="tel"
                placeholder="Введите ваш телефон" errorMessage="Необходимо заполнить номер телефона"
                :errorVisible="phoneNumberError" />
              <Input @updateValue="updateInputValue" value="Email" name="email" type="email" placeholder="Введи ваш Email"
                errorMessage="Необходимо заполнить адрес электронной почты" :errorVisible="emailError" />
              <label class="form__label">
                <textarea class="form__input form__input--area" name="comments" placeholder="Ваши пожелания"
                  v-model="commentText"></textarea>
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
                    <input class="options__radio sr-only" type="radio" name="pay" :value="payment.id" :checked="i === 0"
                      @click="changePayment(payment)">
                    <span class="options__value">
                      {{ payment.title }}
                    </span>
                  </label>
                </li>
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
              <p>{{ currentDelivery.title }}: <b>{{ setDeliveryPrice(currentDelivery.price) }}</b>
              </p>
              <p>Итого: <b>{{ computeItemsCount }}</b> на сумму <b>{{ totalPrice }} ₽</b></p>
            </div>

            <button class="cart__button button button--primery" @click="onSubmit">
              Оформить заказ
            </button>
          </div>
          <div class="cart__error form__error-block" v-show="errorOccured" :key="errorOccured">
            <h4>Заявка не отправлена!</h4>
            <p>
              Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
            </p>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Input from '@/components/Input.vue'
import useAccessKeyStore from '@/stores/accessKey'
import useBasketStore from '@/stores/basket'
import useDeliveriesStore from '@/stores/deliveries'
import usePaymentsStore from '@/stores/payments'
import useOrderStore from '@/stores/order'

import { mapStores } from 'pinia'

export default {
  components: {
    Breadcrumbs,
    Input,
  },
  data() {
    return {
      deliveries: [],
      currentDelivery: "",
      items: [],
      totalPrice: 0,
      errorOccured: false,
      payments: [],
      currentPayment: [],
      fullName: "",
      fullAddress: "",
      phoneNumber: "",
      emailAddress: "",
      commentText: "",
      accessKey: "",
      fullNameError: false,
      fullAddressError: false,
      phoneNumberError: false,
      emailError: false,
    }
  },
  computed: {
    ...mapStores(useBasketStore, useDeliveriesStore, usePaymentsStore, useOrderStore),
    computeItemsCount() {
      const itemsLength = this.items.length
      const arr = [2, 3, 4]
      return itemsLength === 0 ? "0"
        : itemsLength === 1 ? "1 товар"
          : arr.includes(itemsLength) ? `${itemsLength} товара`
            : `${itemsLength} товаров`
    },
  },
  methods: {
    updateInputValue(inputEl, newValue) {
      if (inputEl === 'name') {
        this.fullName = newValue
      } else if (inputEl === 'address') {
        this.fullAddress = newValue
      } else if (inputEl === 'phone') {
        this.phoneNumber = newValue
      } else if (inputEl === 'email') {
        this.emailAddress = newValue
      }
    },
    viewResult(orderId) {
      this.$router.push({ name: 'checkoutId', params: { id: orderId } })
    },
    changeDelivery(delivery) {
      this.currentDelivery = delivery
      this.updatePayments()
    },
    changePayment(payment) {
      this.currentPayment = payment
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
    },
    isEmailValidated() {
      let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
      return regex.test(this.emailAddress)
    },
    isFieldsChecked() {

      let fieldsChecked = true

      if (this.fullName === '') {
        this.fullNameError = true
        fieldsChecked = false
      } else { this.fullNameError = false }

      if (this.fullAddress === '') {
        this.fullAddressError = true
        fieldsChecked = false
      } else { this.fullAddressError = false }

      if (this.phoneNumber.length < 17) {
        this.phoneNumberError = true
        fieldsChecked = false
      } else { this.phoneNumberError = false }

      if (!this.isEmailValidated()) {
        this.emailError = true
        fieldsChecked = false
      } else { this.emailError = false }

      return fieldsChecked
    },
    onSubmit() {
      if (!this.isFieldsChecked()) return
      useOrderStore().placeOrder(this.accessKey, this.fullName, this.fullAddress, this.phoneNumber, this.emailAddress, this.currentDelivery.id, this.currentPayment.id, this.commentText)
    },
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
      this.currentPayment = this.payments[0]
    })

    this.accessKey = useAccessKeyStore().accessKey

    if (this.accessKey === "") {
      useAccessKeyStore().setAccessKey()
      this.accessKey = useAccessKeyStore().accessKey
    }

    useBasketStore().getBasket(this.accessKey)

    this.basketStore.$subscribe((mutation, state) => {
      this.items = state.basket
      this.calculateTotal()
    })

    // watch status
    this.status = "200"
    this.orderStore.$subscribe((mutation, state) => {
      this.status = state.status

      if (this.status == 200) {
        this.viewResult(state.order.id)
      } else {
        this.errorOccured = true
      }
    })

  }
}
</script>

<style lang="scss" scoped></style>