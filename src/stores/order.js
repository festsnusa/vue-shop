import { defineStore } from 'pinia';

export default defineStore('order', {
  state: () => {
    return {
      order: [],
    };
  },
  actions: {
    async placeOrder(
      accessKey,
      name,
      address,
      phone,
      email,
      deliveryTypeId,
      paymentTypeId,
      comment
    ) {
      const url = 'https://vue-moire.skillbox.cc/api/orders';
      const data = new URLSearchParams();
      data.append('name', name);
      data.append('address', address);
      data.append('phone', phone);
      data.append('email', email);
      data.append('deliveryTypeId', deliveryTypeId);
      data.append('paymentTypeId', paymentTypeId);
      data.append('comment', comment);

      const headers = {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: data,
      };

      try {
        const response = await fetch(
          `${url}?userAccessKey=${accessKey}`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Response data:', responseData);
        this.order = responseData;
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
