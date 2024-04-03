<template>
  <tbody class="table__tbody" id="client-list">
    <TransitionGroup
    @enter="onEnter"
    @leave="onLeave">
      <ClientItem v-for="client in clients" :key="client.id"
      :id="client.id"
      :full-name = client.fullName
      :date="client.date"
      :edit="client.edit"
      :contacts="client.contacts"
      @show-modal="$emit('showModal', client)"
      @show-modal-delete="$emit('showModalDelete', client)"/>
    </TransitionGroup>
  </tbody>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useClientsStore } from '@/stores/clientsData';
import gsap from 'gsap';
import ClientItem from './ClientItem.vue';

export default {
  emits: ['showModal', 'showModalDelete'],
  props: ['clients'],
  components: {
    ClientItem,
  },
  computed: {
    ...mapState(useClientsStore, ['searchValueStore']),
  },
  methods: {
    ...mapActions(useClientsStore, ['deleteClient']),
    onEnter(el, done) {
      gsap.from(el, {
        duration: 0.3,
        x: -50,
        opacity: 0,
        delay: 0.2,
        onComplete: done,
      });
    },
    onLeave(el, done) {
      gsap.to(el, {
        duration: 0.3,
        x: 50,
        opacity: 0,
        delay: 0.2,
        onComplete: done,
      });
    },
  },
};
</script>
