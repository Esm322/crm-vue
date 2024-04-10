<template>
  <ModalWindow>
    <div class="modal__header">
      <h3 class="modal__title">
        Новый клиент
      </h3>
      <span class="modal__id-title">
        ID: {{ newClientId }}
      </span>
      <button class="btn-reset" @click="closeModal">
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
          :class="{ 'error-border': errors.error.errorSecondName && newClient.secondName === '' }"
          v-model="newClient.secondName">
        </label>
        <label class="form__label">
          <span class="label__input-title">
            Имя*
          </span>
          <input type="text" id="input-secondname" class="label__input" name="first-name"
          :class="{ 'error-border': errors.error.errorFirstName && newClient.firstName === '' }"
          v-model="newClient.firstName">
        </label>
        <label class="form__label">
          <span class="label__input-title">
            Отчество
          </span>
          <input type="text" id="input-thirdname" class="label__input" name="third-name"
          v-model="newClient.thirdName">
        </label>
      </div>
    </form>
    <div id="form__add-contact" class="form__add-contact">
      <div class="add-contact__wrapper-contacts" v-show="newClient.addBlocks.length > 0"
        :class="{ 'add-contact__wrapper-contacts--active': newClient.addBlocks.length > 1 }">
        <ModalWindowAddBlock
        v-for="block in newClient.addBlocks" :key="block"
        v-model:length="newClient.addBlocks.length"
        v-model:select-value="block.selectValue"
        v-model:input-value="block.inputValue"/>
      </div>

      <button class="add-contact__add-btn btn-reset" :disabled="newClient.addBlocks.length === 10"
      :class="{ 'add-contact__add-btn--disabled': newClient.addBlocks.length === 10 }"
      @click="pushAddBlock">
        <AddContactSVG/>
        Добавить контакт
      </button>
    </div>

    <div class="errors-block--active" v-if="errorsBlockActive > 0">
      <p class="error-block" v-if="errors.error.errorSecondName">
        {{ errors.error.errorSecondName }}
      </p>

      <p class="error-block" v-if="errors.error.errorFirstName">
        {{ errors.error.errorFirstName }}
      </p>
    </div>

    <div class="form__wrapper-btn-save">
      <button id="btn-save-contact" class="wrapper-btn-save__btn-save btn-reset"
      form="form" @click="checkForm">
        Сохранить
      </button>
    </div>
    <button id="btn-cancel-contact" class="btns__btn-cancel btn-reset"
    @click="closeModal">
      Отмена
    </button>
  </ModalWindow>
</template>

<script setup>
import {
  reactive,
  computed,
  inject,
} from 'vue';
import idCreation from '@/helpers/idCreation';
import useCheckForm from '@/composables/useCheckForm';
import ModalWindow from './ModalWindow.vue';
import ModalWindowAddBlock from './ModalWindowAddBlock.vue';
import AddContactSVG from './SVG components/AddContactSVG.vue';
import CloseModalSVG from './SVG components/CloseModalSVG.vue';

const props = defineProps({
  clients: Array,
});

const errors = reactive({
  error: {},
});
const newClient = reactive({
  addBlocks: [],
  firstName: '',
  secondName: '',
  thirdName: '',
});
console.log(errors.error);
const closeModal = inject('closeModal');
const addClient = inject('addClient');

const newClientId = computed(() => idCreation(props.clients, true));

const errorsBlockActive = computed(() => {
  const keys = Object.keys(errors.error);

  return keys.length;
});

const add = () => {
  addClient(
    newClient.firstName,
    newClient.secondName,
    newClient.thirdName,
    newClient.addBlocks,
  );

  closeModal();
};

const checkForm = () => {
  useCheckForm(
    newClient.firstName,
    newClient.secondName,
    errors.error,
    add,
  );
};

const pushAddBlock = () => {
  newClient.addBlocks.push({
    block: ModalWindowAddBlock,
    selectValue: 'phone',
    inputValue: '',
  });
};
</script>
