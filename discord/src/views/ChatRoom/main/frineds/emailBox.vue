<script setup lang='ts'>
import axios from '@/axios';
import { onMounted, ref, watch } from 'vue';
import type { EmailList } from './interface';
const { email_box } = defineProps<{
  email_box: boolean
}>()

const emailList = ref<EmailList[]>([])

/**
 * @description 初始化获取信件 
*/

const getEmailList = async () => {
  const res = await axios('/email/emiallist',{})
  const list = res.data.data
  emailList.value = list.filter((item:EmailList) => {
    return item.status === 0;
  })
}

/**
 *@description 接受或拒绝
 *@param id 信件id
 *@param type 信件类型
*/

const updateEmailStatus = async (id:number,type:number,sender_uuid:string, update:number) => {
  const index = emailList.value.findIndex((item) => {
    return item.id === id
  })
  emailList.value[index].status = 1;
  emailList.value = emailList.value.filter((item) => {
    return item.status === 0;
  }) 
  const res = await axios('/email/updateEmailStatus',{
    data: {
      id,
      type,
      sender_uuid,
      update,
    }
  })

}

onMounted(() => {
  getEmailList();
})


</script>



<template>
  <div class="email-box" >
    <div class="email-box-header">
      <el-icon :size="24" color="rgb(181, 186, 193)"><Message /></el-icon>
      <h1>收件箱</h1>
    </div>
    <div class="email-box-contain">
        <el-empty description="你已搞定一切" :image-size="100"  v-if="emailList.length === 0"/>
        <div class="email-channel" v-if="emailList.length !== 0">
          <div class="channel-header" v-for="item of emailList" :key="item.id">
            <div class="channel-icon" :style="{ 'background-image': 'url(' + item.avator_url + ')' }"></div>
            <div class="channel-name-section">
              <h1 class="channel-title">
                <div class="channel-name">{{item.title}}</div>
              </h1>
              <div class="channel-text">{{item.content}}</div>
            </div>
            <div class="edit-button" @click="updateEmailStatus(item.id, item.type, item.sender_uuid, 1)">
              <i class="iconfont icon-confirm-line"></i>
            </div>
            <div class="edit-button" @click="updateEmailStatus(item.id, item.type, item.sender_uuid, 0)">
              <i class="iconfont icon-cuowuguanbiquxiao"></i>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
/* 收件箱 */
.email-box{
  width: 35vw;
  max-width: 600px;
  min-width: 480px;
  max-height: 80vh;
  position: absolute;
  top: 50px;
  right: 100px;
  z-index: 30;
}
.email-box-header{
  display: flex;
  align-items: center;
  background-color: #1E1F22;
  border-radius: 10px 10px 0 0;
  h1{
    margin-left: 8px;
    color: #DBDEE1;
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    flex-grow: 1;
  }
}
.email-box-contain{
  min-width: 480px;
  height: 400px;
  border-radius: 0 0 10px 10px;
  background-color: #303133;
}

.email-channel{
  padding-bottom: 16px;

  .channel-header{
    align-items: center;
    background-color: rgb(43, 45, 49);
    box-sizing: border-box;
    display: flex;
    height: 64px;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 16px;
    position: sticky;
    top: 0;
    z-index: 10;

    .channel-icon{
      // background-image: url(https://cdn.discordapp.com/icons/1017943945214435438/a_98c00049c43456845b8eba119469f5c2.webp?size=56);
      background-color: rgb(35, 36, 40);
      cursor: pointer;
      margin-right: 16px;
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      position: relative;
      background-clip: padding-box;
      background-position: center center;
      background-size: 100% 100%;
    }
  }

  .channel-name-section{
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin-right: 16px;
    overflow: hidden;

    .channel-title{
      height: 20px;
      font-size: 16px;
      line-height: 1.25;
      font-weight: 600;
      color: rgb(242, 243, 245);
      margin: 0px 0px;
      .channel-name{
        align-items: center;
        display: flex;
        cursor: pointer;
        min-width: 0;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
      }
    }
    .channel-text{
      color: rgb(181, 186, 193);
      max-height: 16px;
      min-width: 0;
      width: 100%;
      font-size: 12px;
      line-height: 1.3333333333333333;
      font-weight: 400;
    }
  }

  .edit-button{
    margin-left: 12px;
    flex-shrink: 0;
    min-width: 32px;
    min-height: 32px;
    background-color: rgb(30, 31, 34);
    color: rgb(181, 186, 193);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-sizing: border-box;
    cursor: pointer;
  }
}

</style>