import {RouteRecordRaw} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NoAuthView from '@/views/NoAuthView.vue'
import AdminView from '@/views/AdminView.vue'
import ACCESS_ENUM from '@/access/accessEnum'
import UserLayout from '@/layout/UserLayout.vue'
import UserLoginView from '@/views/user/UserLoginView.vue'
import UserRegisterView from '@/views/user/UserRegisterView.vue'
import AddQuestionView from '@/views/question/AddQuestionView.vue'
import ManageQuestonView from '@/views/question/ManageQuestionView.vue'
import QuestionView from '@/views/question/QuestionView.vue'
import ViewQuestionView from '@/views/question/ViewQuestionView.vue'
import QuestionSubmitView from '@/views/question/QuestionSubmitView.vue'
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: '用户',
    component: UserLayout,
    children: [
      {
        path: '/user/login',
        name: '用户登录',
        component: UserLoginView,
      },
      {
        path: '/user/register',
        name: '用户注册',
        component: UserRegisterView,
      },
    ]
  },
  {
    path: '/',
    name: '首页',
    component: QuestionView,
  },
  {
    path: '/view/question/:id',
    name:'在线做题',
    component:ViewQuestionView,
    props: true,
    meta:{
      access: ACCESS_ENUM.ADMIN
    }
  },
    {
      path: '/add/question',
      name: '创建题目',
      component: AddQuestionView,
      meta: {
        access: ACCESS_ENUM.ADMIN
      }
    },
    {
      path: '/manage/question',
      name: '管理题目',
      component: ManageQuestonView,
      meta: {
        access: ACCESS_ENUM.ADMIN
      }
    },
    {
      path: '/update/question',
      name: '更新题目',
      component: AddQuestionView,
      meta: {
        access: ACCESS_ENUM.ADMIN
      }
    },
    {
      path: '/questions',
      name: '浏览题目',
      component: QuestionView,
    },
    {
      path: '/question_submit',
      name: '浏览题目提交',
      component: QuestionSubmitView,
    },
    {
        path: '/noAuth',
        name: '无权限',
        component: NoAuthView,
        meta: {
          access: ACCESS_ENUM.ADMIN
        }
      }
  ]