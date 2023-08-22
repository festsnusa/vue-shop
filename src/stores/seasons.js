import { defineStore } from 'pinia';

export default defineStore('page', {
  state: () => {
    return {
      seasons: [],
    };
  },
  actions: {
    async getSeasons() {
      await fetch('https://vue-moire.skillbox.cc/api/seasons')
        .then((response) => response.json())
        .then((data) => {
          this.seasons = data.items;
          window.location.reload();
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
