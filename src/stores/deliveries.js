import { defineStore } from 'pinia';

export default defineStore('deliveries', {
  state: () => {
    return {
      deliveries: [],
    };
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
