<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { onMounted, ref, watch } from 'vue';
import { useThemeStore } from '@/store/modules/theme';

/** 定义组件属性类型 */
interface Props {
  value?: string;
  language?: string;
}

/** 给组件指定初始值 */
const props = withDefaults(defineProps<Props>(), {
  value: () => '',
  language: () => 'java'
});

const theme = useThemeStore();
const codeEditorRef = ref();
const codeEditor = ref();

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true
    },
    readOnly: true,
    theme: theme.darkMode ? 'vs-dark' : 'vs',
    overviewRulerBorder: false, // 滚动是否有边框
    scrollbar: {
      verticalScrollbarSize: 4, // 垂直滚动条宽度，默认px
      horizontalScrollbarSize: 4 // 水平滚动条高度
    }
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  });
});

watch(
  () => theme.darkMode,
  () => {
    monaco.editor.setTheme(theme.darkMode ? 'vs-dark' : 'vs');
  }
);
</script>

<template>
  <div id="code-editor" ref="codeEditorRef" class="h-full min-h-400px" />
</template>

<style scoped></style>
