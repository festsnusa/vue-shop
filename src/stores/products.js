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
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
