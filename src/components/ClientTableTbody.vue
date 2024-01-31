<template>
  <tbody class="table__tbody" id="client-list">
    <ClientItem v-for="client in clients" :key="client.id"
    :id="client.id"
    :fullname="client.fullName"
    :date="client.date"
    :edit="client.edit"
    :contacts="client.contacts"
    :actions="client.actions"/>
  </tbody>
</template>

<script>
import ClientItem from './ClientItem.vue';

export default {
  props: ['clients'],
  components: {
    ClientItem,
  },
};
</script>
