<template>
  <div id="userLoginView">
    <h2>用户登录</h2>
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
    <a-form-item field="userAccount" tooltip="请输入账号" label="账号">
      <a-input
        v-model="form.userAccount"
        placeholder="请输入账号"
      />
    </a-form-item>
    <a-form-item field="userPassword" tooltip="密码不小于八位" label="密码">
      <a-input-password v-model="form.userPassword" placeholder="请输入密码" />
    </a-form-item>
    <!-- <a-form-item field="isRead">
      <a-checkbox v-model="form.isRead"> I have read the manual </a-checkbox>
    </a-form-item> -->
    <a-form-item>
      <a-button html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import { UserLoginRequest,UserControllerService } from '../../../generated';
import message from '@arco-design/web-vue/es/message'

const router = useRouter()
const store = useStore()

//表单对象 
const form = reactive({
  userAccount: '',
      userPassword: '',
} as UserLoginRequest);
//提交表单
    const handleSubmit = async() => {
      const res = await UserControllerService.userLoginUsingPost(form);
      if(res.code === 0){
        await store.dispatch('user/getLoginUser');
        // alert('登录成功' + JSON.stringify(res.data))
        router.push({
          path: '/',
          replace: true
        });
      }else{
        message.error('登录失败,' + res.message)
      }
    };

</script>
