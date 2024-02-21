<template>
  <main class="main">
    <section class="clients">
      <h1 class="hidden">skb.</h1>
      <div class="container">
        <h2 class="title">
          Клиенты
        </h2>
        <table class="table">
          <thead class="table__thead">
            <tr class="table__thead-tr">
              <th data-th="id" class="table__thead-tr-th table__thead-tr-th-sort-filter"
              @click="isSortId">
                ID
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z"
                fill="#9873FF"/>
                </svg>
              </th>
              <th data-th="name" class="table__thead-tr-th table__thead-tr-th-sort-filter"
              @click="isSortFullName">
                Фамилия Имя Отчество
                <svg width="29" height="14" viewBox="0 0 29 14" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.7">
                  <path d="M17.3711 11L16.6582 9.01758H13.9287L13.2305 11H12L14.6709
                  3.83203H15.9404L18.6113 11H17.3711ZM16.3506 8.01172L15.6816 6.06836C15.6328
                  5.93815 15.5645 5.73307 15.4766 5.45312C15.3919 5.17318 15.3333 4.9681 15.3008
                  4.83789C15.2129 5.23828 15.0843 5.67611 14.915 6.15137L14.2705
                  8.01172H16.3506ZM18.9629 8.80762V7.83105H21.4727V8.80762H18.9629ZM25.0322
                  8.13867L23.2646 11H21.9316L23.9434 7.87012C23.0319 7.55436 22.5762 6.8903
                  22.5762 5.87793C22.5762 5.22363 22.8024 4.72396 23.2549 4.37891C23.7074
                  4.03385 24.373 3.86133 25.252 3.86133H27.3955V11H26.2236V8.13867H25.0322ZM26.2236
                  4.83789H25.2959C24.8044 4.83789 24.4268 4.92578 24.1631 5.10156C23.9027 5.27409
                  23.7725 5.55729 23.7725 5.95117C23.7725 6.33529 23.8994 6.63477
                  24.1533 6.84961C24.4072 7.06445 24.8011 7.17188 25.335
                  7.17188H26.2236V4.83789Z" fill="#9873FF"/>
                  <g clip-path="url(#clip0_224_708)">
                  <path d="M10 7L9.295 6.295L6.5 9.085L6.5 3H5.5L5.5 9.085L2.71
                  6.29L2 7L6 11L10 7Z" fill="#9873FF"/>
                  </g>
                  </g>
                  <defs>
                  <clipPath id="clip0_224_708">
                  <rect width="12" height="12" fill="white" transform="translate(0 1)"/>
                  </clipPath>
                  </defs>
                </svg>
              </th>
              <th data-th="createDate" class="table__thead-tr-th table__thead-tr-th-sort-filter"
              @click="isSortCreate">
                Дата и время создания
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z"
                fill="#9873FF"/>
                </svg>
              </th>
              <th data-th="changesDate" class="table__thead-tr-th table__thead-tr-th-sort-filter"
              @click="isSortEdit">
                Последние изменения
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z"
                fill="#9873FF"/>
                </svg>
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
          :clients="clients"
          :active-id="activeId"
          :active-id-delete="activeIdDelete"
          @show-modal="activeId = $event"
          @show-modal-delete="activeIdDelete = $event"/>
        </table>
        <button class="add-client btn-reset" id="add"
        @click="showModalAdd">
          <svg class="svg-add" width="23" height="16" viewBox="0 0 23 16" fill="none"
          xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29
            0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5
            6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83
            10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z"/>
          </svg>
          Добавить клиента
        </button>

        <ModalWindowAdd v-if="isModalAddVisible"
        :clients="getClientsData"
        @close-modal-add="closeModal"/>

        <ModalWindowChanges v-if="activeId"
        :active-id="activeId"
        @close-modal-changes="closeModal"/>

        <ModalWindowDelete v-if="activeIdDelete"
        :active-id-delete="activeIdDelete"
        @close-modal-delete="closeModal"/>

      </div>
    </section>
  </main>
</template>

<script>
import { mapState } from 'pinia';
import ModalWindowAdd from '@/components/ModalWindowAdd.vue';
import ModalWindowChanges from '@/components/ModalWindowChanges.vue';
import ModalWindowDelete from '@/components/ModalWindowDelete.vue';
import ClientTableTbody from '@/components/ClientTableTbody.vue';
import { useClientsStore } from '../stores/clientsData';
import dateChange from '../helpers/dateChange';
import dateCreation from '../helpers/dateCreation';

