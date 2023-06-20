import type { RouteRecordRaw } from 'vue-router';


/** *
 * 静态路由
 */

export const staticRouter:Array<RouteRecordRaw> = [
  {
    path:"/",
    component:() => import("@/views/Home/homePage.vue")
  },
  {
    path:"/login",
    name:"login",
    component:() => import("@/views/Login/userLogin.vue")
  },
  {
    path:"/register",
    name:"register",
    component:() => import("@/views/Login/userRegister.vue")
  },
  {
    path:"/setting",
    name:"setting",
    component:() => import("@/views/Setting/userSetting.vue"),
    children:[
      {   /* 我的账号 */
        path:"/setting/account",
        name:"myAccount",
        component:()=> import("@/views/Setting/myAccount.vue")
      } 
    ],
  },
  {
    path:"/main",
    name:'main',
    component:()=>import("@/views/ChatRoom/index.vue"),
    children:[
      {     /* 私信频道 */
        path:'/main/private',
        name:'private',
        components:{
          channelSide:()=>import('@/views/ChatRoom/channelSide/index.vue'),
          mainChannel:()=>import('@/views/ChatRoom/main/frineds/friendsList.vue')
        }
      },
      {     /*聊天界面  */
        path:'/main/:id',
        name:'chat',
        components:{
          channelSide:()=>import('@/views/ChatRoom/channelSide/index.vue'),
          mainChannel:()=>import('@/views/ChatRoom/main/chat/chatIndex.vue'),
        }
      }
    ]
  },
  
]