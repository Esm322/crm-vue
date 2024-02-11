import { defineStore } from 'pinia';

export const useClientsStore = defineStore('client', {
  state: () => ({
    clientsData: JSON.parse(localStorage.getItem('clients')) || [],
  }),
  actions: {
    saveClients() {
      localStorage.setItem('clients', JSON.stringify(this.clientsData));
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
