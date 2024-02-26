<script setup lang='ts'>
import {reactive} from "vue"
const state = reactive({
  nav:[
   {  title:"用户设置",
      link:[
        {name:"我的账号",path:""},
        {name:"个人资料",path:""},
        {name:"隐私与安全",path:""},
        {name:"已授权的APP",path:""},
        {name:"设备",path:""},
        {name:"连接",path:""},
        {name:"好友请求",path:""},
      ]
    },
    {
      title:"账单设置",
      link:[
        {name:"Nitro",path:""},
        {name:"服务器助力",path:""},
        {name:"订阅",path:""},
        {name:"礼物库",path:""},
        {name:"账单",path:""},
      ]
    },
    {
      title:"APP设置",
      link:[
        {name:"账单",path:""},
        {name:"可访问性",path:""},
        {name:"语音和视频",path:""},
        {name:"文字与图像",path:""},
        {name:"通知",path:""},
        {name:"快捷键",path:""},
        {name:"语言",path:""},
        {name:"主播模式",path:""},
        {name:"高级设置",path:""},
      ]
    },
    { title:"活动设置",
      link:[
        {name:"当前状态隐私",path:""},
        {name:"注册游戏",path:""},
      ]
    }
  ],
})
</script>

<template>
  <div class="setting">
    <el-container>
      <el-aside class="left-nav">
        <div class="nav-item" v-for="item in state.nav" :key="item.title">
          <div class="name">{{item.title}}</div>
          <div class="link-item" v-for="link in item.link " :key="link.name">
            <div class="link is-active">{{link.name}}</div>
          </div>
          <div class="underlink"></div>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style lang='scss' scoped>

.left-nav{


  width: 218px;
  padding: 50px 6px 60px 20px;
  box-sizing: border-box;
  overflow-y: auto;
  height: 100%;
  background-color: rgb(43, 45, 49);
  /* Webkit 浏览器，如 Chrome 和 Safari */
  &::-webkit-scrollbar {
   width: 2px; /* 宽度 */
   height: 5px;
  }
  /* IE 和 Edge */
  *::-ms-scrollbar {
    width: 2px; /* 宽度 */
  }
}
.nav-item{
  width: 192px;
}
.name{
  width: 172px;
  padding: 6px 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .02em;
  color: #949BA4;
  font-size: 12px;
}
.link{
  width: 172px;
  height: 32px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-bottom: 2px;
  border-radius: 4px;
  cursor: pointer;
  color: #B5BAC1;
  font-size: 16px;
  
  &:hover{
  color: #FFFFFF;
  background-color: #4E505899;
  }
}
.underlink{
  width: 172px;
  margin: 8px ;
  height: 1px;
  box-sizing: border-box;
  background-color: rgba(78, 80, 88, 0.48);
}
.el-main{
  margin: 0 !important;
  padding: 0;
}
</style>
