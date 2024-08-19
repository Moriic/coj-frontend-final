<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { DataTableColumns } from 'naive-ui';
import { NButton, NSpin, NTag } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
import { useTabStore } from '@/store/modules/tab';
import { fetchGetQuestionVOById, fetchGetSubmitById, fetchGetSubmitList, fetchSubmitQuestion } from '@/service/api';
import QuestionSubmitVO = Api.Question.QuestionSubmitVO;

const submitParams = ref<Api.Question.QuestionSubmit>({
  questionId: '',
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

const recordParams = ref<Api.Question.SubmitRecordParams>({
  questionId: '',
  language: 'java',
  status: -1,
  sortField: 'create_time',
  sortOrder: 'descend'
});

const tabStore = useTabStore();

interface Props {
  id: string;
}

const props = defineProps<Props>();
const route = useRoute();
const appStore = useAppStore();
const gap = computed(() => (appStore.isMobile ? 0 : 16));
const activeTab = ref();
const question = ref<Api.Question.QuestionVO | null>();
const submitRecord = ref<Api.Question.QuestionSubmitVO[] | null>();
const visible = ref(false);
let intervalId: any;
const options = [
  {
    value: 'java',
    label: 'java'
  },
  {
    value: 'cpp',
    label: 'cpp',
    disabled: true
  },
  {
    value: 'go',
    label: 'go',
    disabled: true
  }
];
const recordColumns: DataTableColumns<Api.Question.QuestionSubmitVO> = [
  {
    key: 'message',
    title: '结果',
    render: row => {
      if (row.judgeInfo?.message === '判题中') {
        return h('div', { class: 'flex gap-5px' }, [h(NSpin, { size: 'small' }), '判题中']);
      }
      return h(
        NTag,
        {
          type: row.judgeInfo?.message === 'Accepted' ? 'success' : 'error',
          style: { marginRight: '8px' },
          size: 'small'
        },
        {
          default: () => row.judgeInfo?.message
        }
      );
    }
  },
  {
    key: 'language',
    title: '编程语言'
  },
  {
    key: 'time',
    title: '执行用时',
    render: row => `${row.judgeInfo?.time}ms`
  },
  {
    key: 'createTime',
    title: '提交时间'
  },
  {
    key: 'operator',
    title: '操作',
    render: row => {
      return h(
        NButton,
        {
          type: 'primary',
          size: 'small',
          onClick: () => {
            visible.value = true;
          }
        },
        {
          default: () => '查看详情'
        }
      );
    }
  }
];

const loading: QuestionSubmitVO = {
  judgeInfo: {
    message: '判题中',
    time: '---'
  },
  language: submitParams.value.language,
  createTime: '---'
};
const getQuestion = async () => {
  const { data } = await fetchGetQuestionVOById(props.id);
  question.value = data;
};

const getSubmitRecord = async () => {
  const { data } = await fetchGetSubmitList(recordParams.value);
  submitRecord.value = data;
};

const changeCode = (value: string) => {
  submitParams.value.code = value;
};

const submitQuestion = async () => {
  const { data: id, error } = await fetchSubmitQuestion(submitParams.value);
  if (!error) {
    window.$message?.success('提交成功');
    submitRecord.value?.unshift(loading);
    activeTab.value = 'submitRecord';
    intervalId = setInterval(async () => {
      const { data: submit } = await fetchGetSubmitById(id);
      if (submit?.status === 2 || submit?.status === 3) {
        clearInterval(intervalId); // 停止定时器
        await getSubmitRecord();
      }
    }, 2000); // 每隔 2 秒执行一次
  }
};

onMounted(() => {
  tabStore.setTabLabel(route.query.title as string);
  submitParams.value.questionId = props.id;
  recordParams.value.questionId = props.id;

  getQuestion();
  getSubmitRecord();
});
</script>

<template>
  <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
    <NGi span="24 s:24 m:12">
      <div class="h-full min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
        <NCard class="sm:flex-1-hidden card-wrapper card-wrapper" content-style="padding: 0px 20px">
          <NTabs v-model:value="activeTab" type="line" animated>
            <NTabPane name="description" tab="题目描述">
              <MdViewer :value="question?.content || ''"></MdViewer>
            </NTabPane>
            <NTabPane name="submitRecord" tab="提交记录">
              <NDataTable :columns="recordColumns" :data="submitRecord" />
            </NTabPane>
            <NTabPane name="answer" tab="题解" disabled></NTabPane>
          </NTabs>
        </NCard>
      </div>
    </NGi>
    <NGi span="24 s:24 m:12">
      <div class="h-full min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
        <NCard class="sm:flex-1-hidden card-wrapper card-wrapper" size="small">
          <template #header>
            <div class="flex justify-between p-x-10px">
              <div class="flex gap-5">
                <span>代码编写</span>
                <NSelect v-model:value="submitParams.language" size="small" :options="options" class="w-100px" />
              </div>
              <NButton strong size="small" round type="success" @click="submitQuestion">提交代码</NButton>
            </div>
          </template>

          <CodeEditor
            :value="submitParams.code as string"
            :language="submitParams.language"
            :handle-change="changeCode"
          />
        </NCard>
      </div>
    </NGi>
  </NGrid>
</template>

<style scoped></style>
