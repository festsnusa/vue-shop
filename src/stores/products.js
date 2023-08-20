import { defineStore } from 'pinia';

export default defineStore('products', {
  state: () => {
    return {
      products: [],
    };
  },
  actions: {
    async getProducts() {
      await fetch('https://vue-moire.skillbox.cc/api/products')
        .then((response) => response.json())
        .then((data) => {
          this.products = data.items;
        })
        .catch((error) => {
          console.error('Error:', error);
          return;
        });
    },
    setFilter(minPrice, maxPrice, category, materials, collections) {
      console.log(minPrice, maxPrice, category, materials, collections);
      this.products = this.products.filter(
        (e) => e.price >= +minPrice && e.price <= +maxPrice
      );
      console.log(this.products);
    },
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
