import { defineStore } from 'pinia';

export default defineStore('categories', {
  state: () => {
    return {
      categories: [],
    };
  },
  actions: {
    async getCategories() {
      await fetch('https://vue-moire.skillbox.cc/api/productCategories')
        .then((response) => response.json())
        .then((data) => {
          this.categories = data.items;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
