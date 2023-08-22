import { defineStore } from 'pinia';

export default defineStore('deliveries', {
  state: () => {
    return {
      deliveries: [],
    };
  },
  actions: {
    async getDeliveries() {
      await fetch('https://vue-moire.skillbox.cc/api/deliveries')
        .then((response) => response.json())
        .then((data) => {
          this.deliveries = data;
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
