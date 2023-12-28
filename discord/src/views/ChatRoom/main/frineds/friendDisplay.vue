<script setup lang='ts'>
import {reactive } from "vue"
import  {ZoomIn} from "@element-plus/icons-vue"
import router from "@/routers";
import type { Friend } from '@/stores/interface/friendsList'
import FriendsStatu from '@/components/friendsStatu.vue'

let props = defineProps<{
  friend_list: Friend[] 
}>()

const state = reactive({
  search_key:'',
})

const method = reactive({
  chat_main(uuid:string) {
    router.push({
      path:`/main/${ uuid }`,
      name:'chat',
      params:{
        id:uuid
      }
    })
  },
 
  /* 处理TS对avator_url为空报错 */
  get_avatar_url(item:any) {
    return item.avator_url || new URL('@/assets/images/avatar.jpg',import.meta.url).href
  }
})


</script>

<template>
  <div class="friend-search" style="width: 770px;">
    <div class="search-box">
      <el-input
        class="search-input"
        v-model="state.search_key"
        placeholder="搜索好友"
        :suffix-icon="ZoomIn"
      >
      </el-input>
    </div>

    <div class="placeholder"></div>
      <div class="empty" v-if="props.friend_list.length === 0">
        <el-empty></el-empty>
      </div>
      <div
        class="friends-list"
        v-if="props.friend_list.length > 0"
        v-for="item in props.friend_list"
      >
        <div class="friends-avatar">
          <el-avatar :src="method.get_avatar_url(item)" class="avatar"></el-avatar>
          <FriendsStatu :status="item.status" class="statu"/>
        </div>
        <div class="friends-info">
          <div class="friends-name">
            {{item.user_name}}
          </div>
          <div class="friends-status" v-if="item.status === 1">
            在线
          </div>
          <div class="friends-status" v-if="item.status === 3">
            忙碌
          </div>
          <div class="friends-status" v-if="item.status === 0">
            离线
          </div>
        </div>

        <div class="friends-more">
            <el-tooltip
              class="tip-item"
              :hide-after="50"
              :enterable="false"
              placement="top"
              content="信息"
            >
            <el-icon :size="36" color="rgb(181, 186, 193)" @click="method.chat_main(item.uuid)"><ChatDotSquare /></el-icon>
            </el-tooltip>
                   
            <el-tooltip
              class="tip-item"
              :hide-after="50"
              :enterable="false"
              placement="top"
              content="更多"
            >
            <el-icon :size="36" color="rgb(181, 186, 193)"><More /></el-icon>
            </el-tooltip>
          
        </div>
      </div>
    

  </div>
</template>

<style lang='scss' scoped>
.friend-search{
  margin-top: 35px;
  width: 100%;
  height: 90px;
  position: sticky;
  top: 0;
  z-index: 99;
  background-color: #313338;
}
.placeholder{
  height: 45px;
  width: 100%;
}
.search-box{
  background-color: #313338;
  .search-input{
  width: 100%;
  height: 35px;
  border-radius: 3px;
  font-size: 14px;
  color: #333;
  background-color: #1e1f22;
  outline: none;
  .is-focus{
    box-shadow: unset;
  }

  &::placeholder{
    color: #999;
    font-size: 20px;
  }
}
}
:deep(.el-input__wrapper) {
    background-color: #1e1f22;
    box-shadow: unset;
}

/* 好友列表 */
.friends-list{
  clear: both;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 12px 0;
  margin: 0 8px 0 8px;
  border-top:1px solid #3f4147;
  &:first-child{
    margin-top: 40px;
  }
  &:hover{
    background-color: #393c41;
    cursor: pointer;
    border-radius: 10px;
   
    
  }
}


.friends-info{
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 35px;
  width: 390px;
  position: relative;
  .friends-name{
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    font-weight: bold;
    color: #f2f3f5;
  }
 
 

}
.friends-avatar{
  position: relative;
  width: 35px;
  height: 35px;
  .statu{
    position: absolute;
    right: -8px;
    bottom: -5px;
    z-index: 100;
  }
}

.friends-status{
  font-size: 12px;
  color: #b5bac1;
}

.friends-more{
  margin-left: auto;
  .el-icon{
    margin-right: 8px;
  }
}
</style>