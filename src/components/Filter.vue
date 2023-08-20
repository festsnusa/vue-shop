<script>
import useCategoriesStore from '@/stores/categories'
import useMaterialsStore from '@/stores/materials'
import useSeasonsStore from '@/stores/seasons'

export default {
  data() {
    return {
      categories: [],
      materials: [],
      seasons: [],
      floorPrice: 0,
      ceilPrice: 100,
      currentCategory: 0,
      checkedMaterials: [],
    }
  },
  methods: {
    checkMaterial(material) {
      checkedMaterials.push(material)
    },
    setFilter() {

    },
    clearFilter() {

    }
  },
  created() {
    console.log(useSeasonsStore().seasons)
    this.categories = useCategoriesStore().categories
    this.materials = useMaterialsStore().materials

    this.materials.forEach(e => {
      e.checked = false
    })
    this.seasons = useSeasonsStore().seasons
  }
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
            <option v-for="(category, i) in categories" :value="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material in materials">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="material" :value="material.code"
                @click="checkMaterial(material)">
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

      <button class="filter__submit button button--primery" type="submit" @click.prevent="setFilter">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="clearFilter">
        Сбросить
      </button>
    </form>
  </aside>
</template>