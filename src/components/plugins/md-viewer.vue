<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import 'vditor/dist/index.css';
import Vditor from 'vditor';

interface Props {
  value?: string;
}
const props = withDefaults(defineProps<Props>(), {
  value: () => ''
});

const domRef = ref<HTMLDivElement>();

const renderMarkdown = () => {
  Vditor.preview(domRef.value, props.value, {});
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
</script>

<template>
  <div ref="domRef" class="min-h-400px"></div>
</template>

<style lang="scss" scoped></style>
