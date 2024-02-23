<template>
  <tr class="table__tbody-tr">
    <td class="table__tbody-tr-td id">
      {{ id }}
    </td>
    <td class="table__tbody-tr-td">
      {{ fullName }}
    </td>
    <td class="table__tbody-tr-td">
      {{ date.slice(0, 10) }}
      <span class="time">
        {{ date.slice(11, 17) }}
      </span>
    </td>
    <td class="table__tbody-tr-td">
      {{ edit.slice(0, 10) }}
      <span class="time">
        {{ edit.slice(11, 17) }}
      </span>
    </td>
    <td class="table__tbody-tr-td">
      <div class="table__tbody-wrapper-contacts">
        <BaseToolTip
        v-for="contact in contacts" :key="contact.selectValue"
        :select-value="contact.selectValue"
        :input-value="contact.inputValue"/>
      </div>
    </td>
    <td class="table__tbody-tr-td edit">
      <button class="btn-reset" @click.prevent="$emit('showModal')">
        <ChangeSVG/>
        Изменить
      </button>
    </td>
    <td class="table__tbody-tr-td delete">
      <button class="btn-reset" @click="$emit('showModalDelete')">
        <DeleteSVG/>
        Удалить
      </button>
    </td>
  </tr>
</template>

<script>
import BaseToolTip from './BaseToolTip.vue';
import DeleteSVG from './SVG components/DeleteSVG.vue';
import ChangeSVG from './SVG components/ChangeSVG.vue';

export default {
  emits: ['showModal', 'showModalDelete'],
  props: ['id', 'fullName', 'date', 'edit', 'contacts', 'activeId', 'activeIdDelete'],
  components: {
    BaseToolTip,
    DeleteSVG,
    ChangeSVG,
  },
};
</script>
