<template>
  <ModalWindow>
    <div class="modal__header">
      <h3 class="modal__title">
        Изменить данные
      </h3>
      <span class="modal__id-title">
        ID: {{ client.id }}
      </span>
      <button class="btn-reset" @click="close">
        <span class="close" id="close">
          <CloseModalSVG/>
        </span>
      </button>
    </div>
    <form id="form" class="form form__modal">
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
      <div class="add-contact__wrapper-contacts" v-show="copyContacts.length > 0"
      :class="{ 'add-contact__wrapper-contacts--active': copyContacts.length > 1 }">
        <ModalWindowAddBlock v-for="contact in addBlocks" :key="contact"
        :length="addBlocks.length"
        v-model:select-value="contact.selectValue"
        v-model:input-value="contact.inputValue"/>
      </div>

      <button class="add-contact__add-btn btn-reset"
      @click.prevent="pushAddBlock">
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
      form="form"
      @click.prevent="checkForm">
        Сохранить
      </button>
    </div>
    <button id="btn-cancel-contact" class="btns__btn-cancel btn-reset"
    style="width: 100px;"
    @click.prevent="deleteItem(client.id)">
      Удалить клиента
    </button>
  </ModalWindow>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useClientsStore } from '@/stores/clientsData';
import cloneDeep from 'lodash.clonedeep';
import ModalWindow from './ModalWindow.vue';
import ModalWindowAddBlock from './ModalWindowAddBlock.vue';
import AddContactSVG from './SVG components/AddContactSVG.vue';
import CloseModalSVG from './SVG components/CloseModalSVG.vue';

export default {
  data() {
    return {
      errors: {},
      addBlocks: this.activeId.contacts,
      firstName: this.activeId.firstName,
      secondName: this.activeId.secondName,
      thirdName: this.activeId.thirdName,

      copyClient: cloneDeep(this.activeId),
    };
  },
  props: ['activeId'],
  components: {
    ModalWindow,
    ModalWindowAddBlock,
    AddContactSVG,
    CloseModalSVG,
  },
  computed: {
    ...mapState(useClientsStore, ['clientsData']),
    client() {
      return this.clientsData.find((item) => item.id === this.activeId.id);
    },
    copyContacts() {
      return this.client.contacts;
    },
  },
  methods: {
    checkForm() {
      if (this.firstName && this.secondName) {
        this.change();
      }

      if (!this.firstName) {
        this.errors.errorFirstName = 'Требуется указать имя';
      }

      if (!this.secondName) {
        this.errors.errorSecondName = 'Требуется указать фамилию';
      }
    },
    ...mapActions(useClientsStore, ['changeClient', 'deleteClient', 'initialContacts']),
    close() {
      this.initialContacts(this.activeId.id, this.copyClient.contacts);
      this.$emit('closeModalChanges');
    },
    closeWithSaving() {
      this.$emit('closeModalChanges');
    },
    change() {
      this.changeClient(
        this.activeId.id,
        this.firstName,
        this.secondName,
        this.thirdName,
        this.addBlocks,
      );

      this.closeWithSaving();
    },
    deleteItem(id) {
      this.deleteClient(id);
      this.closeWithSaving();
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
