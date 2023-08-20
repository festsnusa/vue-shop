import { defineStore } from 'pinia';

export default defineStore('materials', {
  state: () => {
    return {
      materials: [],
    };
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
