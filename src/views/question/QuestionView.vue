<template>
  <div id="QusetionView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="名称">
        <a-input v-model="searchParams.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
      </a-form-item>
      <a-form-item>
        <a-button @click="doSubmit">提交</a-button>
      </a-form-item>
    </a-form>

    <a-table 
    :ref="tableRef"
    :columns="columns" 
    :data="dataList"
    :pagination="{
      showTotal: true,
      pageSize: searchParams.pageSize,
      current: searchParams.current,
      total,
    }"
    @page-change="onPageChange"
    >
    <template #tags="{ record }">
      <a-space wrap>
        <a-tag v-for="(tag,index) of record.tags" :key="index" color="green">{{ tag }}</a-tag>
      </a-space>
    </template>
    <template #acceptedRate="{ record }">
        {{`${record.submitNum ? (record.acceptedNum / record.submitNum) : "0"}(${record.acceptedNum}/${record.submitNum})` }}
    </template>
    <template #createTime="{ record }">
        {{ moment(record.createTime).format('YYYY-MM-DD') }}
    </template>
  <template #optional="{ record }">
    <a-space>
      <a-button type="primary" @click="toQuestionPage(record)">去做题</a-button>
    </a-space>
  </template>
</a-table>
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted, watchEffect} from 'vue'
import { QuestionControllerService, QuestionVO, QuestionQueryRequest } from '../../../generated'
import message from "@arco-design/web-vue/es/message"
import { useRouter } from 'vue-router';
import moment from 'moment'
  const show = ref(true)
  const tableRef = ref()
  const dataList = ref([])
  const total = ref(0)
  const searchParams = ref<QuestionQueryRequest>({
    title: '',
    tags: [],
    pageSize: 2,
    current: 1,
  })

  const onPageChange = (page: number) => {
    searchParams.value = {
      ...searchParams.value,
      current: page,
    }
  }

  const loadData = async () => {
    const res = await QuestionControllerService.listQuestionVoByPageUsingPost(searchParams.value)
    if(res.code === 0){
      dataList.value = res.data.records;
      total.value = res.data.total;
    }else{
      message.error('加载失败，' + res.message)
    }
  };

  const doSubmit = () => {
    //重置页号
    searchParams.value = {
      ...searchParams.value,
      current: 1,
    };
    //因为watchEffect在监听loadData的变化，因此不需要再执行loadData方法
    // loadData();
  }

  //loadData发生变化，自动执行loadData，更新页面
  watchEffect(() => {
    loadData();
  })


  const doDelete = async (question: QuestionVO) => {
    console.log(question);
    const res = await QuestionControllerService.deleteQuestionUsingPost({
      id: question.id,
    });
    if(res.code === 0){
      message.success("删除成功")
      loadData();
    } else {
      message.error('删除失败,' + res.message)
    }
  }
  const router = useRouter() 
  const toQuestionPage = (question: QuestionVO) => {
    router.push({
      path:`/view/question/${question.id}`,
    });
  };

  onMounted(() => {
    loadData();
  })

  const columns = [{
    title: '题号',
    dataIndex: 'id'
  }, {
    title: '题目名称',
    dataIndex: 'title'
  }, {
    title: '标签',
    slotName: "tags"
  },{
    title: '通过率',
    slotName: "acceptedRate"
  },{
    title: '创建时间',
    slotName: 'createTime'
  },{
    title: '操作',
    slotName: 'optional'
  }];
</script>

<style scoped>
#manageQuestionView {

}
</style>