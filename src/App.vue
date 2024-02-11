<template>
  <header class="header">
    <div class="container header__container">
      <a href="index.html" class="header__logo">
        <img src="img/logo-1024.svg" alt="CRM skb." class="logo-svg">
      </a>
      <form class="form header__form" id="header-form">
        <label class="form__label">
          <input class="form__input" id="header-input" type="text" placeholder="Введите запрос">
        </label>
      </form>
    </div>
  </header>

  <router-view :key="$route.fullPath"/>

  <footer></footer>
</template>
