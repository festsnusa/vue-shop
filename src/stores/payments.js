import { defineStore } from 'pinia';

export default defineStore('payments', {
  state: () => {
    return {
      payments: [],
    };
  },
  actions: {
    async getPayments(deliveryId) {
      await fetch(
        `https://vue-moire.skillbox.cc/api/payments?deliveryTypeId=${deliveryId}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.payments = data;
          console.log(data);
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
