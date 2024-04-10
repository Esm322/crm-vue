<template>
  <ModalWindow>
    <div class="modal__header">
      <h3 class="modal__title">
        Изменить данные
      </h3>
      <span class="modal__id-title">
        ID: {{ activeId.client.id }}
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
          :class="{ 'error-border': errors.errorSecondName && activeClient.secondName === '' }"
          v-model="activeClient.secondName">
        </label>
        <label class="form__label">
          <span class="label__input-title">
            Имя*
          </span>
          <input type="text" id="input-secondname" class="label__input" name="first-name"
          :class="{ 'error-border': errors.errorFirstName && activeClient.firstName === '' }"
          v-model="activeClient.firstName">
        </label>
        <label class="form__label">
          <span class="label__input-title">
            Отчество
          </span>
          <input type="text" id="input-thirdname" class="label__input" name="third-name"
          v-model="activeClient.thirdName">
        </label>
      </div>
    </form>
    <div id="form__add-contact" class="form__add-contact">
      <div class="add-contact__wrapper-contacts" v-show="copyContacts.length > 0"
      :class="{ 'add-contact__wrapper-contacts--active': copyContacts.length > 1 }">
        <ModalWindowAddBlock v-for="contact in activeClient.addBlocks" :key="contact"
        :length="activeClient.addBlocks.length"
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
    @click.prevent="deleteActiveClient(client.id)">

    Удалить клиента
  </button>
</ModalWindow>
</template>

<script setup>
import {
  reactive,
  computed,
  inject,
} from 'vue';
import cloneDeep from 'lodash.clonedeep';
import useCheckForm from '@/composables/useCheckForm';
import ModalWindow from './ModalWindow.vue';
import ModalWindowAddBlock from './ModalWindowAddBlock.vue';
import AddContactSVG from './SVG components/AddContactSVG.vue';
import CloseModalSVG from './SVG components/CloseModalSVG.vue';

const props = defineProps({
  activeId: Object,
  clients: Array,
});

const errors = reactive({
  error: {},
});
const activeClient = reactive({
  addBlocks: props.activeId.client.contacts,
  firstName: props.activeId.client.firstName,
  secondName: props.activeId.client.secondName,
  thirdName: props.activeId.client.thirdName,
});

const copyClient = cloneDeep(props.activeId);

const client = computed(
  () => props.clients.find((item) => item.id === props.activeId.client.id),
);

const copyContacts = computed(() => client.value.contacts);

const deleteClient = inject('deleteClient');
const changeClient = inject('changeClient');
const initialContacts = inject('initialContacts');
const closeModal = inject('closeModal');

const close = () => {
  initialContacts(props.activeId.client.id, copyClient.client.contacts);
  closeModal();
};

const change = () => {
  changeClient(
    props.activeId.client.id,
    activeClient.firstName,
    activeClient.secondName,
    activeClient.thirdName,
    activeClient.addBlocks,
  );

  closeModal();
};

const checkForm = () => {
  useCheckForm(
    activeClient.firstName,
    activeClient.secondName,
    errors.error,
    change,
  );
};

const deleteActiveClient = (id) => {
  deleteClient(id);
  closeModal();
};

const pushAddBlock = () => {
  activeClient.addBlocks.push({
    block: ModalWindowAddBlock,
    selectValue: 'phone',
    inputValue: '',
  });
};
</script>
