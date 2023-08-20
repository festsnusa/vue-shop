<template>
  <main class="content container">
    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          152 товара
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <Filter />
      <Catalog />
    </div>
  </main>
</template>

<script>
import Filter from '@/components/Filter.vue';
import Catalog from '@/components/Catalog.vue';

import { mapStores } from 'pinia';
import useColorsStore from '@/stores/colors'
import useProductsStore from '@/stores/products'
import useBasketStore from '@/stores/basket'
import useAccessKeyStore from '@/stores/accessKey'
import useMaterialsStore from '@/stores/materials'
import useCategoriesStore from '@/stores/categories'
import useSeasonsStore from '@/stores/seasons'

export default {
  components: {
    Filter,
    Catalog,
  },
  computed: {
    ...mapStores(useColorsStore, useProductsStore, useBasketStore, useMaterialsStore, useCategoriesStore, useSeasonsStore, useAccessKeyStore),
  },
  methods: {
    async getAccessKey() {
      await fetch("https://vue-moire.skillbox.cc/api/users/accessKey")
        .then(response => response.json())
        .then(data => {
          this.accessKeyStore.accessKey = data.items
        })
        .catch(error => {
          console.error('Error:', error);
          return
        })
    },
    async getBaskets() {
      await fetch(`https://vue-moire.skillbox.cc/api/baskets?userAccessKey=${this.accessKeyStore.accessKey}`)
        .then(response => response.json())
        .then(data => {
          this.basketStore.basket = data.items
          console.log(this.basketStore.basket)
        })
        .catch(error => {
          console.error('Error:', error);
          return
        })
    },
    async getColors() {
      await fetch("https://vue-moire.skillbox.cc/api/colors")
        .then(response => response.json())
        .then(data => {
          this.colorsStore.colors = data.items
        })
        .catch(error => {
          console.error('Error:', error);
          return
        })
    },
    async getMaterials() {
      await fetch("https://vue-moire.skillbox.cc/api/materials")
        .then(response => response.json())
        .then(data => {
          this.materialsStore.materials = data.items
        })
        .catch(error => {
          console.error('Error:', error);
          return
        })
    },
    async getCategories() {
      await fetch("https://vue-moire.skillbox.cc/api/productCategories")
        .then(response => response.json())
        .then(data => {
          this.categoriesStore.categories = data.items
        })
        .catch(error => {
          console.error('Error:', error);
          return
        })
    },
    async getSeasons() {
      await fetch("https://vue-moire.skillbox.cc/api/seasons")
        .then(response => response.json())
        .then(data => {
          this.seasonsStore.seasons = data.items
        })
        .catch(error => {
          console.error('Error:', error);
          return
        })
    },
    async getProducts() {
      await fetch("https://vue-moire.skillbox.cc/api/products")
        .then(response => response.json())
        .then(data => {
          this.productsStore.products = data.items
        })
        .catch(error => {
          console.error('Error:', error);
          return
        })
    }

  },
  created() {

    if (this.accessKeyStore.accessKey === "") {
      this.getAccessKey()
    }

    if (!this.colorsStore.colors.length) {
      this.getColors()
    }

    if (!this.productsStore.products.length) {
      this.getProducts()
    }

    if (!this.materialsStore.materials.length) {
      this.getMaterials()
    }

    if (!this.categoriesStore.categories.length) {
      this.getCategories()
    }

    if (!this.seasonsStore.seasons.length) {
      this.getSeasons()
    }

    this.getBaskets()
    console.log(this.seasonsStore.seasons)

  }
}

</script>