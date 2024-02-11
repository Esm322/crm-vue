<template>
  <div class="modal">
    <div class="modal-content">
      <slot/>
    </div>
  </div>
</template>

<!-- <script>
export default {
  data() {
    return {
      addBlocks: [],
      firstName: '',
      secondName: '',
      thirdName: '',
    };
  },
  props: ['getClientsData'],
  computed: {
    reactiveData: {
      get() {
        return this.getClientsData;
      },
      set(val) {
        this.$emit('update:getClientsData', val);
      },
    },
    newClientId() {
      return idCreation(this.reactiveData, true);
    },
  },
  methods: {
    ...mapActions(useClientsStore, ['saveClients']),
    addClient() {
      this.reactiveData
        .push(
          {
            id: idCreation(this.reactiveData, true),
            firstName: this.firstName,
            secondName: this.secondName,
            thirdName: this.thirdName,
            date: new Date(),
            edit: new Date(),
            contacts: this.addBlocks,
          },
        );

      this.saveClients();
      this.close();
    },
    pushAddBlock() {
      this.addBlocks.push({
        block: ModalWindowAddBlock,
        selectValue: '0',
        inputValue: '',
      });
    },
    close() {
      this.$emit('close');
      this.addBlocks = [];
      this.firstName = '';
      this.secondName = '';
      this.thirdName = '';
    },
  },
};
</script> -->
