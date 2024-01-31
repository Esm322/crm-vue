<template>
  <div class="modal">
    <div class="modal-content">
      <slot>
        <div class="modal__header">
          <h3 class="modal__title">
            Новый клиент
          </h3>
          <span class="modal__id-title">
            ID: 123458
          </span>
          <button class="btn-reset" @click="close">
            <span class="close" id="close">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
              xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2332
                1.73333L15.2665 0.766664L8.49985 7.53336L1.73318 0.766696L0.766515
                1.73336L7.53318 8.50003L0.766542 15.2667L1.73321 16.2333L8.49985
                9.46669L15.2665 16.2334L16.2332 15.2667L9.46651 8.50003L16.2332
                1.73333Z" fill="#B0B0B0"/>
              </svg>
            </span>
          </button>
        </div>
        <form id="form" class="form">
          <div class="form__inputs">
            <label class="form__label">
              <span class="label__input-title">
                Фамилия*
              </span>
              <input type="text" id="input-firstname" class="label__input">
            </label>
            <label class="form__label">
              <span class="label__input-title">
                Имя*
              </span>
              <input type="text" id="input-secondname" class="label__input">
            </label>
            <label class="form__label">
              <span class="label__input-title">
                Отчество
              </span>
              <input type="text" id="input-thirdname" class="label__input">
            </label>
          </div>
        </form>
        <div id="form__add-contact" class="form__add-contact">
          <div class="add-contact__wrapper-contacts" v-show="addBlocks.length > 0"
            :class="{ 'add-contact__wrapper-contacts--active': addBlocks.length > 1 }">
            <ModalWindowAddBlock
            v-for="block in addBlocks" :key="block"
            :length="addBlocks.length"/>
          </div>

          <button class="add-contact__add-btn btn-reset"
          @click="pushAddBlock">
            <svg class="add-btn__svg" width="14" height="14" viewBox="0 0 14 14"
            fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.99998 3.66665C6.63331 3.66665 6.33331 3.96665 6.33331
              4.33331V6.33331H4.33331C3.96665 6.33331 3.66665 6.63331 3.66665
              6.99998C3.66665 7.36665 3.96665 7.66665 4.33331
              7.66665H6.33331V9.66665C6.33331 10.0333 6.63331 10.3333
              6.99998 10.3333C7.36665 10.3333 7.66665 10.0333 7.66665
              9.66665V7.66665H9.66665C10.0333 7.66665 10.3333 7.36665
              10.3333 6.99998C10.3333 6.63331 10.0333 6.33331 9.66665
              6.33331H7.66665V4.33331C7.66665 3.96665 7.36665 3.66665
              6.99998 3.66665ZM6.99998 0.333313C3.31998 0.333313
              0.333313 3.31998 0.333313 6.99998C0.333313 10.68
              3.31998 13.6666 6.99998 13.6666C10.68 13.6666
              13.6666 10.68 13.6666 6.99998C13.6666 3.31998
              10.68 0.333313 6.99998 0.333313ZM6.99998 12.3333C4.05998
              12.3333 1.66665 9.93998 1.66665 6.99998C1.66665 4.05998
              4.05998 1.66665 6.99998 1.66665C9.93998 1.66665 12.3333 4.05998
              12.3333 6.99998C12.3333 9.93998 9.93998 12.3333 6.99998
              12.3333Z" fill="#9873FF"/>
            </svg>
            Добавить контакт
          </button>
        </div>
        <div class="form__wrapper-btn-save">
          <button id="btn-save-contact" class="wrapper-btn-save__btn-save btn-reset"
          form="form">
            Сохранить
          </button>
        </div>
        <button id="btn-cancel-contact" class="btns__btn-cancel btn-reset"
        @click="close">
          Отмена
        </button>
      </slot>
    </div>
  </div>
</template>

<script>
import ModalWindowAddBlock from './ModalWindowAddBlock.vue';

export default {
  data() {
    return {
      addBlocks: [],
    };
  },
  components: {
    ModalWindowAddBlock,
  },
  methods: {
    pushAddBlock() {
      this.addBlocks.push({
        block: ModalWindowAddBlock,
      });
    },
    close() {
      this.$emit('close');
      this.addBlocks = [];
    },
  },
};
</script>
