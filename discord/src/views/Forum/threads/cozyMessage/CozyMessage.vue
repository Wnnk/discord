<script setup lang='ts'>
import { ref } from 'vue'
import type { ThreadHeadPorp} from '@/views/Forum/interface'

const { threadHead } = defineProps<{
  threadHead:ThreadHeadPorp
}>()


</script>

<template>
  <div class="cozy-message">
    <div class="contents">
      <img :src=threadHead.avator_url >
      <h3 class="header">
        <span class="message-username">
          <span class="username">{{threadHead.user_name}}</span>
          <span class="bot-tag">tag</span>
        </span>
        <span class="timetamp">
          <time datetime="">
            <i>{{threadHead.create_time}}</i>
          </time>
        </span>
      </h3>
      <div class="message-content">
        <span class="mention"></span>
        <span>{{threadHead.content}}</span>
      </div>


    </div>
  </div>
</template>

<style lang='scss' scoped src="./CozyMessage.scss">
</style>