<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useThemeStore } from '@/store/modules/theme';

const theme = useThemeStore();

interface Props {
  value?: string;
  handleChange?: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  handleChange: () => {}
});

const vditor = ref<Vditor>();
const domRef = ref<HTMLElement>();

function renderVditor() {
  if (!domRef.value) return;
  vditor.value = new Vditor(domRef.value, {
    minHeight: 400,
    theme: theme.darkMode ? 'dark' : 'classic',
    icon: 'material',
    cache: { enable: false },
    after() {
      vditor.value?.setValue(props.value);
    },
    input(value) {
      props.handleChange(value);
    }
  });
}

const stopHandle = watch(
  () => theme.darkMode,
  newValue => {
    const themeMode = newValue ? 'dark' : 'classic';
    vditor.value?.setTheme(themeMode);
  }
);

onMounted(() => {
  renderVditor();
});

onUnmounted(() => {
  stopHandle();
});
</script>

<template>
  <div class="h-full">
    <NCard title="markdown插件" :bordered="false" class="card-wrapper">
      <div ref="domRef"></div>
    </NCard>
  </div>
</template>

<style scoped></style>
