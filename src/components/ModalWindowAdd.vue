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
    <div class="form__wrapper-btn-save">
      <button id="btn-save-contact" class="wrapper-btn-save__btn-save btn-reset"
      form="form" @click.prevent="addClient">
        Сохранить
      </button>
    </div>
    <button id="btn-cancel-contact" class="btns__btn-cancel btn-reset"
    @click.prevent="close">
      Отмена
    </button>
  </ModalWindow>
</template>

<script>
import { mapActions } from 'pinia';
import { useClientsStore } from '@/stores/clientsData';
import idCreation from '@/helpers/idCreation';
import ModalWindow from './ModalWindow.vue';
import ModalWindowAddBlock from './ModalWindowAddBlock.vue';
import AddContactSVG from './SVG components/AddContactSVG.vue';
import CloseModalSVG from './SVG components/CloseModalSVG.vue';

export default {
  data() {
    return {
      addBlocks: [],
      firstName: '',
      secondName: '',
      thirdName: '',
    };
  },
  props: ['clients'],
  components: {
    ModalWindow,
    ModalWindowAddBlock,
    AddContactSVG,
    CloseModalSVG,
  },
  computed: {
    reactiveData: {
      get() {
        return this.clients;
      },
      set(val) {
        this.$emit('update:clients', val);
      },
    },
    newClientId() {
      return idCreation(this.reactiveData, true);
    },
  },
  methods: {
    close() {
      this.$emit('closeModalAdd');
      this.addBlocks = [];
      this.firstName = '';
      this.secondName = '';
      this.thirdName = '';
    },
    ...mapActions(useClientsStore, ['saveClients']),
    addClient() {
      this.reactiveData
        .push(
          {
            id: idCreation(this.reactiveData, true),
            firstName: this.firstName,
            secondName: this.secondName,
            thirdName: this.thirdName,
            fullName: `${this.secondName} ${this.firstName} ${this.thirdName}`,
            date: {
              newDate: new Date(),
              nowDate: Date.now(),
            },
            edit: {
              newEdit: new Date(),
              nowEdit: Date.now(),
            },
            contacts: this.addBlocks,
          },
        );

      this.saveClients();
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
