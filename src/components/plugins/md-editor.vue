<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useThemeStore } from '@/store/modules/theme';

const theme = useThemeStore();

interface Emits {
  (e: 'handleChange', v: string): void;
}

const emit = defineEmits<Emits>();

interface Props {
  value?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: ''
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
      emit('handleChange', value);
    }
  });
}

watch(
  () => props.value,
  () => {
    vditor.value?.setValue(props.value);
  }
);

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
    <div ref="domRef"></div>
  </div>
</template>

<style scoped></style>
