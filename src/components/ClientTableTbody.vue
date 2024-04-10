<template>
  <tbody class="table__tbody" id="client-list">
    <TransitionGroup
    @enter="onEnter"
    @leave="onLeave">
      <ClientItem v-for="client in props.clients" :key="client.id"
      :id="client.id"
      :full-name = client.fullName
      :date="client.date"
      :edit="client.edit"
      :contacts="client.contacts"
      :client="client"/>
    </TransitionGroup>
  </tbody>
</template>

<script setup>
import gsap from 'gsap';
import ClientItem from './ClientItem.vue';

const props = defineProps({
  clients: Array,
});

const onEnter = (el, done) => {
  gsap.from(el, {
    duration: 0.3,
    x: -50,
    opacity: 0,
    delay: 0.2,
    onComplete: done,
  });
};

const onLeave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    x: 50,
    opacity: 0,
    delay: 0.2,
    onComplete: done,
  });
};
</script>
