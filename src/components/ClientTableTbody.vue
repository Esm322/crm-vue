<template>
  <tbody class="table__tbody" id="client-list">
    <ClientItem v-for="client in clients" :key="client.id"
    :id="client.id"
    :full-name = client.fullName
    :date="client.date"
    :edit="client.edit"
    :contacts="client.contacts"
    :actions="client.actions"
    @show="show"/>
  </tbody>
</template>

<script>
import ClientItem from './ClientItem.vue';

export default {
  data() {
    return {
      currentIsModalChangesVisible: false,
    };
  },
  props: ['clients'],
  components: {
    ClientItem,
  },
  methods: {
    show() {
      this.$emit('showModal');
    },
  },
};
</script>
