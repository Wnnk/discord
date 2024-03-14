<script setup lang='ts'>
import { ref, watch,defineModel }  from 'vue';
import axios from '@/axios';
import type { ReplyThreadProp }from '../../interface'
const { replyForm } = defineProps<{
  replyForm: ReplyThreadProp,
}>()

const emits = defineEmits<{
  (e: 'update:replyForm', value: ReplyThreadProp): void,
}>()
const colseReply = () => {
  replyForm.isReply = false;
  emits('update:replyForm',replyForm)
} 
const subReplyForm = () => {
  emits('update:replyForm', replyForm)
}

</script>

<template>
  <form class="form">
    <div class="reply-bar" v-show="replyForm.isReply">
      <div class="reply-label">
        正在回复至
        <span class="reply-user">{{replyForm.parent_name}}</span>
      </div>
      <div class="close-reply" @click="colseReply">
        <i class="close iconfont  icon-htmal5icon19 "></i>
      </div>
    </div>
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
            <el-input class="slate-text-area" placeholder="在XX标题中发送一则消息" v-model="replyForm.content" @keyup.enter="subReplyForm"></el-input>
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