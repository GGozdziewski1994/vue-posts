<script setup>
import Post from "./Post.vue";
import Pager from "./Pager.vue"
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();
const postPageCount = computed(() => store.getters.postPageCount);
const currentPostPage = computed(() => store.getters.currentPostPage);
const posts = computed(() => store.getters.postPage);

const changePage = pageIndex => {
  store.commit('setPage', pageIndex)
}

const removePost = postId => {
  store.commit("removePost", postId)
}
</script>

<template>
    <div class="posts__container">
    <h1 class="posts__title">Posts</h1>
    <div class="posts__list-container">
        <ul class="posts__list">
            <li class="posts__list-post" v-for="post in posts" :key="post.id">
              <Post :data="post" @remove="removePost"/>
            </li>
        </ul>
    </div>
    <Pager :size="postPageCount" :current="currentPostPage"  @change="changePage"/>
    </div>
</template>

<style lang="scss">
  .posts{
    &__container{
      max-width: 900px;
      min-height: 100vh;
      margin: 0 auto;
      background: #EEE;
      padding: 20px;
    }
    &__title{
      margin: 20px;
      text-align: center;
    }
    &__list-container{
      border: 1px solid #888;
      width: 100%;
      height: 100%;
    }
    &__list{
      list-style: none;
      padding: 0;
      &-post:nth-child(2n){
        padding: 2px 0;
        background: wheat;
      }
    }
  }
</style>