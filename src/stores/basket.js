import { defineStore } from 'pinia';

export default defineStore('basket', {
  state: () => {
    return {
      basket: [],
    };
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
