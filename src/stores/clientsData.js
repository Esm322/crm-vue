import { defineStore } from 'pinia';
import idCreation from '@/helpers/idCreation';

export const useClientsStore = defineStore('client', {
  state: () => ({
    clientsData: JSON.parse(localStorage.getItem('clients')) || [],
    searchValueStore: '',
  }),
  actions: {
    saveClients() {
      localStorage.setItem('clients', JSON.stringify(this.clientsData));
    },
    addClient(
      firstName,
      secondName,
      thirdName,
      contacts,
    ) {
      this.clientsData.push({
        id: idCreation(this.clientsData, true),
        firstName,
        secondName,
        thirdName,
        fullName: `${secondName} ${firstName} ${thirdName}`,
        date: {
          newDate: new Date(),
          nowDate: Date.now(),
        },
        edit: {
          newEdit: new Date(),
          nowEdit: Date.now(),
        },
        contacts,
      });

      this.saveClients();
    },
    initialContacts(id, contacts) {
      this.clientsData.forEach((client) => {
        if (client.id === id) {
          client.contacts = contacts;

          this.saveClients();
        }
      });
    },
    changeClient(
      id,
      firstName,
      secondName,
      thirdName,
      contacts,
    ) {
      this.clientsData.forEach((client) => {
        if (client.id === id) {
          client.firstName = firstName;
          client.secondName = secondName;
          client.thirdName = thirdName;
          client.fullName = `${secondName} ${firstName} ${thirdName}`;
          client.edit.newEdit = new Date();
          client.edit.nowEdit = Date.now();
          client.contacts = contacts;

          this.saveClients();
        }
      });
    },
    deleteClient(id) {
      this.clientsData.forEach((client, i) => {
        if (client.id === id) {
          this.clientsData.splice(i, 1);

          this.saveClients();
        }
      });
    },
  },
});
