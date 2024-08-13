<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { fetchUpdateQuestion } from '@/service/api';

interface Props {
  operateType: NaiveUI.TableOperateType;
  rowData: Api.Question.QuestionVO | null;
}
interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const props = defineProps<Props>();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '添加题目',
    edit: '编辑题目'
  };
  return titles[props.operateType];
});
const model = reactive(createDefaultModel());
const visible = defineModel<boolean>('visible', {
  default: false
});
function createDefaultModel() {
  return {
    title: '',
    tags: [],
    answer: '',
    content: '',
    judgeConfig: {
      memoryLimit: 1000,
      stackLimit: 1000,
      timeLimit: 1000
    },
    judgeCase: [
      {
        input: '',
        output: ''
      }
    ]
  };
}

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}
const onContentChange = (value: string) => {
  model.content = value;
};

// const onAnswerChange = (value: string) => {
//   model.answer = value;
// };
function closeDrawer() {
  visible.value = false;
}
const onCreate = () => {
  return {
    input: '',
    output: ''
  };
};

async function handleSubmit() {
  // request
  // const res = updatePage
  //   ? await QuestionControllerService.updateQuestionUsingPost(form.value)
  //   : await QuestionControllerService.addQuestionUsingPost(form.value);
  //
  // if (res.code === 0) {
  //   message.success(updatePage ? '更新成功' : '创建成功');
  // } else {
  //   message.error((updatePage ? '更新失败，' : '创建失败，') + res.message);
  // }
  const { error } = await fetchUpdateQuestion(model);
  if (!error) {
    window.$message?.success('更新成功');
  }
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="900">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      {{ model.content }}
      <NForm :model="rowData" label-placement="left" label-width="100">
        <NFormItem label="标题" path="title" required>
          <NInput v-model:value="model.title" placeholder="请输入标题" />
        </NFormItem>
        <NFormItem label="标签" path="tags">
          <NDynamicTags v-model:value="model.tags" type="primary" />
        </NFormItem>
        <NFormItem label="题目内容" path="content">
          <MdEditor :value="model.content" @handle-change="onContentChange" />
        </NFormItem>
        <!--        <NFormItem label="答案" path="answer">-->
        <!--          <MdEditor :value="model.answer" @handle-change="onAnswerChange" />-->
        <!--        </NFormItem>-->

        <NFormItem label="判题配置">
          <NSpace vertical>
            <NFormItem label="时间限制" path="judgeConfig.timeLimit">
              <NInput v-model:value="model.judgeConfig.timeLimit" placeholder="请输入时间限制" :min="0" />
            </NFormItem>

            <NFormItem label="内存限制" path="judgeConfig.memoryLimit">
              <NInput v-model:value="model.judgeConfig.memoryLimit" placeholder="请输入内存限制" :min="0" />
            </NFormItem>

            <NFormItem label="堆栈限制" path="judgeConfig.stackLimit">
              <NInput v-model:value="model.judgeConfig.stackLimit" placeholder="请输入堆栈限制" :min="0" />
            </NFormItem>
          </NSpace>
        </NFormItem>
        <NFormItem label="测试用例配置">
          <NDynamicInput
            v-model:value="model.judgeCase"
            item-style="margin-bottom: 0;"
            #="{ index }"
            :on-create="onCreate"
          >
            <div class="flex gap-15px">
              <NFormItem :show-label="false">
                <NInput v-model:value="model.judgeCase[index].input" placeholder="输入" @keydown.enter.prevent />
              </NFormItem>
              <NFormItem :show-label="false">
                <NInput v-model:value="model.judgeCase[index].output" placeholder="输出" @keydown.enter.prevent />
              </NFormItem>
            </div>
          </NDynamicInput>
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">取消</NButton>
          <NButton type="primary" @click="handleSubmit">确认</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
#addQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
