<script setup lang='ts'>
import CozyMessage from './cozyMessage/CozyMessage.vue'
import ThreadsInput from  './ThreadsInput/ThreadsInput.vue'
import MessageList from './MessageList/MessageList.vue'
import { ref, onMounted, onUnmounted  } from 'vue'
import axios from '@/axios'
import { globalStore } from '@/stores/index'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import type{ ThreadHeadPorp , ReplyListProp, ReplyThreadProp} from '@/views/Forum/interface'
import { handlerTimer } from '@/utils/handlerTime'


const threadsWidth = ref(globalStore().threadsWidth);
const thread = ref<null | HTMLElement >(null) 
const dragging = ref(false);

/* postId, 全局使用 */
  const route = useRoute();
  const path = route.path.split('/');
  const id = path[path.length - 1];
  console.log(id)

/**
 * @description 监听鼠标位置，动态改变鼠标指针样式 
 * 
 **/ 
onMounted(() =>{
  thread.value?.addEventListener('mousemove', isLeftBorder)
})
const isLeftBorder = (event:MouseEvent) => {
  const distance = window.innerWidth - event.clientX - threadsWidth.value
  if(distance < 18 && distance > 0) {
    thread.value!.style.cursor = 'ew-resize'
  }else {
    thread.value!.style.cursor = 'default'
  }
} 

onUnmounted(() =>{
  thread.value?.removeEventListener('mousemove', isLeftBorder)
})

/**   
 * @description 拖动改变thread组件宽度
 * 
**/
const startDragging = (event:MouseEvent) =>{
  // 边界判定
  if(event.offsetX < 18) {
    dragging.value = true;

    const onDragging = (event:MouseEvent) => {
      if(dragging.value) {
        let newWidth = window.innerWidth - event.clientX;
        threadsWidth.value = newWidth;
        globalStore().threadsWidth = threadsWidth.value;

      }
    }

    const stopDrag = () => {
      dragging.value = false;

      document.removeEventListener('mousemove', onDragging);
      document.removeEventListener('mouseup', stopDrag);
     
    }

    document.addEventListener('mousemove', onDragging);
    document.addEventListener('mouseup', stopDrag);
  }
}


/**   
 * @description 初始化请求threads页面数据
 * 
*/

/* 发帖者数据 */
const threadHead = ref<ThreadHeadPorp>({
  title:'',
  content:'',
  create_time:'',
  user_name:'',
  avator_url:'',

})

/* 回帖列表数据 */
const replyList = ref<ReplyListProp[] | null>([]);


const initThreads = async () => {
  // /* 获取帖子id */
  // const route = useRoute();
  // const path = route.path.split('/');
  // const id = path[path.length - 1];
  /* 发起请求 */
  const threads = await axios('/thread',{
    data:{
      id,
    }
  })

  if(threads.data.data.statu === 200) {
    const data = threads.data.data.result;
    /* 处理时间 */
    data.postHead.create_time = handlerTimer(data.postHead.create_time);
    data.postDetail.forEach((item:ReplyListProp) => {
      item.create_time = handlerTimer(item.create_time);
      item.update_time = handlerTimer(item.update_time);
      /* 获取父content */
      if(item.parent_reply_id){
        const matchItem = data.postDetail.find((i:ReplyListProp) => {
          return i.user_id === item.parent_reply_id;
        })
        if (matchItem) {
          item.parent_content = matchItem.content;
        }
      }
    });
    
    threadHead.value = data.postHead;
    replyList.value = data.postDetail;
    return
  }
  ElMessage({
    type: 'error',
    message: '帖子获取失败，请重新进入'
  })
  
}


/** 
 * @description 回复具体一个用户评论
 * 
*/
const replyForm = ref<ReplyThreadProp>({
  isReply:false,
  post_id:id,
  parent_reply_id:'',
  parent_name:'',
  content:'',
})


const replyContent = async (parent_reply_id:string, parent_name:string) => {
  /* 回复指定用户 */
  replyForm.value.parent_reply_id = parent_reply_id;
  replyForm.value.parent_name = parent_name;
  replyForm.value.isReply = true;
}

const updateForm = async (newForm: ReplyThreadProp) => {
  replyForm.value = newForm;
  const createReply = await axios('/reply',{
    data:replyForm.value
  })
  const data = createReply.data.data;
  if (data.statu === 200) {
    replyForm.value.content='';
    initThreads();
  }

}


/**
 * @description 回复帖子
 * 
*/

const replyPost =  (postId:string) => {
  
}




onMounted(() => {
  initThreads();
})


</script>

<template>
  <div 
    class="thread" 
    :style="{ width: threadsWidth + 'px'}" 
    @mousedown="startDragging"
    ref="thread"
  >
    <div class="thread-title">
      <h3>{{threadHead.title}}</h3>
        <CozyMessage :threadHead=threadHead  />
    </div>
    <div class="divider"></div>
    <div class="thread-list">
      <div class="thread-item" v-for="item of replyList" :key="item.id">
        <MessageList :reply="item" @click="replyContent(item.id,item.user_name)"/>
      </div>
    </div>
    <div>
      <ThreadsInput v-model:replyForm="replyForm"  @update:replyForm="updateForm"/>
    </div>
    
  </div>



</template>

<style lang='scss' scoped src="./Threads.scss">
</style>