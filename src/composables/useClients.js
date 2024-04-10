import { computed } from 'vue';
import dateCreation from '@/helpers/dateCreation';
import dateChange from '@/helpers/dateChange';

export default function useClientsData(clients) {
  const useClients = computed(() => {
    return clients.value ? clients.value.map((client) => {
      return {
        ...client,
        id: client.id,
        fullName: `${client.secondName} ${client.firstName} ${client.thirdName}`,
        date: dateCreation(client.date.newDate),
        edit: dateChange(client.edit.newEdit),
      };
    }) : [];
  });

  return {
    useClients,
  };
}
