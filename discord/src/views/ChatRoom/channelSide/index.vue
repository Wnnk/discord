<script setup lang='ts'>
import   UserInfo  from '@/views/ChatRoom/channelSide/components/userInfo.vue';
import  {reactive} from 'vue'
const state =  reactive({
  search_box:false,
  search_key:null,
  search_res:[{name:"结果1"},{name:"结果2"}],/* 虚拟列表 */
  private_message_list:[                    /* 虚拟列表 */
    {id:0,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href,name:"1号"},
    {id:1,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href,name:"2号"},
    {id:3,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href,name:"3号"}
  ]
})
</script>

<template>
  <el-container>
    <el-header class="box-header">
      <el-button class="search-button" text @click="state.search_box = true">寻找新的对话</el-button>
      <!-- 寻找弹出框 -->
      <el-dialog 
        v-model="state.search_box" 
        center
        :style="{ 'background-color': '#2B2D31' }"
        width="570px"
      >
        <template #header="{boxtitle}">
          <div >
            <span :class="boxtitle">搜索服务器、频道或私信</span>
          </div>
        </template>
        <div class="sreach-input">
          <el-input v-model="state.search_key" placeholder="想去哪里?" ></el-input>
        </div>
        
        <el-descriptions :column="1" >
          <el-descriptions-item align="center"  v-for="item in state.search_res" :key="item">
            {{item.name}}
          </el-descriptions-item>
        </el-descriptions>
      </el-dialog>
    </el-header>
    <!-- 频道列表 -->
    <el-main class="box-main">
      <el-container class="box-main-container">
        <el-header class="friends-private">
          <!-- 好友 -->
          <el-container class="friends-top friends-head" >
            <el-row
              :class="['friends-top-flex',$route.path === '/main/private' ? 'is-active' : '']"
            >
              <el-col :span="12">
                <el-icon ><UserFilled /></el-icon>
                <span>好友</span>
                <i class="msg-num">3</i>
              </el-col>
            </el-row>

            <el-row
              :class="['friends-top-flex',$route.path === '/main/store' ? 'is-active' : '']"
            >
              <el-col :span="12">
                <el-icon ><MessageBox /></el-icon>
                <span>Box</span>
              </el-col>
            </el-row>
          </el-container>

          <!-- 私信 -->
          <el-container class="friends-top">
            <el-row class="friends-top-title">
              <span class="letter-font">私信</span>
              <el-tooltip
                :hide-after="50"
                class="box-item"
                effect="dark"
                content="创建私信"
                placement="top"
              >
                <span>+</span>
              </el-tooltip>
            </el-row>
            
            
            <!-- 私信列表 -->
            <el-row
              class=" friends-top-flex friends-list"
              v-for="item in state.private_message_list" :key=item.id

            >
              <div class="private-message-user-box" >
                <div class="private-message-user-box-flex">
                  <div class="private-message-user-box-left">
                    <el-avatar :src="item.avatar"></el-avatar>
                  </div>
                  <div class="private-message-user-box-flex-right">
                    <span class="private-message-user-box-right-name">{{item.name}}</span>
                  </div>
                </div>
              </div>
            </el-row>
          </el-container>
        </el-header>

        <!-- 底部选中对象资料 -->
        <el-footer>
          <el-row class="bottom-profile">
            <UserInfo/>
          </el-row>
        </el-footer>
      </el-container>
    </el-main>
  </el-container>
</template>

<style lang='scss' scoped>
.box-header{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px !important;
  position: static;
  top: 0;
  
  .search-button{
    width: 100%;
    height: 28px;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: none;
    background-color:#1E1F22;
    color: #949B98;
    font-size: 14px;
  }
}

/* 好友以及私信列表 */

.el-main{
  padding: 0 !important;
}
.el-icon{
  height: 2em;
}
.box-main{
  .box-main-container{
    display: flex;
    justify-content: space-between;
  }
  .friends-private{
    height: 90%;
    background-color: unset;
    padding: 0 8px !important;
  }
  .friends-head{
    position: sticky;
    padding-top: 10px;
    top: 0;
    background-color: #2B2D31;
    z-index: 99;
  }
  .friends-top-flex{
    height: 40px;
  }
  .is-active{
    background-color: #404249;
    border-radius: 5px;
    cursor: pointer;
    .el-col{
      .el-icon{
        color: #F2F3F5 !important;
      }
      span{
        color:#F2F3F5 !important;
      }
    }

  }
  .friends-top{
    background-color: #313338;
    padding: unset;
    width: 100%;
    /* height: 95px; */
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    .friends-list {
      &:last-child {
          margin-bottom: 200px;
      }
    }
    
  }
  &:last-child{
    margin-bottom: 200px;
  }
  .friends-top-flex{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 3px 0;
    &:hover{
      background-color: #35373c;
      background-color: 5px;
      cursor: pointer;
      color:#dbdee1;
      .el-col{
        .el-icon{
          color: #dbdee1;
        }
        span{
          color: #DBDEE1;
        }
      }
    }

    .el-col{
      width: 90px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .el-icon{
        font-size: 20px;
        font-style: inherit;
        font-family: inherit;
        vertical-align: baseline;
        color: #949ba4;
      }
      span{
        color: #949ba4;
        font-size: 16px;
        font-style: inherit;
        font-family: inherit;
        vertical-align: baseline;
      }
    }

  }
}

.private-message-user-box-flex{
  display: flex;
  flex-wrap: wrap;

}
.private-message-user-box-left{
  height: 44px;
}
.private-message-user-box-flex-right{
  display: flex;
  justify-content: center;
  align-items: center;
}
// 私信用户名称
.private-message-user-box-right-name{
  padding-left: 5px;
  color: #dbdee1;
  width: 100px;
}
.friends-top-title{
  height: 30px;
  line-height: 16px;
  font-size: 16px;
  color: #949BA4;
  padding: 3,5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: sticky;
  top: 0;
  background-color: #2b2D31;
  z-index: 99;
}
.letter-font{
  font-size: 12px;
  &:hover{
    color: #DBDEE1;
  }
}

.msg-num{
  position: absolute;
  top: 13px;
  right: 8px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 50%;
  background-color: #F23F42;
  color: #FFF;
  font-size: 12px;
}
.sreach-input{
  margin-bottom: 20px;
}

/* 底部资料 */
.el-footer{
  position: fixed;
  bottom: 0;
  width: 14.8%;
  background-color: #232428;
  height: 52px;
  padding: 0 6px;
  z-index: 99;
  .bottom-profile{
    height: 100%;
    display: flex;
    align-items: center;
  }
}

</style>