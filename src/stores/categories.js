import { defineStore } from 'pinia';

export default defineStore('categories', {
  state: () => {
    return {
      categories: [],
    };
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
