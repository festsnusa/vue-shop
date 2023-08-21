<script>
import useCategoriesStore from '@/stores/categories'
import useMaterialsStore from '@/stores/materials'
import useSeasonsStore from '@/stores/seasons'
import useProductsStore from '@/stores/products'
import Checkbox from "@/components/Checkbox.vue"

export default {
  components: {
    Checkbox,
  },
  data() {
    return {
      categories: [],
      materials: [],
      seasons: [],
      floorPrice: 0,
      ceilPrice: 100,
      currentCategory: 0,
      checkedMaterials: [],
      checkedCollections: [],
    }
  },
  methods: {
    checkMaterials(id, checked) {
      let itemIncluded = this.checkedMaterials.includes(id)

      if (!checked && itemIncluded) {
        this.checkedMaterials = this.checkedMaterials.filter(e => e !== id)
      }
      else if (checked && !itemIncluded) {
        this.checkedMaterials.push(id)
      }
    },
    checkCollections(id, checked) {
      let itemIncluded = this.checkedCollections.includes(id)

      if (!checked && itemIncluded) {
        this.checkedCollections = this.checkedCollections.filter(e => e !== id)
      }
      else if (checked && !itemIncluded) {
        this.checkedCollections.push(id)
      }
    },
    setFilter() {
      useProductsStore().setFilter(this.floorPrice, this.ceilPrice, this.currentCategory, this.checkedMaterials, this.checkedCollections)
    },
    clearFilter() {
      useProductsStore().getProducts()
    },
    handleBeforeUnload() {
      this.getProducts()
    }
  },
  created() {
    this.categories = useCategoriesStore().categories
    this.materials = useMaterialsStore().materials

    this.materials.forEach(e => {
      e.checked = false
    })
    this.seasons = useSeasonsStore().seasons
  },
  mounted() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
}
</script>

<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model="floorPrice">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model="ceilPrice">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category" v-model="currentCategory">
            <option value="0" selected>Все категории</option>
            <option v-for="(category, i) in categories" :value="category.id" :key="categories">{{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material in materials">
            <Checkbox :item="material" :checkItem="checkMaterials" />
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="season in seasons">
            <Checkbox :item="season" :checkItem="checkCollections" />
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit" @click.prevent="setFilter">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="clearFilter">
        Сбросить
      </button>
    </form>
  </aside>
</template>