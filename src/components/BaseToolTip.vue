<template>
  <span class="tooltip">
    <span class="tooltip-maincontent">
      <PhoneSVG
      v-if="selectValue === 'phone' || selectValue === 'additional-phone'"/>
      <VkSVG
      v-else-if="selectValue === 'Vk'"/>
      <EmailSVG
      v-else-if="selectValue === 'Email'"/>
      <SocialMediaSVG
      v-else-if="selectValue === 'Twitter'"/>
    </span>
    <span class="popup">
      <span style="font-weight:400;font-size:12px;pointer-events:none;">
      {{ (selectValue === 'phone' || selectValue === 'additional-phone')
        ? 'Телефон' : selectValue }}:
      </span>
      <span style="color:#B89EFF;font-weight:700;font-size:12px;padding-left:5px;">
        {{ inputValue }}
      </span>
    </span>
  </span>
</template>

<script>
import PhoneSVG from './SVG components/PhoneSVG.vue';
import EmailSVG from './SVG components/EmailSVG.vue';
import VkSVG from './SVG components/VkSVG.vue';
import SocialMediaSVG from './SVG components/SocialMediaSVG.vue';

export default {
  props: ['inputValue', 'selectValue'],
  components: {
    PhoneSVG,
    EmailSVG,
    VkSVG,
    SocialMediaSVG,
  },
};
</script>

<style>
.tooltip {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
}
.popup {
  display: flex;
  align-items: center;
  position: absolute;
  padding: 7px 18px;
  min-width: 133px;
  min-height: 37px;
  visibility: hidden;
  background-color: #111111;
  color: #fff;
  transition: visibility .1s ease-in-out;
  transform: translate(-46%, -180%);
}
.tooltip-maincontent {
  display: inline-block;
  width: 16px;
  height: 16px;
}
.tooltip-maincontent:hover + .popup {
  visibility: visible;
}
.tooltip .popup::after {
  content: " ";
  position: absolute;
  top: 98%;
  left: 50%;
  margin-left: -5px;
  border-width: 7px;
  border-style: solid;
  border-color: #111111 transparent transparent transparent;
}
</style>
