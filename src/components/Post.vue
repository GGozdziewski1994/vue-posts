<script setup>
import { ref } from "vue";

const props = defineProps({
  data: Object
})

const emits = defineEmits(['remove'])

const isExpand = ref(false)

const toggle = () => {
  isExpand.value = !isExpand.value;
}

const rm = () => {
  emits('remove', props.data.id)
}

const author = (data) => {
  return data[0].toUpperCase() + data.slice(1);
}
</script>

<template>
  <div class="post__container">
    <div class="post__title">
      Title: <span class="post__weight">{{author(data.title)}}</span>
    </div>
    <div class="post__author">
      Author: <span class="post__weight">{{data?.author?.name  || ''}}</span>
    </div>
    <div :class="['post__content', isExpand ? 'post__content--expanded': '']">
      {{author(data.body)}}
    </div>
    <button @click="toggle" class="post__button-more">
      {{isExpand ? 'less' : 'more'}}
    </button>
    <button @click="rm" class="post__button-rm">
      remove
    </button>
  </div>
</template>

<style lang="scss">
.post{
  &__container{
    margin: 10px;
    display: grid;
    grid-template-areas:
    "title empty author"
    "content content content"
    "remove summary more";
  }
  &__title{
    grid-area: title;
  }
  &__author{
    grid-area: author;
    min-width: 50px;
    text-align: right;
  }
  &__weight {
    font-weight: bold;
  }
  &__content{
    margin: 10px 0;
    grid-area: content;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    &--expanded{
      -webkit-line-clamp: unset;
    }
  }
  &__button-more, &__button-rm{
    width: 4rem;
    margin-top: 5px;
    padding: 5px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    color: #494747;
  }
  &__button-more{
    background: #a4a4a4;
    grid-area: more;
    justify-self: end;
    &:hover {
      background: #757474;
    }
  }
  &__button-rm{
    background: #e78379;
    grid-area: remove;
    &:hover {
      background: #ee5445;
    }
  }
}
</style>