import type { RouteRecordRaw } from 'vue-router';


/** *
 * 静态路由
 */

export const staticRouter:Array<RouteRecordRaw> = [
  {
    path:'/:catchAll(.*)',
    component: () => import("@/views/404/notFound.vue")
  },
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
    ]
  },
  {     /*聊天界面  */
  path:'/chat/:id',
  name:'chat',
  component:()=>import('@/views/ChatRoom/main/chat/index.vue'),
  },
  /* 社区聊天 */
  {
    path:'/guild/:guildId/:channelId',
    name:'guildchat',
    component:()=>import('@/views/Guild/GuildChat/index.vue'),
  },
  {
    /* 搜索社区 */
    path:'/guild-discovery',
    name:'guild',
    component:()=>import('@/views/Guild/GuildDiscovery/index.vue'),
  },
  {
    /* 表格列表页 */
    path:'/luckysheet',
    name:'luckeysheet',
    component:() => import('@/views/LuckeySheet/index.vue'),
  },
  {
    /* 多人协作表格 */
    path:'/luckysheet/:Id',
    name:'sheet',
    component:()=> import('@/views/LuckeySheet/SheetMain.vue'),
  },
  /* 论坛 */
  {
    path:'/forum',
    name:'forum',
    component:() => import('@/views/Forum/index.vue'),
    children:[
      {
        path:'/forum/thread/:id',
        name:'post',
        component:() => import('@/views/Forum/threads/Threads.vue'),
      }
    ]
  }

]