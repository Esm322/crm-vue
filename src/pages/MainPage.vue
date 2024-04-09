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
              @click="isSortId">
                ID
                  <DownArrowSVG v-if="dirId === 1 || dirId === 0"/>
                  <UpArrowSVG v-if="dirId === 2"/>
              </th>
              <th data-th="name" class="table__thead-tr-th table__thead-tr-th-sort-filter"
              @click="isSortFullName">
              Фамилия Имя Отчество
                <DownArrowSVG v-if="dirFullName === 0 || dirFullName === 1"
                style="margin-left: 3px;"/>
                <UpArrowSVG v-if="dirFullName === 2"
                style="margin-left: 3px;"/>
                <AlphabetSVG
                style="margin-left: 3px;"/>
              </th>
              <th data-th="createDate" class="table__thead-tr-th table__thead-tr-th-sort-filter"
              @click="isSortCreate">
                Дата и время создания
                <DownArrowSVG v-if="dirCreate === 0 || dirCreate === 1"/>
                <UpArrowSVG v-if="dirCreate === 2"/>
              </th>
              <th data-th="changesDate" class="table__thead-tr-th table__thead-tr-th-sort-filter"
              @click="isSortEdit">
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
          :clients="clients"
          @show-modal="activeId = $event"
          @show-modal-delete="activeIdDelete = $event"/>

        </table>

        <button class="add-client btn-reset" id="add"
        @click="showModalAdd">
          <AddSVG/>
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
import DownArrowSVG from '@/components/SVG components/DownArrowSVG.vue';
import UpArrowSVG from '@/components/SVG components/UpArrowSVG.vue';
import AlphabetSVG from '@/components/SVG components/AlphabetSVG.vue';
import AddSVG from '@/components/SVG components/AddSVG.vue';
import { useClientsStore } from '../stores/clientsData';
import dateChange from '../helpers/dateChange';
import dateCreation from '../helpers/dateCreation';

// export default {
//   data() {
//     return {
//       isModalAddVisible: false,
//       activeId: null,
//       activeIdDelete: null,

//       dirId: 0,
//       isDirId: false,

//       dirFullName: 0,
//       isDirFullName: false,

//       dirCreate: 0,
//       isDirCreate: false,

//       dirEdit: 0,
//       isDirEdit: false,
//     };
//   },
//   components: {
//     ModalWindowAdd,
//     ModalWindowChanges,
//     ModalWindowDelete,
//     ClientTableTbody,
//     DownArrowSVG,
//     UpArrowSVG,
//     AlphabetSVG,
//     AddSVG,
//   },
//   computed: {
//     ...mapState(useClientsStore, ['clientsData', 'searchValueStore']),
//     clients() {
//       return this.getClientsData ? this.getClientsData.map((client) => {
//         return {
//           ...client,
//           id: client.id,
//           fullName: `${client.secondName} ${client.firstName} ${client.thirdName}`,
//           date: dateCreation(client.date.newDate),
//           edit: dateChange(client.edit.newEdit),
//         };
//       }) : [];
//     },
//     getClientsData() {
//       let copyData = this.clientsData;

//       if (this.dirId === 1 && this.isDirId === true) {
//         copyData = copyData
//           .sort((clientA, clientB) => clientA.id - clientB.id);
//       } else if (this.dirId === 2 && this.isDirId === true) {
//         copyData = copyData
//           .sort((clientA, clientB) => clientB.id - clientA.id);
//       }

//       if (this.isDirFullName === true && this.dirFullName === 1) {
//         copyData = copyData
//           .sort((clientA, clientB) => (clientA.secondName < clientB.secondName ? -1 : 1));
//       } else if (this.isDirFullName === true && this.dirFullName === 2) {
//         copyData = copyData
//           .sort((clientA, clientB) => (clientA.secondName > clientB.secondName ? -1 : 1));
//       }

//       if (this.dirCreate === 1 && this.isDirCreate === true) {
//         copyData = copyData
//           .sort((clientA, clientB) => clientA.date.nowDate - clientB.date.nowDate);
//       } else if (this.dirCreate === 2 && this.isDirCreate === true) {
//         copyData = copyData
//           .sort((clientA, clientB) => clientB.date.nowDate - clientA.date.nowDate);
//       }

//       if (this.dirEdit === 1 && this.isDirEdit === true) {
//         copyData = copyData
//           .sort((clientA, clientB) => clientA.edit.nowEdit - clientB.edit.nowEdit);
//       } else if (this.dirEdit === 2 && this.isDirEdit === true) {
//         copyData = copyData
//           .sort((clientA, clientB) => clientB.edit.nowEdit - clientA.edit.nowEdit);
//       }

//       if (this.searchValueStore) {
//         copyData = copyData
//           .filter((client) => {
//             return Object.values(client)
//               .some((item) => item
//                 .toString().toLowerCase().includes(this.searchValueStore.toLowerCase()));
//           });
//       }

//       return copyData;
//     },
//   },
//   methods: {
//     isSortId() {
//       this.dirFullName = 0;
//       this.isDirFullName = false;

//       this.dirCreate = 0;
//       this.isDirCreate = false;

//       this.dirEdit = 0;
//       this.isDirEdit = false;

//       if (this.dirId === 0 && this.isDirId === false) {
//         this.dirId = 1;
//         this.isDirId = true;
//       } else if (this.dirId === 1 && this.isDirId === true) {
//         this.dirId = 2;
//       } else {
//         this.dirId = 1;
//       }
//     },
//     isSortFullName() {
//       this.dirId = 0;
//       this.isDirId = false;

//       this.dirCreat = 0;
//       this.isDirCreate = false;

//       this.dirEdit = 0;
//       this.isDirEdit = false;

//       if (this.isDirFullName === false && this.dirFullName === 0) {
//         this.isDirFullName = true;
//         this.dirFullName = 1;
//       } else if (this.isDirFullName === true && this.dirFullName === 1) {
//         this.dirFullName = 2;
//       } else {
//         this.dirFullName = 1;
//       }
//     },
//     isSortCreate() {
//       this.dirId = 0;
//       this.isDirId = false;

//       this.dirFullName = 0;
//       this.isdirFullName = false;

//       this.dirEdit = 0;
//       this.isDirEdit = false;

//       if (this.dirCreate === 0 && this.isDirCreate === false) {
//         this.dirCreate = 1;
//         this.isDirCreate = true;
//       } else if (this.dirCreate === 1 && this.isDirCreate === true) {
//         this.dirCreate = 2;
//       } else {
//         this.dirCreate = 1;
//       }
//     },
//     isSortEdit() {
//       this.dirId = 0;
//       this.isDirId = false;

//       this.dirFullName = 0;
//       this.isdirFullName = false;

//       this.dirCreate = 0;
//       this.isDirCreate = false;

//       if (this.dirEdit === 0 && this.isDirEdit === false) {
//         this.dirEdit = 1;
//         this.isDirEdit = true;
//       } else if (this.dirEdit === 1 && this.isDirEdit === true) {
//         this.dirEdit = 2;
//       } else {
//         this.dirEdit = 1;
//       }
//     },
//     showModalAdd() {
//       this.isModalAddVisible = true;
//     },
//     closeModal() {
//       this.activeId = null;
//       this.isModalAddVisible = false;
//       this.activeIdDelete = null;
//     },
//   },
//   mounted() {
//     this.$watch(
//       () => this.isModalAddVisible || this.activeId || this.activeIdDelete,
//       (val) => document.body.classList.toggle('no-overflow', val),
//       { immediate: true },
//     );
//   },
// };
</script>
