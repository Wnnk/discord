<script setup lang='ts'>
import type { ReplyListProp } from '@/views/Forum/interface'

const { reply } = defineProps<{
  reply:ReplyListProp
}>()
console.log(reply)
</script>

<template>
  <div class="cozy-message">
    <div class="message-reply-context" v-if="reply.parent_reply_id">
      <img src="@/assets/images/avatar.jpg" class="replyAvatar">
      <span class="replyusername">@{{reply.parent_name}}</span>
      <div class="replied-text-preview">
        <div class="replied-text-content">
          <span class="mention">{{reply.parent_content}}</span>
        </div>
      </div>
    </div>
    <div class="contents">
      <img src='@/assets/images/avatar.jpg' >
      <h3 class="header">
        <span class="message-username">
          <span class="username">{{reply.user_name}}</span>
          <span class="bot-tag">tag</span>
        </span>
        <span class="timetamp">
          <time datetime="">
            <i>{{reply.update_time || reply.create_time}}</i>
          </time>
        </span>
      </h3>
      <div class="message-content">
        <span class="mention"></span>
        <span>{{reply.content}}</span>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped src="./MessageList.scss">
</style>