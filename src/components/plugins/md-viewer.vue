<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import 'vditor/dist/index.css';
import Vditor from 'vditor';
import { useThemeStore } from '@/store/modules/theme';

const theme = useThemeStore();

interface Props {
  value?: string;
}
const props = withDefaults(defineProps<Props>(), {
  value: () => ''
});

const domRef = ref<HTMLDivElement>();
// let vditor = null
const renderMarkdown = () => {
  Vditor.preview(domRef.value, props.value, {
    theme: {
      current: theme.darkMode ? 'dark' : 'light'
    }
  });
};

onMounted(() => {
  renderMarkdown();
});

watch(
  () => props.value,
  () => {
    renderMarkdown();
  }
);

watch(
  () => theme.darkMode,
  () => {
    renderMarkdown();
  }
);
</script>

<template>
  <div ref="domRef" class="min-h-400px"></div>
</template>

<style lang="scss" scoped></style>
