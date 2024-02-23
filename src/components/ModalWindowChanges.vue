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
          v-model="secondName">
        </label>
        <label class="form__label">
          <span class="label__input-title">
            Имя*
          </span>
          <input type="text" id="input-secondname" class="label__input" name="first-name"
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
      <div class="add-contact__wrapper-contacts" v-show="contacts.length > 0"
      :class="{ 'add-contact__wrapper-contacts--active': contacts.length > 1 }">
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
    <div class="form__wrapper-btn-save">
      <button id="btn-save-contact" class="wrapper-btn-save__btn-save btn-reset"
      form="form"
      @click.prevent="change">
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
import ModalWindow from './ModalWindow.vue';
import ModalWindowAddBlock from './ModalWindowAddBlock.vue';
import AddContactSVG from './SVG components/AddContactSVG.vue';
import CloseModalSVG from './SVG components/CloseModalSVG.vue';

export default {
  data() {
    return {
      addBlocks: this.activeId.contacts,
      firstName: this.activeId.firstName,
      secondName: this.activeId.secondName,
      thirdName: this.activeId.thirdName,
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
    contacts() {
      return this.client.contacts;
    },
  },
  methods: {
    ...mapActions(useClientsStore, ['changeClient', 'deleteClient']),
    close() {
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

      this.close();
    },
    deleteItem(id) {
      this.deleteClient(id);
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
