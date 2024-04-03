<template>
  <ModalWindow>
    <div class="modal__header">
      <h3 class="modal__title">
        Новый клиент
      </h3>
      <span class="modal__id-title">
        ID: {{ newClientId }}
      </span>
      <button class="btn-reset" @click="close">
        <span class="close" id="close">
          <CloseModalSVG/>
        </span>
      </button>
    </div>
    <form id="form" class="form form__modal" method="post"
    @submit.prevent="checkForm">
      <div class="form__inputs">
        <label class="form__label">
          <span class="label__input-title">
            Фамилия*
          </span>
          <input type="text" id="input-firstname" class="label__input" name="second-name"
          :class="{ 'error-border': errors.errorSecondName && secondName === '' }"
          v-model="secondName">
        </label>
        <label class="form__label">
          <span class="label__input-title">
            Имя*
          </span>
          <input type="text" id="input-secondname" class="label__input" name="first-name"
          :class="{ 'error-border': errors.errorFirstName && firstName === '' }"
          v-model="firstName">
        </label>
        <label class="form__label">
          <span class="label__input-title">
            Отчество
          </span>
          <input type="text" id="input-thirdname" class="label__input" name="third-name"
          v-model="thirdName">
        </label>
      </div>
    </form>
    <div id="form__add-contact" class="form__add-contact">
      <div class="add-contact__wrapper-contacts" v-show="addBlocks.length > 0"
        :class="{ 'add-contact__wrapper-contacts--active': addBlocks.length > 1 }">
        <ModalWindowAddBlock
        v-for="block in addBlocks" :key="block"
        v-model:length="addBlocks.length"
        v-model:select-value="block.selectValue"
        v-model:input-value="block.inputValue"/>
      </div>

      <button class="add-contact__add-btn btn-reset" :disabled="addBlocks.length === 10"
      :class="{ 'add-contact__add-btn--disabled': addBlocks.length === 10 }"
      @click="pushAddBlock">
        <AddContactSVG/>
        Добавить контакт
      </button>
    </div>

    <div class="errors-block">
      <p class="error-block" v-if="errors.errorSecondName">
        {{ errors.errorSecondName }}
      </p>

      <p class="error-block" v-if="errors.errorFirstName">
        {{ errors.errorFirstName }}
      </p>
    </div>

    <div class="form__wrapper-btn-save">
      <button id="btn-save-contact" class="wrapper-btn-save__btn-save btn-reset"
      form="form" @click="checkForm">
        Сохранить
      </button>
    </div>
    <button id="btn-cancel-contact" class="btns__btn-cancel btn-reset"
    @click="close">
      Отмена
    </button>
  </ModalWindow>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useClientsStore } from '@/stores/clientsData';
import idCreation from '@/helpers/idCreation';
import ModalWindow from './ModalWindow.vue';
import ModalWindowAddBlock from './ModalWindowAddBlock.vue';
import AddContactSVG from './SVG components/AddContactSVG.vue';
import CloseModalSVG from './SVG components/CloseModalSVG.vue';

export default {
  data() {
    return {
      errors: {},
      addBlocks: [],
      firstName: '',
      secondName: '',
      thirdName: '',
    };
  },
  emits: ['closeModalAdd'],
  props: ['clients'],
  components: {
    ModalWindow,
    ModalWindowAddBlock,
    AddContactSVG,
    CloseModalSVG,
  },
  computed: {
    ...mapState(useClientsStore, ['clientsData']),
    newClientId() {
      return idCreation(this.clientsData, true);
    },
  },
  methods: {
    ...mapActions(useClientsStore, ['addClient']),
    checkForm() {
      if (this.firstName && this.secondName) {
        this.add();
      }

      if (!this.firstName) {
        this.errors.errorFirstName = 'Требуется указать имя';
      }

      if (!this.secondName) {
        this.errors.errorSecondName = 'Требуется указать фамилию';
      }
    },
    close() {
      this.$emit('closeModalAdd');
    },
    add() {
      this.addClient(
        this.firstName,
        this.secondName,
        this.thirdName,
        this.addBlocks,
      );

      this.close();
    },
    pushAddBlock() {
      this.addBlocks.push({
        block: ModalWindowAddBlock,
        selectValue: 'phone',
        inputValue: '',
      });
    },
  },
};
</script>
