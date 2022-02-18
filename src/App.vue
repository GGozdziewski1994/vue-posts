<script setup>
  import Posts from "./components/Posts.vue"
  import { useStore } from "vuex";
  import { onMounted } from "vue";


  const store = useStore()

  onMounted(() => {
    store.dispatch('fetchData')
  })

</script>

<template>
  <Posts/>
</template>

<style>
  * {
    box-sizing: border-box;
  }
</style>
