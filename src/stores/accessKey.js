import { defineStore } from 'pinia';

export default defineStore('accessKey', {
  state: () => {
    return {
      accessKey: '',
    };
  },
  actions: {
    async setAccessKey() {
      await fetch('https://vue-moire.skillbox.cc/api/users/accessKey')
        .then((response) => response.json())
        .then((data) => {
          this.accessKey = data.accessKey;
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
