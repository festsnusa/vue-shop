import { defineStore } from 'pinia';

export default defineStore('accessKey', {
  state: () => {
    return {
      accessKey: '',
    };
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
