<script setup lang='ts'>
import friendsStatu from '@/components/friendsStatu.vue';
import {reactive, onMounted } from "vue"
import type { information ,message } from '@/stores/interface/information'
import { useRouter } from "vue-router"
import axios from '@/axios';
const route = useRouter()
const method = reactive({
  init_information() {
     axios('/information/public',{
      data:{ uuid: state.uuid }
    }).then((res)=>{
      const data = res.data.data
      state.information = data.information
      state.information.create_time = state.information.create_time.slice(0,10)
      state.information.last_login_time = state.information.last_login_time?.slice(0,10)
    })
  },
})
onMounted(()=>{
  state.uuid = route.currentRoute.value.params.id as string   //传入的不会是数组
  method.init_information()
})
const state = reactive({
  uuid:'',
  information : {} as information,
  friend:{
    id:1,
    name:'一号朋友',
    statu:'在线',background:new URL('@/assets/images/fox.gif',import.meta.url).href,
    avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href,
    introduction:'自我介绍--初次见面',
    register_time:'2022-11-18',
    note:''
  },
  remark:'',
  comment_server:[
    {id:0,img:new URL('@/assets/images/icn.jpg',import.meta.url).href,name:'一号服务器'},
  ],
})

</script>

<template>
  <div class="information" style="padding-right: 0;">
    <div class="pannelBanner bannerPremium" style="background-color: #1f2123;">
      <div class="head-box" >
        <el-image :src="state.information.avator_url || `src/assets/images/avatar.jpg`"  class="headstyle"></el-image>
        <el-tooltip
          effect="dark"
          :content="'真的'"
          placement="top"
          style="margin-left: 10px;"
        >
          <friendsStatu :status=state.information.status class="status-"></friendsStatu>
        </el-tooltip>
        <img class="background-img" :src="state.friend.background" >
      </div>
    </div>

    <div class="right-card first-card">
      <div class="friend-name">
        <span>{{state.information.user_name}}</span>
      </div>
      <div class="line"></div>
      <h2 class="user-des">自我介绍</h2>
      <div>
        <span class="user-text">{{state.information.note}}</span>
      </div>
      <div class="line"></div>
      <h2 class="user-des">用户注册时间</h2>
      <div>
        <span class="user-text">{{state.information.create_time}}</span>
      </div>
      <div class="line"></div>
      <h2 class="user-des">上次登录时间</h2>
      <div>
        <span class="user-text">{{state.information.last_login_time}}</span>
      </div>

    
    </div>

    <div class="right-card">
        <div class="friend-name">
          <div v-if="state.comment_server.length != 0">
            <span class="comment-server-num">{{state.comment_server.length}}个共同服务器</span>
            <div class="comment-server">
              <div class="comment-server-item">
                <div class="comment-server-img"
                  v-for="item in state.comment_server" :key="item.id"
                >
                  <img :src="item.img" >
                  <span>{{item.name}}</span>
                </div>
              </div>
            </div>
          </div>
          <span v-else>暂无共同服务器</span>
        </div>
      </div>

  </div>
</template>

<style lang='scss' scoped>
.information{
  // height: 100vh;
  position: relative;
  box-sizing: border-box;
  min-height: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex:1 1 auto;
  overflow-y: auto;
  background: linear-gradient(180deg,#000,#3e0a3e);
  &::-webkit-scrollbar{
    width: 8px;
    //height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #1a1b1e;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #2b2d31;
  }
}
.pannelBanner{
  height: 120px;
  background-color: #1f2123;
}
.bannerPremium {
  -webkit-transition: background-color 0.1s;
  transition: background-color 0.1s;
  width: 100%;
}

.head-box{
  display: flex;
}

.el-image{
  margin-top: 75px;
  margin-left: 23px;
  display: inline-block;
  border-radius: 50%;
  border-style: solid;
  border-width: 3px;
  border-color: #1f1f1f;
}
.headstyle{
  width: 80px;
  height: 80px;
  z-index: 1;
  position: relative;
}
/* 当前状态 */
.status-{
  margin-top: 150px;
  z-index: 1;
  border-radius: 50%;
  margin-left: -26px;
}
.background-img{
  width: 100%;
  height: 120px;
  object-fit: cover;
  position: absolute;
  top:0;
  left: 0;
}

.right-card{
  border-radius: 8px;
  width: 80%;
  margin-left: 24px;
  margin-top: 38px;
  line-height: 24px;
  border-color: #b1b5bc;
  padding: 12px 12px 12px ;
  background: linear-gradient(135deg,#19061a 0%,#000 100%);
  &:last-child{
    margin-bottom: 80px;
  }
}
.friend-name{
  font-size: 20px;
  line-height: 24px;
  word-break: break-word;
  white-space: normal;
  -webkit-box-align: end;
  color: white;
  span{
    font-size: 16px;
    color: #dbdee1;
  }
  .comment-server-num{
    display: inline-block;
    font-size: 14px;
    color: #dbdee1;
    margin-bottom: 10px;
    &:hover{
      cursor: pointer;
    }
  }
}
.line{
  margin: 10px 0;
  height: 1px;
  position: sticky;
  top: 0;
  background-color: darkgray;
}

.user-des{
  font-size: 12px;
  line-height: 16px;
  margin-top: 8px;
  color: white;
}
.user-text{
  font-size: 10px;
  line-height: 16px;
  margin-top: 8px;
  color: #939ba4;
  word-wrap: break-word;
  white-space: normal;
}
.note{
  margin-top: 8px;
  .textarea{
  border: none;
  color: #b5bac1;
  resize: none;
  outline: none;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  &:focus{
    border: none;
    outline: none;
    background-color: #0f0410;
  }
}
}

.textarea{
  background-color: black;
  border-radius: 6px;
  box-sizing: border-box;
  max-width: 203px;
  width: fit-content;
  height: 31px;
  padding: 4px;
  margin-top: 10px;
}
.comment-server-item{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  span{
    font-size: 16px;
    color: #dbdee1;
    /* &:hover{
      cursor: pointer;
      background-color: #2f3136;
      border-radius: 6px;
    } */
  }
}
.comment-server-img{
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-self: center;
  img{
    width: 40px;
    height: 40px;
    border-radius: 26%;
    margin-right: 8px;
    padding: 6px;
  }
  span{
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #dbdee1;
    
  }
  &:hover{
    cursor: pointer;
    background-color: #2f3136;
    border-radius: 6px;
  }
}


</style>