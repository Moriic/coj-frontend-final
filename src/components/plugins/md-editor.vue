<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useThemeStore } from '@/store/modules/theme';

const theme = useThemeStore();

interface Props {
  visible?: boolean;
}

const props = defineProps<Props>();
const content = defineModel<string>('content');

const vditor = ref<Vditor>();
const domRef = ref<HTMLElement>();

const renderVditor = () => {
  if (!domRef.value) return;
  vditor.value = new Vditor(domRef.value, {
    minHeight: 400,
    theme: theme.darkMode ? 'dark' : 'classic',
    icon: 'material',
    cache: { enable: false },
    preview: {
      theme: {
        current: theme.darkMode ? 'dark' : 'light'
      }
    },
    after() {
      vditor.value?.setValue(content.value);
    },
    input(value) {
      content.value = value;
    }
  });
};

onMounted(() => {
  renderVditor();
});

watch(
  () => props.visible,
  () => {
    vditor.value?.setValue(content.value);
  }
);

watch(
  () => theme.darkMode,
  () => {
    vditor.value?.setTheme(theme.darkMode ? 'dark' : 'classic', theme.darkMode ? 'dark' : 'light');
  }
);
</script>

<template>
  <div class="h-full">
    <div ref="domRef"></div>
  </div>
</template>

<style scoped></style>
