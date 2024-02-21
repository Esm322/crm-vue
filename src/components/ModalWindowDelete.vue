<template>
  <ModalWindow>
    <div class="modal__header">
      <h3 class="modal__title"
      style="margin: 0 auto;margin-right: auto;">
          Удалить клиента
      </h3>
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
    <p
    style="text-align: center;padding: 0 80px;margin: 0;margin-bottom: 10px;">
      Вы действительно хотите удалить данного клиента?
    </p>
    <p style="text-align: center;padding: 0 80px;margin: 0;margin-bottom: 25px;font-weight: 700;">
      {{ client.fullName }}
    </p>
    <div class="form__wrapper-btn-save">
      <button id="btn-save-contact" class="wrapper-btn-save__btn-save btn-reset"
      @click="deleteItem(client.id)">
        Удалить
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
import ModalWindow from './ModalWindow.vue';

export default {
  props: ['activeIdDelete'],
  components: {
    ModalWindow,
  },
  computed: {
    ...mapState(useClientsStore, ['clientsData']),
    client() {
      return this.clientsData.find((item) => item.id === this.activeIdDelete.id);
    },
  },
  methods: {
    ...mapActions(useClientsStore, ['deleteClient']),
    close() {
      this.$emit('closeModalDelete');
    },
    deleteItem(id) {
      this.deleteClient(id);
      this.close();
    },
  },
};
</script>
