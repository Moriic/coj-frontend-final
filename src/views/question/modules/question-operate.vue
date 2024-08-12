<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const updatePage = route.path.includes('update');

const form = ref({
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
});
//
// const loadData = async () => {
//   const id = route.query.id;
//   if (!id) return;
//
//   const res = await QuestionControllerService.getQuestionByIdUsingGet(id as any);
//   if (res.code === 0) {
//     form.value = res.data as any;
//
//     if (!form.value.judgeCase) {
//       form.value.judgeCase = [{ input: '', output: '' }];
//     } else {
//       form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
//     }
//
//     if (!form.value.judgeConfig) {
//       form.value.judgeConfig = { memoryLimit: 1000, stackLimit: 1000, timeLimit: 1000 };
//     } else {
//       form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
//     }
//
//     if (!form.value.tags) {
//       form.value.tags = [];
//     } else {
//       form.value.tags = JSON.parse(form.value.tags as any);
//     }
//   } else {
//     message.error(`加载失败，${res.message}`);
//   }
// };

onMounted(() => {
  // loadData();
});

const doSubmit = async () => {
  // const res = updatePage
  //   ? await QuestionControllerService.updateQuestionUsingPost(form.value)
  //   : await QuestionControllerService.addQuestionUsingPost(form.value);
  //
  // if (res.code === 0) {
  //   message.success(updatePage ? '更新成功' : '创建成功');
  // } else {
  //   message.error((updatePage ? '更新失败，' : '创建失败，') + res.message);
  // }
};

const handleAdd = () => {
  form.value.judgeCase.push({ input: '', output: '' });
};

const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};

const onContentChange = (value: string) => {
  form.value.content = value;
};

const onAnswerChange = (value: string) => {
  form.value.answer = value;
};
</script>

<template>
  <div id="addQuestionView">
    <NForm :model="form" label-placement="left">
      <NFormItem label="标题" path="title">
        <NInput v-model:value="form.title" placeholder="请输入标题" />
      </NFormItem>

      <NFormItem label="标签" path="tags">
        <NInput v-model:value="form.tags" placeholder="请选择标签" clearable />
      </NFormItem>

      <NFormItem label="题目内容" path="content">
        <MdEditor :value="form.content" @handle-change="onContentChange" />
      </NFormItem>

      <NFormItem label="答案" path="answer">
        <MdEditor :value="form.answer" @handle-change="onAnswerChange" />
      </NFormItem>

      <NFormItem label="判题配置">
        <NSpace vertical>
          <NFormItem label="时间限制" path="judgeConfig.timeLimit">
            <NInputNumber v-model:value="form.judgeConfig.timeLimit" placeholder="请输入时间限制" :min="0" />
          </NFormItem>

          <NFormItem label="内存限制" path="judgeConfig.memoryLimit">
            <NInputNumber v-model:value="form.judgeConfig.memoryLimit" placeholder="请输入内存限制" :min="0" />
          </NFormItem>

          <NFormItem label="堆栈限制" path="judgeConfig.stackLimit">
            <NInputNumber v-model:value="form.judgeConfig.stackLimit" placeholder="请输入堆栈限制" :min="0" />
          </NFormItem>
        </NSpace>
      </NFormItem>

      <NFormItem label="测试用例配置">
        <NSpace vertical>
          <NSpace v-for="(judgeCaseItem, index) in form.judgeCase" :key="index" vertical>
            <NFormItem :label="`输入用例-${index}`" :path="`judgeCase[${index}].input`">
              <NInput v-model:value="judgeCaseItem.input" placeholder="请输入测试输入用例" />
            </NFormItem>

            <NFormItem :label="`输出用例-${index}`" :path="`judgeCase[${index}].output`">
              <NInput v-model:value="judgeCaseItem.output" placeholder="请输入测试输出用例" />
            </NFormItem>

            <NButton text type="error" @click="handleDelete(index)">删除</NButton>
          </NSpace>
        </NSpace>

        <NButton type="primary" style="margin-top: 16px" @click="handleAdd">新增测试用例</NButton>
      </NFormItem>

      <NFormItem>
        <NButton type="primary" style="min-width: 200px" @click="doSubmit">提交</NButton>
      </NFormItem>
    </NForm>
  </div>
</template>

<style scoped>
#addQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
