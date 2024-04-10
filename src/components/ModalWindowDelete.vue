<template>
  <ModalWindow>
    <div class="modal__header">
      <h3 class="modal__title"
      style="margin: 0 auto;margin-right: auto;">
          Удалить клиента
      </h3>
      <button class="btn-reset" @click="closeModal">
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
      @click="deleteActiveClient(client.id)">
        Удалить
      </button>
    </div>
    <button id="btn-cancel-contact" class="btns__btn-cancel btn-reset"
    @click="closeModal">
      Отмена
    </button>
  </ModalWindow>
</template>

<script setup>
import { computed, inject } from 'vue';
import ModalWindow from './ModalWindow.vue';
import CloseModalSVG from './SVG components/CloseModalSVG.vue';

const props = defineProps({
  activeIdDelete: Object,
  clients: Array,
});

const closeModal = inject('closeModal');
const deleteClient = inject('deleteClient');

const client = computed(
  () => props.clients.find((item) => item.id === props.activeIdDelete.client.id),
);

const deleteActiveClient = (id) => {
  deleteClient(id);
  closeModal();
};
</script>
