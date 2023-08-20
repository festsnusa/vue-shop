import { defineStore } from 'pinia';

export default defineStore('basket', {
  state: () => {
    return {
      basket: [],
    };
  },
  actions: {
    async getBaskets(accessKey) {
      await fetch(
        `https://vue-moire.skillbox.cc/api/baskets?userAccessKey=${accessKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.basket = data.items;
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
