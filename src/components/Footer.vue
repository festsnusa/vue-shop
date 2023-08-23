<script setup>
const links = [
  { "title": "Каталог", "link": "#" },
  { "title": "8 800 600 90 09", "link": "tel:88006009009" },
  { "title": "hi@technozavrrr.com", "link": "mailto:hi@technozavrrr.com" },
  { "title": "Распродажа", "link": "#" },
  { "title": "Заказать звонок", "link": "#" },
]
</script>

<template>
  <footer class="footer container">
    <div class="footer__wrapper">
      <ul class="footer__links">
        <li v-for="(item, index) in links" :key="index">
          <a class="footer__link" :href="item.link">
            {{ item.title }}
          </a>
        </li>
      </ul>

      <ul class="footer__social social">
        <li class="social__item">
          <a class="social__link" href="https://vk.com" aria-label="Вконтакте">
            <img class="social__img" src="@/assets/img/socials/vk.png" :alt="vk">
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="https://instagram.com" aria-label="instagram">
            <img class="social__img" src="@/assets/img/socials/instagram.png" :alt="instagram">
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="https://facebook.com" aria-label="facebook">
            <img class="social__img" src="@/assets/img/socials/facebook.png" :alt="facebook">
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="https://twitter.com" aria-label="twitter">
            <img class="social__img" src="@/assets/img/socials/twitter.png" :alt="twitter">
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="https://telegram.com" aria-label="telegram">
            <img class="social__img" src="@/assets/img/socials/telegram.png" :alt="telegram">
          </a>
        </li>
      </ul>

      <p class="footer__desc">
        Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются в&nbsp;соответствии
         с&nbsp;законодательством&nbsp;РФ,
        в&nbsp;том числе об&nbsp;авторском праве и&nbsp;смежных правах.
      </p>

      <ul class="footer__data">
        <li>
          <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
            Публичная оферта
          </a>
        </li>
      </ul>

      <span class="footer__copyright">
        © 2020 Moire
      </span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.social__img {
  width: 1.5rem;
}
</style>