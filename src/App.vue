<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
    <router-view />
    </template> 
    <template v-else>
      <BasicLayout />
    </template>
     
  </div>
</template>

<script setup >
import BasicLayout from '@/layout/BasicLayout.vue'
import {onMounted} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute();

const doInit = () => {
  console.log("hello 欢迎");
};
onMounted(() => {
  doInit();
})


</script>

<style>
</style>
