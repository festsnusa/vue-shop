<template>
  <main class="content container">
    <div class="content__top">
      <Breadcrumbs :category="category" :title="title" />
    </div>
    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="currentImage" alt="Название товара">
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="(image, i) in images" @click="changeCurrentImage(i)">
            <img class="pics__link" width="98" height="98" :src="image" alt="Название товара">
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: 150030</span>
        <h2 class="item__title">
          {{ title }}
        </h2>
        <div class="item__form">
          <form class="form" v-on:submit.prevent="onSubmit">
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
                        @click="changeCurrentImage(i)">
                      <span class="colors__value" :style="`background-color: ${item.color.code}`">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category" v-model="sizeId">
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
import Breadcrumbs from '@/components/Breadcrumbs.vue'

import { mapStores } from 'pinia';
import useProductsStore from '@/stores/products'
import useAccessKeyStore from '@/stores/accessKey'
import useBasketStore from '@/stores/basket'

export default {
  components: {
    ItemContent,
    ItemProperty,
    Breadcrumbs,
  },
  computed: {
    ...mapStores(useProductsStore),
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
      currentImage: "",
      colorId: "",
      sizeId: "",
      images: []
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
    },
    changeCurrentColor(id) {
      this.colorId = id
    },
    changeCurrentImage(index) {
      this.currentImage = this.currentProduct.colors[index].gallery[0].file.url
      console.log(this.currentImage)
      this.changeCurrentColor(this.currentProduct.colors[index].color.id)
    },
    onSubmit() {
      let accessKey = useAccessKeyStore().accessKey

      if (accessKey === "") {
        useAccessKeyStore().setAccessKey()
        let accessKey = useAccessKeyStore().accessKey
      }

      useBasketStore().addToBasket(accessKey, this.currentProduct.id, this.colorId, this.sizeId, this.itemsNum)
    }
  },
  created() {

    useProductsStore().setCurrentProduct(this.$route.params.id)

    this.productsStore.$subscribe((mutation, state) => {
      this.currentProduct = this.productsStore.currentProduct
      this.category = this.currentProduct.category.title
      this.title = this.currentProduct.title
      this.sizes = this.currentProduct.sizes
      this.sizeId = this.sizes[0].id
      this.colors = this.currentProduct.colors
      this.price = this.currentProduct.price
      this.total = this.price * this.itemsNum

      let location = this.currentProduct.colors[0].gallery === null ? this.currentProduct.colors[1].gallery[0] : this.currentProduct.colors[0].gallery[0]
      this.currentImage = location.file.url
      this.colorId = this.currentProduct.colors[0].color.id

      this.currentProduct.colors.map(color => {
        if (!color.gallery) return
        color.gallery.map(gallery => {
          this.images.push(gallery.file.url)
        })
      })
    })

  }
}
</script>

<style lang="scss" scoped>
.tabs__item {
  cursor: pointer;
}
</style>