<template>
  <div class="home">
    <MdEditor :value="mdValue" :handle-change="onMdChange" />
    <CodeEditor :value="codeValue" :handle-change="onCodeChange" />
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import MdEditor from '@/components/MdEditor.vue'
import CodeEditor from '@/components/codeEditor.vue'
import {ref} from 'vue'

const mdValue = ref();
const onMdChange = (v: string) => {
  mdValue.value = v
}

const codeValue = ref();
const onCodeChange = (v: string) => {
  codeValue.value = v
}
</script>
