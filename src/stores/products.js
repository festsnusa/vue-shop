import { defineStore } from 'pinia';

export default defineStore('products', {
  state: () => {
    return {
      products: [],
      currentProduct: [],
    };
  },
  actions: {
    async setCurrentProduct(id) {
      await fetch(`https://vue-moire.skillbox.cc/api/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
          this.currentProduct = data;
          console.log(this.currentProduct);
        })
        .catch((error) => {
          console.error('Error:', error);
          return;
        });
    },
    async getProducts(query = '') {
      await fetch(`https://vue-moire.skillbox.cc/api/products${query}`)
        .then((response) => response.json())
        .then((data) => {
          this.products = data.items;
        })
        .catch((error) => {
          console.error('Error:', error);
          return;
        });
    },
    setFilter(minPrice, maxPrice, category, materials, seasons) {
      console.log(minPrice, maxPrice, category, materials, seasons);

      let queryArr = [];

      // price
      if (+maxPrice > 0 && +minPrice >= 0) {
        queryArr.push(`minPrice=${minPrice}&maxPrice=${maxPrice}`);
      }

      // category
      if (category > 0) {
        queryArr.push(`categoryId=${category}`);
      }

      // materials
      if (materials.length) {
        materials.map((id) => {
          queryArr.push(`materialIds[]=${id}`);
        });
      }
      // seasons
      if (seasons.length) {
        seasons.map((id) => {
          queryArr.push(`seasonIds[]=${id}`);
        });
      }

      this.getProducts(`?${queryArr.join('&')}`);
    },
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
