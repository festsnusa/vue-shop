<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a :class="`pagination__link pagination__link--arrow ${page === 1 ? 'pagination__link--disabled' : ''}'`"
        aria-label="Предыдущая страница" @click="prev">
        <img class="prev" src="@/assets/img/svg/icon-arrow-bottom.svg" alt="arrow">
      </a>
    </li>
    <template v-if="totalPages > displayedPages[displayedPages.length - 2] && firstPage > 1">
      <li class=" pagination__item" @click="setIndex(1)">
        <a class="pagination__link pagination__link--current">
          1
        </a>
      </li>
      <div v-if="firstPage > 2">...</div>
    </template>
    <li class=" pagination__item" v-for="num in displayedPages" :key="`pagination-item-${num}`" @click="setIndex(num)">
      <a class="pagination__link pagination__link--current">
        {{ num }}
      </a>
    </li>
    <template v-if="totalPages > displayedPages[displayedPages.length - 1]">
      <div v-if="lastPage < totalPages - 1">...</div>
      <li class=" pagination__item" @click="setIndex(totalPages)">
        <a class="pagination__link pagination__link--current">
          {{ totalPages }}
        </a>
      </li>
    </template>
    <li class="pagination__item">
      <a :class="`pagination__link pagination__link--arrow ${page === totalPages ? 'pagination__link--disabled' : ''}`"
        href="#" aria-label="Следующая страница" @click="next">
        <img class="next" src="@/assets/img/svg/icon-arrow-bottom.svg" alt="arrow">
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  props: ["totalPages", "updatePageNum"],
  data() {
    return {
      page: 1,
      maxVisibleButtons: 8,
    }
  },
  computed: {
    firstPage() {
      return Math.max(this.page - (this.page === this.totalPages ? 2 : 1), 1)
    },
    lastPage() {
      return Math.min(this.page + (this.page === 1 ? 2 : 1), this.totalPages)
    },
    displayedPages() {
      if (this.totalPages <= this.maxVisibleButtons || this.page > this.totalPages) {
        return this.totalPages
      }

      return Array.from(
        { length: this.lastPage - this.firstPage + 1 },
        (_, index) => index + this.firstPage
      );
    }
  },
  methods: {
    prev() {
      this.page = Math.max(this.page - 1, 1)
      this.updateNum()
    },
    next() {
      this.page = Math.min(this.page + 1, this.totalPages)
      this.updateNum()
    },
    setIndex(num) {
      this.page = num
      this.updateNum()
    },
    updateNum() {
      this.$emit('updatePageNum', this.page)
    }
  },

}
</script>

<style lang="scss" scoped>
.prev,
.next {
  position: relative;
  bottom: 4px;
}

.prev {
  transform: rotate(90deg);

}

.next {
  transform: rotate(-90deg);
}

.pagination__link {
  cursor: pointer;
}
</style>