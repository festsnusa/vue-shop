import { defineStore } from 'pinia';

export default defineStore('basket', {
  state: () => {
    return {
      basket: [],
    };
  },
  actions: {
    async getBaskets(accessKey) {
      await fetch(
        `https://vue-moire.skillbox.cc/api/baskets?userAccessKey=${accessKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.basket = data.items;
        })
        .catch((error) => {
          console.error('Error:', error);
          return;
        });
    },
    async addToBasket(accessKey, productId, colorId, sizeId, quantity) {
      const url = `https://vue-moire.skillbox.cc/api/baskets/products?userAccessKey=${accessKey}`;
      const headers = {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const body = `productId=${productId}&colorId=${colorId}&sizeId=${sizeId}&quantity=${quantity}`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: body,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
          return false;
        }

        const data = await response.json();
        return data; // You can do something with the response data here
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