export default {
  data() {
    return {
      isModalAddVisible: false,
      activeId: null,
      activeIdDelete: null,

      dirId: 0,
      isDirId: false,

      dirFullName: 0,
      isDirFullName: false,

      dirCreate: 0,
      isDirCreate: false,

      dirEdit: 0,
      isDirEdit: false,
    };
  },
  components: {
    ModalWindowAdd,
    ModalWindowChanges,
    ModalWindowDelete,
    ClientTableTbody,
  },
  computed: {
    ...mapState(useClientsStore, ['clientsData', 'searchValueStore']),
    clients() {
      return this.getClientsData ? this.getClientsData.map((client) => {
        return {
          ...client,
          id: client.id,
          fullName: `${client.secondName} ${client.firstName} ${client.thirdName}`,
          date: dateCreation(client.date.newDate),
          edit: dateChange(client.edit.newEdit),
        };
      }) : [];
    },
    getClientsData() {
      let copyData = this.clientsData;

      if (this.dirId === 1 && this.isDirId === true) {
        copyData = copyData
          .sort((clientA, clientB) => clientA.id - clientB.id);
      } else if (this.dirId === 2 && this.isDirId === true) {
        copyData = copyData
          .sort((clientA, clientB) => clientB.id - clientA.id);
      }

      if (this.isDirFullName === true && this.dirFullName === 1) {
        copyData = copyData
          .sort((clientA, clientB) => (clientA.secondName < clientB.secondName ? -1 : 1));
      } else if (this.isDirFullName === true && this.dirFullName === 2) {
        copyData = copyData
          .sort((clientA, clientB) => (clientA.secondName > clientB.secondName ? -1 : 1));
      }

      if (this.dirCreate === 1 && this.isDirCreate === true) {
        copyData = copyData
          .sort((clientA, clientB) => clientA.date.nowDate - clientB.date.nowDate);
      } else if (this.dirCreate === 2 && this.isDirCreate === true) {
        copyData = copyData
          .sort((clientA, clientB) => clientB.date.nowDate - clientA.date.nowDate);
      }

      if (this.dirEdit === 1 && this.isDirEdit === true) {
        copyData = copyData
          .sort((clientA, clientB) => clientA.edit.nowEdit - clientB.edit.nowEdit);
      } else if (this.dirEdit === 2 && this.isDirEdit === true) {
        copyData = copyData
          .sort((clientA, clientB) => clientB.edit.nowEdit - clientA.edit.nowEdit);
      }

      if (this.searchValueStore) {
        copyData = copyData
          .filter((client) => {
            return Object.values(client)
              .some((item) => item
                .toString().toLowerCase().includes(this.searchValueStore.toLowerCase()));
          });
      }

      return copyData;
    },
  },
  methods: {
    isSortId() {
      this.dirFullName = 0;
      this.isDirFullName = false;

      this.dirCreate = 0;
      this.isDirCreate = false;

      this.dirEdit = 0;
      this.isDirEdit = false;

      if (this.dirId === 0 && this.isDirId === false) {
        this.dirId = 1;
        this.isDirId = true;
      } else if (this.dirId === 1 && this.isDirId === true) {
        this.dirId = 2;
      } else {
        this.dirId = 1;
      }
    },
    isSortFullName() {
      this.dirId = 0;
      this.isDirId = false;

      this.dirCreat = 0;
      this.isDirCreate = false;

      this.dirEdit = 0;
      this.isDirEdit = false;

      if (this.isDirFullName === false && this.dirFullName === 0) {
        this.isDirFullName = true;
        this.dirFullName = 1;
      } else if (this.isDirFullName === true && this.dirFullName === 1) {
        this.dirFullName = 2;
      } else {
        this.dirFullName = 1;
      }
    },
    isSortCreate() {
      this.dirId = 0;
      this.isDirId = false;

      this.dirFullName = 0;
      this.isdirFullName = false;

      this.dirEdit = 0;
      this.isDirEdit = false;

      if (this.dirCreate === 0 && this.isDirCreate === false) {
        this.dirCreate = 1;
        this.isDirCreate = true;
      } else if (this.dirCreate === 1 && this.isDirCreate === true) {
        this.dirCreate = 2;
      } else {
        this.dirCreate = 1;
      }
    },
    isSortEdit() {
      this.dirId = 0;
      this.isDirId = false;

      this.dirFullName = 0;
      this.isdirFullName = false;

      this.dirCreate = 0;
      this.isDirCreate = false;

      if (this.dirEdit === 0 && this.isDirEdit === false) {
        this.dirEdit = 1;
        this.isDirEdit = true;
      } else if (this.dirEdit === 1 && this.isDirEdit === true) {
        this.dirEdit = 2;
      } else {
        this.dirEdit = 1;
      }
    },
    showModalAdd() {
      this.isModalAddVisible = true;
    },
    closeModal() {
      this.activeId = null;
      this.isModalAddVisible = false;
      this.activeIdDelete = null;
    },
  },
};
</script>
