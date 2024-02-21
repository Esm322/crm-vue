import { defineStore } from 'pinia';

export const useClientsStore = defineStore('client', {
  state: () => ({
    clientsData: JSON.parse(localStorage.getItem('clients')) || [],
    searchValueStore: '',
  }),
  actions: {
    saveClients() {
      localStorage.setItem('clients', JSON.stringify(this.clientsData));
    },
    changeClient(
      id,
      firstName,
      secondName,
      thirdName,
      contacts,
    ) {
      this.clientsData.map((client) => {
        if (client.id === id) {
          client.firstName = firstName;
          client.secondName = secondName;
          client.thirdName = thirdName;
          client.edit.newEdit = new Date();
          client.edit.nowEdit = Date.now();
          client.contacts = contacts;

          this.saveClients();
        }

        return this.clientsData;
      });
    },
    deleteClient(id) {
      this.clientsData.map((client, i) => {
        if (client.id === id) {
          this.clientsData.splice(i, 1);

          this.saveClients();
        }

        return this.clientsData;
      });
    },
  },
});
