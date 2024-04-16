/**
 * 检查权限（判断当前登录用户是否具有某个权限）
 * @param loginUser 
 * @param needAccess 
 * @return boolean 有无权限
 */
import ACCESS_ENUM from "./accessEnum";

const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
 const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
 //未登录
 if(needAccess === ACCESS_ENUM.NOT_LOGIN){
    return true;
 }
 //登录
 if(needAccess === ACCESS_ENUM.USER){
    if(loginUserAccess === ACCESS_ENUM.NOT_LOGIN){
        return false;
    }
 }
 //管理员
 if(needAccess === ACCESS_ENUM.ADMIN){
    console.log(loginUserAccess);
    
    if(loginUserAccess !== ACCESS_ENUM.ADMIN){
        return false;
    }
 }
 return true;
};

export default checkAccess;