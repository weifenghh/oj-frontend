<template>
    <div class="menu-demo">
        <a-row class="grid-demo" align="center" :wrap="false">
        <a-col flex="auto">
            <a-menu mode="horizontal" :selected-keys="selectedKeys" @menu-item-click="doMenuClick">
      <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
        <div
          :style="{
            width: '80px',
            height: '30px',
            borderRadius: '2px',
            background: 'var(--color-fill-3)',
            cursor: 'text',
          }"
        />
      </a-menu-item>
      <a-menu-item v-for="item in visibleRoutes" :key="item.path">{{ item.name }}</a-menu-item>
    </a-menu>
        </a-col>
        <a-col flex="100px">
            <div>{{ store.state.user.loginUser.userName }}</div>
        </a-col>
        </a-row>  
    
  </div>
</template>

<script lang="ts" setup>
import {routes} from '../router/routes'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {ref,computed} from 'vue'
import checkAccess from '@/access/checkAccess'
import ACCESS_ENUM from '../access/accessEnum'

const router = useRouter();
const store = useStore();


//展示再菜单的路由数组
const visibleRoutes = computed(() =>{
  return routes.filter((item,index) => {
  if(item.meta?.hideInMenu){
    return false;
  }
  //根据条件过滤菜单
  if(!checkAccess(store.state.user.loginUser, item?.meta?.access as string)){
    return false;
  }
  return true;
});
});

const selectedKeys = ref(["/"])
router.afterEach((to,from,failure) => {
    selectedKeys.value = [to.path];
});

setTimeout(() => {
    store.dispatch("user/getLoginUser", {
        userName:'wf',
        userRole: ACCESS_ENUM.ADMIN
    })
},3000)

const doMenuClick = (key: string) => {
router.push({
    path: key,
});
};

</script>

<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>