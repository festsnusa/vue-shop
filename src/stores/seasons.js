import { defineStore } from 'pinia';

export default defineStore('seasons', {
  state: () => {
    return {
      seasons: [],
    };
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
