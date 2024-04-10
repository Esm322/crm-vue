<template>
  <main class="main offset">
    <section class="clients">
      <h1 class="hidden">skb.</h1>
      <div class="container">

        <h2 class="title">
          Клиенты
        </h2>

        <table class="table" id="table">

          <thead class="table__thead">
            <tr class="table__thead-tr">
              <th data-th="id" class="table__thead-tr-th table__thead-tr-th-sort-filter"
              @click="sortId">
                ID
                  <DownArrowSVG v-if="dirId === 1 || dirId === 0"/>
                  <UpArrowSVG v-if="dirId === 2"/>
              </th>
              <th data-th="name" class="table__thead-tr-th table__thead-tr-th-sort-filter"
              @click="sortFullName">
              Фамилия Имя Отчество
                <DownArrowSVG v-if="dirFullName === 0 || dirFullName === 1"
                style="margin-left: 3px;"/>
                <UpArrowSVG v-if="dirFullName === 2"
                style="margin-left: 3px;"/>
                <AlphabetSVG
                style="margin-left: 3px;"/>
              </th>
              <th data-th="createDate" class="table__thead-tr-th table__thead-tr-th-sort-filter"
              @click="sortDateCreated">
                Дата и время создания
                <DownArrowSVG v-if="dirCreate === 0 || dirCreate === 1"/>
                <UpArrowSVG v-if="dirCreate === 2"/>
              </th>
              <th data-th="changesDate" class="table__thead-tr-th table__thead-tr-th-sort-filter"
              @click="sortDateEdited">
                Последние изменения
                <DownArrowSVG v-if="dirEdit === 0 || dirEdit === 1"/>
                <UpArrowSVG v-if="dirEdit === 2"/>
              </th>
              <th class="table__thead-tr-th">
                Контакты
              </th>
              <th class="table__thead-tr-th">
                Действия
              </th>
              <th class="table__thead-tr-th">
              </th>
            </tr>
          </thead>

          <ClientTableTbody
          :clients="useClients"/>

        </table>

        <button class="add-client btn-reset" id="add"
        @click="showModalAdd">
          <AddSVG/>
          Добавить клиента
        </button>

        <ModalWindowAdd v-if="isModalAddVisible"
        :clients="useClients"
        @close-modal-add="closeModal"/>

        <ModalWindowChanges v-if="activeId.client"
        :clients="useClients"
        :active-id="activeId"/>

        <ModalWindowDelete v-if="activeIdDelete.client"
        :clients="useClients"
        :active-id-delete="activeIdDelete"/>

      </div>
    </section>
  </main>
</template>

<script setup>
import {
  ref,
  reactive,
  watch,
  provide,
} from 'vue';
import { storeToRefs } from 'pinia';
import { useClientsStore } from '@/stores/clientsData';
import useClientsData from '@/composables/useClients';
import useFilteredClientsData from '@/composables/useFilteredClients';
import useSortId from '@/composables/useSortId';
import useSortFullName from '@/composables/useSortFullName';
import useSortDateCreated from '@/composables/useSortDateCreated';
import useSortDateEdited from '@/composables/useSortDateEdited';
import ModalWindowAdd from '@/components/ModalWindowAdd.vue';
import ModalWindowChanges from '@/components/ModalWindowChanges.vue';
import ModalWindowDelete from '@/components/ModalWindowDelete.vue';
import ClientTableTbody from '@/components/ClientTableTbody.vue';
import DownArrowSVG from '@/components/SVG components/DownArrowSVG.vue';
import UpArrowSVG from '@/components/SVG components/UpArrowSVG.vue';
import AlphabetSVG from '@/components/SVG components/AlphabetSVG.vue';
import AddSVG from '@/components/SVG components/AddSVG.vue';

const store = useClientsStore();
const { clientsData, searchValueStore } = storeToRefs(store);

const isModalAddVisible = ref(false);
const activeId = reactive({
  client: null,
});
const activeIdDelete = reactive({
  client: null,
});
const dirId = ref(0);
const isDirId = ref(false);
const dirFullName = ref(0);
const isDirFullName = ref(false);
const dirCreate = ref(0);
const isDirCreate = ref(false);
const dirEdit = ref(0);
const isDirEdit = ref(false);

const { useFilteredClients } = useFilteredClientsData(
  clientsData,
  dirId,
  isDirId,
  dirFullName,
  isDirFullName,
  dirCreate,
  isDirCreate,
  dirEdit,
  isDirEdit,
  searchValueStore,
);

const { useClients } = useClientsData(
  useFilteredClients,
);

const sortId = () => useSortId(
  dirId,
  isDirId,
  dirFullName,
  isDirFullName,
  dirCreate,
  isDirCreate,
  dirEdit,
  isDirEdit,
);

const sortFullName = () => useSortFullName(
  dirId,
  isDirId,
  dirFullName,
  isDirFullName,
  dirCreate,
  isDirCreate,
  dirEdit,
  isDirEdit,
);

const sortDateCreated = () => useSortDateCreated(
  dirId,
  isDirId,
  dirFullName,
  isDirFullName,
  dirCreate,
  isDirCreate,
  dirEdit,
  isDirEdit,
);

const sortDateEdited = () => useSortDateEdited(
  dirId,
  isDirId,
  dirFullName,
  isDirFullName,
  dirCreate,
  isDirCreate,
  dirEdit,
  isDirEdit,
);

const showModalAdd = () => {
  isModalAddVisible.value = true;
};

const showModalChange = (value) => activeId.client = value;

const showModalDelete = (value) => activeIdDelete.client = value;

const closeModal = () => {
  activeId.client = null;
  isModalAddVisible.value = false;
  activeIdDelete.client = null;
};

watch(
  () => isModalAddVisible.value || activeId.client || activeIdDelete.client,
  (val) => document.body.classList.toggle('no-overflow', val),
  { immediate: true },
);

provide('showModalChange', showModalChange);
provide('showModalDelete', showModalDelete);
provide('closeModal', closeModal);
provide('addClient', store.addClient);
provide('deleteClient', store.deleteClient);
provide('changeClient', store.changeClient);
provide('initialContacts', store.initialContacts);
</script>
