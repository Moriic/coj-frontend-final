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
    Vditor.setContentTheme(
      theme.darkMode ? 'dark' : 'light',
      'https://cdn.jsdelivr.net/npm/vditor/dist/css/content-theme'
    );
    Vditor.setCodeTheme(theme.darkMode ? 'native' : 'abap', 'https://cdn.jsdelivr.net/npm/vditor');
  }
);
</script>

<template>
  <div ref="domRef" class="min-h-400px"></div>
</template>

<style lang="scss" scoped></style>
