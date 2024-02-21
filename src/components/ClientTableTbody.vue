<template>
  <tbody class="table__tbody" id="client-list">
    <ClientItem v-for="client in clients" :key="client.id"
    :id="client.id"
    :full-name = client.fullName
    :date="client.date"
    :edit="client.edit"
    :contacts="client.contacts"
    :active-id="client.id === activeId"
    :active-id-delete="client.id === activeIdDelete"
    @show-modal="$emit('showModal', client)"
    @show-modal-delete="$emit('showModalDelete', client)"/>
  </tbody>
</template>

<script>
import ClientItem from './ClientItem.vue';

export default {
  emits: ['showModal', 'showModalDelete'],
  props: ['clients', 'activeId', 'activeIdDelete'],
  components: {
    ClientItem,
  },
};
</script>
