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

import { mapActions } from 'pinia';
import useColorsStore from '@/stores/colors'
import useProductsStore from '@/stores/products'
import useBasketStore from '@/stores/basket'
import useAccessKeyStore from '@/stores/accessKey'
import useMaterialsStore from '@/stores/materials'
import useCategoriesStore from '@/stores/categories'
import useSeasonsStore from '@/stores/seasons'

// import { setAccessKey, getBaskets, getColors, getMaterials, getCategories, getSeasons, getProducts } from '@/includes/helper'

export default {
  components: {
    Filter,
    Catalog,
  },
  computed: {
    ...mapActions(useColorsStore, useProductsStore, useBasketStore, useMaterialsStore, useCategoriesStore, useSeasonsStore, useAccessKeyStore),
  },
  async beforeCreate() {

    if (useAccessKeyStore().accessKey === "") {
      useAccessKeyStore().setAccessKey()
    }

    if (!useColorsStore().colors.length) {
      useColorsStore().getColors()
    }

    // if (!useProductsStore().products.length) {
    useProductsStore().getProducts()
    // }

    if (!useMaterialsStore().materials.length) {
      useMaterialsStore().getMaterials()
    }

    if (!useCategoriesStore().categories.length) {
      useCategoriesStore().getCategories()
    }

    if (!useSeasonsStore().seasons.length) {
      useSeasonsStore().getSeasons()
    }

    useBasketStore().getBaskets(useAccessKeyStore().accessKey)
    // console.log(this.productsStore.products)

  }
}

</script>