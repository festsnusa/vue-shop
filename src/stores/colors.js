import { defineStore } from 'pinia';

export default defineStore('colors', {
  state: () => {
    return {
      colors: [],
    };
  },
  actions: {
    async getColors() {
      await fetch('https://vue-moire.skillbox.cc/api/colors')
        .then((response) => response.json())
        .then((data) => {
          this.colors = data.items;
          window.location.reload();
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
