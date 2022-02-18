<script setup>
import { computed } from "vue";

    const props = defineProps({
      size: Number,
    })
    const emits = defineEmits(['change'])
    const buttons = computed(() => new Array(props.size).fill(null).map((e, index) => index + 1))

    const onButtonClick = (pageIndex) => {
        emits('change', pageIndex)
    }
</script>

<template>
  <div class="pager__container">
      <button class="pager__button" v-for="index in buttons" v-on:click="onButtonClick(index)">
        {{ index }}
      </button>
  </div>
</template>

<style lang="scss">
  .pager{
    &__container{
      margin-top: 1rem;
      padding: 10px 0;
      display: flex;
      justify-content: center;
    }
    &__button{
      border: none;
      margin: 0 5px;
      cursor: pointer;
      opacity: 0.4;
      &:hover {
        opacity: 1;
      }
    }
  }
</style>