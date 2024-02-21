<template>
  <div class="add-contact__contacts"
  :style="{ 'margin-bottom: 25px': length[-1] }"
  :class="{ 'add-contact__contacts--active': length > 1 }">
    <label class="add-contact__label-select">
      <select class="add-contact__select" name="type-contact"
      v-model="reactiveSelectValue">
        <option value="phone">Телефон</option>
        <option value="additional-phone">Доп. тел.</option>
        <option value="Email">Email</option>
        <option value="Vk">Vk</option>
        <option value="Twitter">Twitter</option>
      </select>
    </label>
    <label class="add-contact__label-input"
    :class="{'add-contact__label-input--active-clear': reactiveInputValue.length > 0}">
      <input class="add-contact__input" type="text" name="contact-data-input"
      placeholder="Введите данные контакта" v-model="reactiveInputValue">
    </label>
    <button class="add-contact__clear-input btn-reset"
    @click="clearInput"
    v-show="reactiveInputValue.length > 0">
    </button>
  </div>
</template>

<script>
export default {
  props: ['length', 'selectValue', 'inputValue'],
  computed: {
    reactiveSelectValue: {
      get() {
        return this.selectValue;
      },
      set(val) {
        this.$emit('update:selectValue', val);
      },
    },
    reactiveInputValue: {
      get() {
        return this.inputValue;
      },
      set(val) {
        this.$emit('update:inputValue', val);
      },
    },
  },
  methods: {
    clearInput() {
      this.reactiveInputValue = '';
    },
  },
};
</script>
