<script setup>
const links = [
  { "title": "Каталог", "link": "#" },
  { "title": "8 800 600 90 09", "link": "tel:88006009009" },
  { "title": "hi@technozavrrr.com", "link": "mailto:hi@technozavrrr.com" },
  { "title": "Распродажа", "link": "#" },
  { "title": "Заказать звонок", "link": "#" },
]

const socials = [
  { "title": "vk", "label": "Вконтакте", "link": "https://vk.com" },
  { "title": "instagram", "label": "Инстаграм", "link": "https://instagram.com" },
  { "title": "facebook", "label": "Facebook", "link": "https://facebook.com" },
  { "title": "twitter", "label": "Twitter", "link": "https://twitter.com" },
  { "title": "telegram", "label": "Telegram", "link": "https://web.telegram.org/" },
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
        <li class="social__item" v-for="(item, index) in socials" :key="index">
          <a class="social__link" :href="item.link" :aria-label="item.label">
            <img class="social__img" :src="`/src/assets/img/socials/${item.title}.png`" :alt="item.label">
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