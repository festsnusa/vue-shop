import { defineStore } from 'pinia';

export default defineStore('colors', {
  state: () => {
    return {
      colors: [],
    };
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
