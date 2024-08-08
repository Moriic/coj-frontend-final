<script setup lang="ts">
import { computed, defineProps, onMounted, ref, withDefaults } from 'vue';
import { useAppStore } from '@/store/modules/app';
// import message from '@arco-design/web-vue/es/message';
// import type { QuestionSubmitAddRequest, QuestionVO } from '../../../generated';
// import { QuestionControllerService } from '../../../generated';
//
// interface Props {
//   id: string;
// }
//
// const props = withDefaults(defineProps<Props>(), {
//   id: () => ''
// });
//
// const question = ref<QuestionVO>();
//
// const loadData = async () => {
//   const res = await QuestionControllerService.getQuestionVoByIdUsingGet(props.id as any);
//   if (res.code === 0) {
//     question.value = res.data;
//   } else {
//     message.error(`加载失败，${res.message}`);
//   }
// };
//
const form = ref({
  language: 'java',
  code:
    'import java.util.*;\n' +
    '\n' +
    'public class Main {\n' +
    '\tpublic static void main(String[] args) {\n' +
    '\t  Scanner scanner = new Scanner(System.in);\n' +
    '        int a = scanner.nextInt();\n' +
    '        int b = scanner.nextInt();\n' +
    '        System.out.println(a + b);\n' +
    '\t}\n' +
    '}'
});
//
// /** 提交代码 */
// const doSubmit = async () => {
//   if (!question.value?.id) {
//     return;
//   }
//
//   const res = await QuestionControllerService.doQuestionSubmitUsingPost({
//     ...form.value,
//     questionId: question.value.id
//   });
//   if (res.code === 0) {
//     message.success('提交成功');
//   } else {
//     message.error(`提交失败,${res.message}`);
//   }
// };

// /** 页面加载时，请求数据 */
// onMounted(() => {
//   loadData();
// });
//
const changeCode = (value: string) => {
  form.value.code = value;
};
const appStore = useAppStore();
const gap = computed(() => (appStore.isMobile ? 0 : 16));
const items = [
  { id: 'gaode', label: '高德地图' },
  { id: 'tencent', label: '腾讯地图' },
  { id: 'baidu', label: '百度地图' }
];
</script>

<template>
  <div class="h-full">
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi span="24 s:24 m:12">
        <NCard class="card-wrapper">
          <NTabs type="line">
            <NTabPane v-for="item in items" :key="item.id" :name="item.id" :tab="item.label"></NTabPane>
          </NTabs>
        </NCard>
      </NGi>
      <NGi span="24 s:24 m:12">
        <NCard class="card-wrapper">
          <CodeEditor :value="form.code as string" :language="form.language" :handle-change="changeCode" />
        </NCard>
      </NGi>
    </NGrid>
  </div>
</template>

<style></style>
