<template>
  <tr class="table__tbody-tr">
    <td class="table__tbody-tr-td id">
      {{ id }}
    </td>
    <td class="table__tbody-tr-td">
      {{ fullname }}
    </td>
    <td class="table__tbody-tr-td">
      {{ date }}
    </td>
    <td class="table__tbody-tr-td">
      {{ edit }}
    </td>
    <td class="table__tbody-tr-td">
      <span v-for="item in contact" :key="item">
        {{ item.phone }}
      </span>
    </td>
    <td class="table__tbody-tr-td edit">
      <button class="btn-reset">
        <svg width="12" height="12" viewBox="0 0 13 13" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10.5002V13.0002H2.5L9.87333 5.62687L7.37333 3.12687L0
        10.5002ZM11.8067 3.69354C12.0667 3.43354 12.0667 3.01354 11.8067
        2.75354L10.2467 1.19354C9.98667 0.933535 9.56667 0.933535 9.30667
        1.19354L8.08667 2.41354L10.5867 4.91354L11.8067 3.69354Z"
        fill="#9873FF"/></svg>
        {{ editClient }}
      </button>
    </td>
    <td class="table__tbody-tr-td delete">
      <button class="btn-reset">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
        xmlns="http://www.w3.org/2000/svg">
          <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318
          12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2
          8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8
          6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3
          3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846
          6L9 3.846L8.154 3Z" fill="#F06A4D"/></svg>
        {{ deleteClient }}
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['id', 'fullname', 'date', 'edit', 'contacts', 'actions'],
  computed: {
    contact() {
      return this.contacts ? this.contacts.map((contact) => contact) : [];
    },
    editClient() {
      return this.actions[1].editClient;
    },
    deleteClient() {
      return this.actions[0].deleteClient;
    },
  },
};
</script>
