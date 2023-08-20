<script>
import { mapStores } from 'pinia'
import useCategoriesStore from '@/stores/categories'
import useMaterialsStore from '@/stores/materials'
import useSeasonsStore from '@/stores/seasons'

export default {
  data() {
    return {
      categories: [],
      materials: [],
      seasons: [],
    }
  },
  computed: {
    ...mapStores(useCategoriesStore, useMaterialsStore, useSeasonsStore),
  },
  created() {
    this.categories = this.categoriesStore.categories
    this.materials = this.materialsStore.materials
    this.seasons = this.seasonsStore.seasons

    this.categoriesStore.$subscribe((mutation, state) => {
      this.categories = state.categories
    })

    this.materialsStore.$subscribe((mutation, state) => {
      this.materials = state.materials
    })

    this.seasonsStore.$subscribe((mutation, state) => {
      this.seasons = state.seasons
    })
  }
}
</script>

<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" value="0">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" value="12345">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category">
            <option value="value0">Все категории</option>
            <option v-for="(category, i) in categories" :value="`value${category.id}`">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material in materials">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="material" :value="material.code">
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="season in seasons">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="collection" :value="season.code">
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button">
        Сбросить
      </button>
    </form>
  </aside>
</template>