<template>
  <tr class="table__tbody-tr">
    <td class="table__tbody-tr-td id">
      {{ props.id }}
    </td>
    <td class="table__tbody-tr-td full-name">
      {{ props.fullName }}
    </td>
    <td class="table__tbody-tr-td date">
      {{ props.date.slice(0, 10) }}
      <span class="time">
        {{ props.date.slice(11, 17) }}
      </span>
    </td>
    <td class="table__tbody-tr-td date-edit">
      {{ props.edit.slice(0, 10) }}
      <span class="time">
        {{ props.edit.slice(11, 17) }}
      </span>
    </td>
    <td class="table__tbody-tr-td contacts">
      <div class="table__tbody-wrapper-contacts">
        <BaseToolTip
        v-for="contact in props.contacts" :key="contact.selectValue"
        :select-value="contact.selectValue"
        :input-value="contact.inputValue"/>
      </div>
    </td>
    <td class="table__tbody-tr-td edit">
      <button class="btn-reset" @click="showModalChange(client)">
        <ChangeSVG/>
        Изменить
      </button>
    </td>
    <td class="table__tbody-tr-td delete">
      <button class="btn-reset" @click="showModalDelete(client)">
        <DeleteSVG/>
        Удалить
      </button>
    </td>
  </tr>
</template>

<script setup>
import { inject } from 'vue';
import BaseToolTip from './BaseToolTip.vue';
import DeleteSVG from './SVG components/DeleteSVG.vue';
import ChangeSVG from './SVG components/ChangeSVG.vue';

const showModalChange = inject('showModalChange');
const showModalDelete = inject('showModalDelete');

const props = defineProps({
  id: Number,
  fullName: String,
  date: String,
  edit: String,
  contacts: Object,
  client: Object,
});
</script>
