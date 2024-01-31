<template>
  <div class="add-contact__contacts"
  :style="{ 'margin-bottom: 25px': length[-1] }"
  :class="{ 'add-contact__contacts--active': length > 1 }">
    <label class="add-contact__label-select">
      <select class="add-contact__select">
        <option value="0" :selected="true" :disabled="true">Тип связи</option>
        <option value="phone">Телефон</option>
        <option value="additional-phone">Доп. тел.</option>
        <option value="email">Email</option>
        <option value="vk">Vk</option>
        <option value="twitter">Twitter</option>
      </select>
    </label>
    <label class="add-contact__label-input"
    :class="{'add-contact__label-input--active-clear': currentValueInput.length > 0}">
      <input class="add-contact__input" type="text" name="data-input"
      placeholder="Введите данные контакта" v-model="currentValueInput">
    </label>
    <button class="add-contact__clear-input btn-reset"
    @click="clearInput"
    v-show="currentValueInput.length > 0">
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentValueInput: '',
    };
  },
  props: ['length'],
  methods: {
    clearInput() {
      this.currentValueInput = '';
    },
  },
};
</script>
