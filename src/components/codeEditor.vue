<template>
    <div id="code-editor" ref="codeEditorRef" style="min-height: 400px; height: 80vh" />
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor'
import {onMounted, ref, toRaw,withDefaults,defineProps, watch} from 'vue'

const codeEditor = ref();
const codeEditorRef = ref();

interface Props {
    value: string;
    language?: string;
    handleChange:(v: string) => void;
}

const props = withDefaults(defineProps<Props>(),{
    value: () => "",
    language: () => "java",
    handleChange: (v: string) => {
        console.log(v);
    },
})

watch(() => props.language, () => {
    if(codeEditor.value){
        monaco.editor.setModelLanguage(toRaw(codeEditor.value).getModel(),props.language);
    }
})

onMounted(() => {
    if(!codeEditorRef.value){
        return;
    }
    codeEditor.value = monaco.editor.create(codeEditorRef.value,{
        value: props.value,
        language: props.language,
        automaticLayout: true,
        minimap: {
            enabled: true,
        }
    });
    codeEditor.value.onDidChangeModelContent(() => {
        // console.log('目前内容为：', toRaw(codeEditor.value).getValue());
        props.handleChange(toRaw(codeEditor.value).getValue());
    });
});
</script>

<style scoped>
</style>