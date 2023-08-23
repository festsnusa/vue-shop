import { defineStore } from 'pinia';

export default defineStore('basket', {
  state: () => {
    return {
      basket: [],
      itemsCount: 0,
    };
  },
  actions: {
    async getBasket(accessKey) {
      await fetch(
        `https://vue-moire.skillbox.cc/api/baskets?userAccessKey=${accessKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.basket = data.items;
          this.updateItemsCount(data.items.length);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    async updateBasketProduct(accessKey, itemId, quantity) {
      const url = 'https://vue-moire.skillbox.cc/api/baskets/products';

      const requestBody = new URLSearchParams();
      requestBody.append('basketItemId', itemId);
      requestBody.append('quantity', quantity);

      const headers = {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const requestOptions = {
        method: 'PUT',
        headers: headers,
        body: requestBody,
      };

      const fullUrl = `${url}?userAccessKey=${accessKey}`;

      try {
        const response = await fetch(fullUrl, requestOptions);
        const data = await response.json();
        if (data.error) {
          alert(`Ошибка. Код: ${data.error.code}; ${data.error.message}`);
          console.error(data.error);
          window.location.reload();
          return;
        }

        this.basket = data.items;
      } catch (error) {
        alert(`Ошибка: ${error}`);
      }
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
        this.updateItemsCount(data.items.length);
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async deleteBasketProduct(accessKey, itemId) {
      const url = `https://vue-moire.skillbox.cc/api/baskets/products?userAccessKey=${accessKey}`;
      const headers = {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const data = new URLSearchParams();
      data.append('basketItemId', itemId);

      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: headers,
          body: data.toString(),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            `API error: ${responseData.message || response.statusText}`
          );
        } else {
          console.log(responseData);
          this.basket = responseData.items;
        }
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    },

    updateItemsCount(itemsCount) {
      this.itemsCount = itemsCount;
    },
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
