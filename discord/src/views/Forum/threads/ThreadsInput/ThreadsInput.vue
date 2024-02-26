<script setup lang='ts'>
import { ref }  from 'vue';
import axios from '@/axios';
const threadInput = ref('')

/** 
 * @description 发送帖子
 * @param {string} content 帖子内容
 * 
 */
//  const sendThreads = async (content:string) => {
//   // 回复帖子
//   const parent_reply_arr:string[] = [];
//   // 发送信息
//   const newThreadMessage = await axios('',{
//     data: {
//       parent_reply_arr,
//       content
//     }
//   })
// }


</script>

<template>
  <form class="form">
    <div class="channel-text-area">
      <div class="scroolable-container">
        <div class="inner">
          <div class="iploadInput">
            <input class="file-input" type="file"/>
          </div>
          <div class="attachWrapper">
            <button 
              aria-label="上传文件或发出邀请" 
              type="button"
              class="attach-button"
            >
              <div class="contents">
                <i class="iconfont icon-htmal5icon18 upload" ></i>
              </div>
            </button>
          </div>
          <div class="text-Area">
            <el-input class="slate-text-area" placeholder="在XX标题中发送一则消息" v-model="threadInput" ></el-input>
          </div>
          <div class="buttons-icon" >
            <button aria-haspopup="dialog" class="button-type">
              <div class="contents">
                <i class="iconfont icon-gift-full"></i>
              </div>
            </button>
            <button aria-haspopup="dialog" class="button-type">
              <div class="contents">
                <i class="iconfont icon-gif"></i>
              </div>
            </button>
            <button aria-haspopup="dialog" class="button-type">
              <div class="contents">
                <i class="iconfont icon-fasongtupian"></i>
              </div>
            </button>
            <button aria-haspopup="dialog" class="button-type">
              <div class="contents">
                <i class="iconfont icon-face-kiss-wink-heart"></i>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang='scss' scoped src="./ThreadsInput.scss">
</style>