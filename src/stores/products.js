import { defineStore } from 'pinia';

export default defineStore('products', {
  state: () => {
    return {
      productsAll: [],
      productsFiltered: [],
      isFiltered: false,
    };
  },
  actions: {
    async getProducts() {
      await fetch('https://vue-moire.skillbox.cc/api/products')
        .then((response) => response.json())
        .then((data) => {
          this.productsAll = data.items;
        })
        .catch((error) => {
          console.error('Error:', error);
          return;
        });
    },
    setFilter(minPrice, maxPrice, category, materials, collections) {
      console.log(minPrice, maxPrice, category, materials, collections);

      if (+maxPrice < +minPrice) {
        this.isFiltered = false;
        return;
      }
      this.productsFiltered = this.productsAll.filter(
        (e) => e.price >= +minPrice && e.price <= +maxPrice
      );

      if (materials.length) {
        materials.forEach((id) => {
          this.productsFiltered = this.productsFiltered.filter((obj) =>
            obj.materials.some((material) => material.id === id)
          );
          // console.log(foundObjects);
        });
      }

      console.log(this.productsFiltered);
      this.isFiltered = true;
    },
    // hasMaterial(item, id) {
    //   return item.materials.some((material) => material.id === id);
    // },
    clearFilter() {
      this.isFiltered = false;
    },
  },
  // persist: true,
  persist: {
    storage: sessionStorage,
  },
});
