<template>
  <main class="content container">
    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          152 товара
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <Filter />
      <Catalog />
    </div>
  </main>
</template>

<script setup>
import Filter from '@/components/Filter.vue';
import Catalog from '@/components/Catalog.vue';
</script>