<template>
  <ModalWindow>
    <div class="modal__header">
      <h3 class="modal__title"
      style="margin: 0 auto;margin-right: auto;">
          Удалить клиента
      </h3>
      <button class="btn-reset" @click="close">
        <span class="close" id="close">
          <CloseModalSVG/>
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
import CloseModalSVG from './SVG components/CloseModalSVG.vue';

export default {
  props: ['activeIdDelete'],
  components: {
    ModalWindow,
    CloseModalSVG,
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
