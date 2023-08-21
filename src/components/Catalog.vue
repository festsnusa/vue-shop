<template>
  <section class="catalog">
    <ul class="catalog__list">
      <li class="catalog__item" v-for="(product, i) in products">
        <CatalogImage :id="product.id" :products="products" :currentImage="setCurrentImage(product.id)" />

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
                @click="changeCurrentImage(product.id, i)">
              <span class="colors__value" :style="`background-color: ${item.color.code}`">
              </span>
            </label>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapStores } from 'pinia';
import useProductsStore from '@/stores/products'
import useColorsStore from '@/stores/colors'
import CatalogImage from '@/components/CatalogImage.vue'

export default {
  computed: {
    ...mapStores(useProductsStore, useColorsStore)
  },
  components: {
    CatalogImage,
  },
  data() {
    return {
      products: [],
      colors: [],
    }
  },
  methods: {
    setCurrentImage(id) {
      const foundObject = this.products.find(obj => obj.id === id)

      if (foundObject.currentImage !== undefined) {
        return foundObject.currentImage
      }

      if (foundObject.colors[0].gallery === null) {
        return ""
      }
      return foundObject.colors[0].gallery[0].file.url
    },
    changeCurrentImage(currentId, index) {
      const foundObject = this.products.find(obj => obj.id === currentId)
      foundObject.currentImage = foundObject.colors[index].gallery[0].file.url
      console.log(foundObject.currentImage)
    },
  },
  created() {

    this.products = this.productsStore.productsAll
    this.colors = this.colorsStore.colors

    this.productsStore.$subscribe((mutation, state) => {
      if (state.isFiltered) {
        this.products = this.productsStore.productsFiltered
      } else {
        this.products = this.productsStore.productsAll
      }
    })

    this.products.forEach(e => {

      let location = e.colors[0].gallery === null ? e.colors[1].gallery[0] : e.colors[0].gallery[0]
      e.currentImage = location.file.url
    })

    this.productsStore.$subscribe((mutation, state) => {
      this.colors = state.colors
    })
  }
}
</script>

<style lang="scss" scoped></style>