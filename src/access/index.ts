import router from '@/router'
import store from '@/store'
import ACCESS_ENUM from '@/access/accessEnum';
import checkAccess from '@/access/checkAccess';

router.beforeEach(async (to,from,next) => {
    console.log('登录用戶信息',store.state.user.loginUser);
    
if(to.meta?.access === 'canAdmin'){
  if(store.state.user.loginUser?.role !== 'admin') {
    console.log(store.state.user.loginUser?.role);
    next('/noAuth');
    return;
  }
}

let loginUser = store.state.user.loginUser;
//自动登录
if(!loginUser || !loginUser.userRole){
  await store.dispatch('user/getLoginUser');
  loginUser = store.state.user.loginUser;
}
const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
//要跳转的页面必须要登录
if(needAccess != ACCESS_ENUM.NOT_LOGIN){
  //如果没有登录，台哦转到登录页面
  if(!loginUser || !loginUser.userRole || loginUser.userRole === ACCESS_ENUM.NOT_LOGIN){
    next(`/user/login?redirect=${to.fullPath}`)
    return;
  }
  if(!checkAccess(loginUser,needAccess)){
    next('/noAuth');
    return;
  }
}

next();
});