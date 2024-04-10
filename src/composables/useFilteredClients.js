import { computed } from 'vue';

export default function useFilteredClientsData(
  clients,
  dirId,
  isDirId,
  dirFullName,
  isDirFullName,
  dirCreate,
  isDirCreate,
  dirEdit,
  isDirEdit,
  searchValue,
) {
  const useFilteredClients = computed(() => {
    let copyData = clients.value;

    if (dirId.value === 1 && isDirId.value === true) {
      copyData = copyData
        .sort((clientA, clientB) => clientA.id - clientB.id);
    } else if (dirId.value === 2 && isDirId.value === true) {
      copyData = copyData
        .sort((clientA, clientB) => clientB.id - clientA.id);
    }

    if (isDirFullName.value === true && dirFullName.value === 1) {
      copyData = copyData
        .sort((clientA, clientB) => (clientA.secondName < clientB.secondName ? -1 : 1));
    } else if (isDirFullName.value === true && dirFullName.value === 2) {
      copyData = copyData
        .sort((clientA, clientB) => (clientA.secondName > clientB.secondName ? -1 : 1));
    }

    if (dirCreate.value === 1 && isDirCreate.value === true) {
      copyData = copyData
        .sort((clientA, clientB) => clientA.date.nowDate - clientB.date.nowDate);
    } else if (dirCreate.value === 2 && isDirCreate.value === true) {
      copyData = copyData
        .sort((clientA, clientB) => clientB.date.nowDate - clientA.date.nowDate);
    }

    if (dirEdit.value === 1 && isDirEdit.value === true) {
      copyData = copyData
        .sort((clientA, clientB) => clientA.edit.nowEdit - clientB.edit.nowEdit);
    } else if (dirEdit.value === 2 && isDirEdit.value === true) {
      copyData = copyData
        .sort((clientA, clientB) => clientB.edit.nowEdit - clientA.edit.nowEdit);
    }

    if (searchValue.value) {
      copyData = copyData
        .filter((client) => {
          return Object.values(client)
            .some((item) => item
              .toString().toLowerCase().includes(searchValue.value.toLowerCase()));
        });
    }

    return copyData;
  });

  return {
    useFilteredClients,
  };
}
