<script setup lang='ts'>
import {reactive} from "vue"
import  {ZoomIn} from "@element-plus/icons-vue"
const state = reactive({
  list:[
    {id:0,name:"一号好友",statu:0,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href},
    {id:1,name:"二号好友",statu:1,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href},
    {id:2,name:"三号好友",statu:2,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href},
    {id:3,name:"四号好友",statu:2,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href},
    {id:4,name:"五号好友",statu:1,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href},
    {id:5,name:"六号好友",statu:0,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href},
    {id:6,name:"七号好友",statu:0,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href},
    {id:7,name:"八号好友",statu:1,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href},
    {id:8,name:"九号好友",statu:2,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href},
    {id:9,name:"十号好友",statu:0,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href},
    {id:10,name:"十一号好友",statu:0,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href},
    {id:11,name:"十二号好友",statu:0,avatar:new URL('@/assets/images/icn.jpg',import.meta.url).href},
  ],
  search_key:'',
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
      <div
        class="friends-list"
        v-for="item in state.list"
      >
        <div class="friends-avatar">
          <el-avatar :src="item.avatar" ></el-avatar>
        </div>
        <div class="friends-info">
          <div class="friends-name">
            {{item.name}}
          </div>
          <div class="friends-status" v-if="item.statu === 0">
            在线
          </div>
          <div class="friends-status" v-if="item.statu === 1">
            忙碌
          </div>
          <div class="friends-status" v-if="item.statu === 2">
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
            <el-icon :size="36" color="rgb(181, 186, 193)"><ChatDotSquare /></el-icon>
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
  .friends-avatar{
    width: 35px;
    height: 35px;
  }
  .friends-name{
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    font-weight: bold;
    color: #f2f3f5;
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