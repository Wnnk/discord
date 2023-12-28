<script setup lang='ts'>
import type { MemberInfo } from '../interface';
import { toRefs, reactive, onMounted,watch } from 'vue';
const props = defineProps<{
  info:MemberInfo 
}>()


  const distinguish = ()=> {
    state.online = props.info.filter(item => item.status === 1 )
    state.offline = props.info.filter(item => item.status === 0)
    const idle = props.info.filter(item => item.status === 2)
    const busy = props.info.filter(item => item.status === 3)
  }

  const state = reactive({
    online:[] as MemberInfo,
    offline:[] as MemberInfo,
  })

onMounted(()=>{
  distinguish()
})

watch(()=>props.info,()=>{
  distinguish()
})

</script>

<template>
  <div class="member-list">
    <div class="online" v-if="state.online.length">
      <h3 class="title">在线-{{state.online.length}}</h3>
      <div class="member" v-for="item of state.online" :key="item.uuid">
        <div class="member-avatar">
          <img :src="item.avator_url"  />
        </div>
        <span class="member-name">{{item.user_name}}</span>
      </div>
    </div>
    <div class="offline" v-if="state.offline.length">
      <h3 class="title">离线-{{state.offline.length}}</h3>
      <div class="member" v-for="item of state.offline" :key="item.uuid">
        <div class="member-avatar">
           <img  :src="item.avator_url"/>
        </div>
        <span class="member-name">{{item.user_name}}</span>
      </div>
    </div>
  </div>
  
</template>

<style lang='scss' scoped>
.title{
  padding: 24px 8px 0 16px;
  height: 40px;
  font-size: 12px;
  line-height: 16px;
  font-family: 600;
  color: rgb(148, 155, 164);
  margin: 0;
}
.member{
  display: flex;
  align-items: center;
  .member-avatar{
    padding: 0 8px;
    img{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    }

  }
  .member-name{
    color: #949BA4;
    white-space: nowrap;
  }
}
</style>