<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { h } from 'vue';
import { fetchBatchDeleteQuestion, fetchDeleteQuestion, fetchGetQuestionVOList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
// import { enableStatusRecord, userGenderRecord } from '@/constants/business';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useRouterPush } from '@/hooks/common/router';
import QuestionOperate from '@/views/question/modules/question-operate.vue';
// import UserOperateDrawer from './modules/user-operate-drawer.vue';
// import UserSearch from './modules/user-search.vue';

const appStore = useAppStore();
const { routerPushByKey } = useRouterPush();
const goDoQuestion = (id: string, title: string) => {
  routerPushByKey('do-question', {
    query: { title },
    params: { id }
  });
};

const handleDelete = async (id: string) => {
  const { error } = await fetchDeleteQuestion(id);
  if (!error) {
    await onDeleted();
  }
};

const edit = (id: string) => {
  handleEdit(id);
};

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetQuestionVOList,
  showTotal: true,
  apiParams: {
    current: 1,
    pageSize: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    tags: null,
    content: null,
    title: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: '序号',
      align: 'center',
      width: 64
    },
    {
      key: 'title',
      title: '题目名称',
      align: 'center',
      minWidth: 100
    },
    {
      key: 'tags',
      title: '标签',
      align: 'center',
      render: row => {
        return row.tags.map((tag: string, index: number) =>
          h(
            NTag,
            {
              type: 'primary',
              key: index,
              style: { marginRight: '8px' }
            },
            {
              default: () => tag
            }
          )
        );
      }
    },
    {
      key: 'passRate',
      title: '通过率',
      align: 'center',
      render: row => {
        return row.submitNum === 0 ? '0.0%' : `${((row.acceptedNum / row.submitNum) * 100).toFixed(2)}%`;
      }
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" size="small" onClick={() => goDoQuestion(row.id, row.title)}>
            做题
          </NButton>
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

const handleBatchDelete = async () => {
  const { error } = await fetchBatchDeleteQuestion(checkedRowKeys.value);
  if (!error) {
    await onBatchDeleted();
  }
};
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <!--    <UserSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />-->
    <NCard title="题目列表" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <QuestionOperate
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
