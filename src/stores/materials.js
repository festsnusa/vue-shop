import { defineStore } from 'pinia';

export default defineStore('materials', {
  state: () => {
    return {
      materials: [],
    };
  },
  actions: {
    async getMaterials() {
      await fetch('https://vue-moire.skillbox.cc/api/materials')
        .then((response) => response.json())
        .then((data) => {
          this.materials = data.items;
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
