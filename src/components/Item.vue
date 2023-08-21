<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" to="/">
            Каталог
          </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          {{ category }}
        </li>
        <li class="breadcrumbs__item">
          {{ title }}
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" src="img/product-square-1.jpg" srcset="img/product-square-1@2x.jpg 2x"
            alt="Название товара">
        </div>
        <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" src="@/assets/img/product-square-2.jpg" srcset="img/product-square-2@2x.jpg 2x"
                alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="@/assets/img/product-square-3.jpg" srcset="img/product-square-3@2x.jpg 2x"
                alt="Название товара">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: 150030</span>
        <h2 class="item__title">
          {{ title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click="changeCount('-')">
                  -
                </button>

                <input type="text" :value="itemsNum" name="count" readonly>

                <button type="button" aria-label="Добавить один товар" @click="changeCount('+')">
                  +
                </button>
              </div>

              <b class="item__price">
                {{ total }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="(item, i) in colors">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color-1" :value="`${item.color.code}`"
                        @click="changeCurrentImage(item.id, i)">
                      <span class="colors__value" :style="`background-color: ${item.color.code}`">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category">
                    <option :value="size.id" v-for="size in sizes">{{ size.title }}</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li :class="`tabs__item tabs__link ${index === 0 ? 'tabs__link--current' : ''}`" @click="index = 0">
            Информация о товаре
          </li>
          <li :class="`tabs__item tabs__link ${index === 1 ? 'tabs__link--current' : ''}`" @click="index = 1">
            Доставка и возврат
          </li>
        </ul>

        <ItemContent v-if="index === 0" />
        <ItemProperty v-else />
      </div>
    </section>
  </main>
</template>

<script>
import ItemContent from '@/components/ItemContent.vue';
import ItemProperty from '@/components/ItemProperty.vue';

import { mapStores } from 'pinia';
import useProductsStore from '@/stores/products'

export default {
  components: {
    ItemContent,
    ItemProperty,
  },
  computed: {
    ...mapStores(useProductsStore)
  },
  data() {
    return {
      category: "",
      title: "",
      index: 0,
      currentProduct: [],
      category: '',
      sizes: [],
      colors: [],
      price: 0,
      itemsNum: 1,
      total: 0,
    }
  },
  methods: {
    changeCount(operation) {
      if (operation === "-") {
        this.itemsNum--
        if (this.itemsNum <= 0) {
          this.itemsNum = 1
        }
      } else { this.itemsNum++ }

      this.changeTotal()
    },
    changeTotal() {
      this.total = this.price * this.itemsNum
    }
  },
  created() {

    useProductsStore().setCurrentProduct(this.$route.params.id)

    this.productsStore.$subscribe((mutation, state) => {
      this.currentProduct = this.productsStore.currentProduct
      this.category = this.currentProduct.category.title
      this.title = this.currentProduct.title
      this.sizes = this.currentProduct.sizes
      this.colors = this.currentProduct.colors
      this.price = this.currentProduct.price
      this.total = this.price * this.itemsNum
      console.log(this.currentProduct)
    })

  }
}
</script>

<style lang="scss" scoped></style>