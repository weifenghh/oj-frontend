<template>
    <div id="manageQusetion">
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
    <template #optional="{ record }">
      <a-space>
        <a-button type="primary" @click="doUpdate(record)">修改</a-button>
      <a-button status="danger" @click="doDelete(record)">删除</a-button>
      </a-space>
    </template>
  </a-table>
    </div>
</template>

<script setup lang="ts">
import {ref,onMounted, watchEffect} from 'vue'
import { QuestionControllerService, QuestionVO } from '../../../generated'
import message from "@arco-design/web-vue/es/message"
import { useRouter } from 'vue-router';
    const show = ref(true)
    const tableRef = ref()
    const dataList = ref([])
    const total = ref(0)
    const searchParams = ref({
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
    const doUpdate = (question: QuestionVO) => {
      console.log(question);
      router.push({
        path:"/update/question",
        query:{
          id: question.id
        },
      });
    };

    onMounted(() => {
      loadData();
    })

    const columns = [{
      title: 'id',
      dataIndex: 'id',
    }, {
      title: 'title',
      dataIndex: 'title',
    }, {
      title: 'content',
      dataIndex: 'content',
    }, {
      title: 'tags',
      dataIndex: 'tags',
    },{
      title: 'submitNum',
      dataIndex: 'submitNum'
    },{
      title: 'answer',
      dataIndex: 'answer'
    },{
      title: 'acceptNum',
      dataIndex: 'acceptNum'
    },
    {
      title: 'userId',
      dataIndex: 'userId'
    },{
      title: 'createTime',
      dataIndex: 'createTime'
    },{
      title: 'judgeCase',
      dataIndex: 'judgeCase'
    },{
      title: 'judgeConfig',
      dataIndex: 'judgeConfig'
    },{
      title: 'Optional',
      slotName: 'optional'
    }];
</script>

<style scoped>
#manageQuestionView {

}
</style>