<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="setImage(item)" width="120" height="120" srcset="img/product-square-4@2x.jpg 2x" alt="Название товара">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="`background-color: ${item.color.color.code}`"></i>
        {{ colors[(item.color.color.title).toLowerCase()] }}
      </span>
    </p>
    <span class="product__code">
      Артикул: 1501230
    </span>

    <div class="product__counter form__counter">
      <button @click="changeQuantity('-')">-</button>
      <input type="text" v-model="quantity" name="count" readonly>

      <button @click="changeQuantity('+')">+</button>
    </div>

    <b class=" product__price">
      {{ price }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
export default {
  props: ["item", "updateTotalPrice"],
  data() {
    return {
      quantity: this.item.quantity,
      price: this.item.price * this.item.quantity,
      colors: {
        "red": "Красный",
        "blue": "Синий",
        "green": "Зеленый",
        "yellow": "Желтый",
        "purple": "Фиолетовый",
        "pink": "Розовый",
        "black": "Черный",
        "white": "Белый",
      }
    }
  },
  methods: {
    setImage(item) {
      return (item.color.gallery === null) ? "/src/assets/img/not-available.png" : item.color.gallery[0].file.url
    },
    changeQuantity(operation) {
      // if (operation === "-") {
      //   this.quantity--
      //   if (this.quantity <= 0) this.quantity = 1
      // } else {
      //   this.quantity++
      // }

      // this.changePrice()
    },
    changePrice() {
      // this.price = this.item.price * this.quantity
      // this.updateTotalPrice(this.item.id)
    },
  }
}
</script>

<style lang="scss" scoped></style>