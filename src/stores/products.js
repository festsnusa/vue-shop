import { defineStore } from 'pinia';

export default defineStore('products', {
  state: () => {
    return {
      products: [],
    };
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
