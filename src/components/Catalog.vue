<template>
  <section class="catalog">
    <ul class="catalog__list">
      <li class="catalog__item" v-for="product in products">
        <RouterLink class="catalog__pic" :to="`/item/${product.id}`">
          <img :src="product.currentImage" srcset="img/product-1@2x.jpg 2x" alt="Название товара">
        </RouterLink>

        <h3 class="catalog__title">
          <RouterLink to="/item/1">
            {{ product.title }}
          </RouterLink>
        </h3>

        <span class="catalog__price">
          {{ product.price }} ₽
        </span>

        <ul class="colors colors--black">
          <li class="colors__item" v-for="(item, i) in product.colors">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color-1" :value="`${item.color.code}`"
                :checked="i === 0 ? true : false" @click="changeCurrentImage(product.id, item.gallery)">
              <span class="colors__value" :style="`background-color: ${item.color.code}`">
              </span>
            </label>
          </li>
        </ul>
      </li>
    </ul>

    <!-- <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a class="pagination__link pagination__link--arrow pagination__link--disabled" aria-label="Предыдущая страница">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link pagination__link--current">
          1
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          2
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          3
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          4
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          ...
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link" href="#">
          10
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul> -->
  </section>
</template>

<script>
import { mapStores } from 'pinia';
import useProductsStore from '@/stores/products'
import useColorsStore from '@/stores/colors'

export default {
  computed: {
    ...mapStores(useProductsStore, useColorsStore)
  },
  data() {
    return {
      products: [],
      colors: [],
    }
  },
  methods: {
    changeCurrentImage(currentId, location) {
      // currentImage = location[0].file.url
      const foundObject = this.products.find(obj => obj.id === currentId)
      foundObject.currentImage = location[0].file.url
    }
  },
  created() {

    this.products = this.productsStore.products
    this.colors = this.colorsStore.colors
    this.productsStore.$subscribe((mutation, state) => {
      this.products = state.products
    })

    this.products.forEach(e => {

      let location = e.colors[0].gallery === null ? e.colors[1].gallery[0] : e.colors[0].gallery[0]
      e.currentImage = location.file.url
    })

    this.productsStore.$subscribe((mutation, state) => {
      this.colors = state.colors
    })

    // console.log(this.products.colors)
  }
}
</script>

<style lang="scss" scoped></style>