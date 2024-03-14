<script lang="ts" setup>
import { ref, onMounted, onUnmounted  } from 'vue'; 
import { ChatDotRound } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from '@/axios';
import router  from '@/routers'
import { debounce } from '@/utils/debounce'

const newPost = ref({
  title:'',
  content:'',
})
/**  
 * @description: 发布帖子
 * 
 **/
type  NewPostProops = {
  title:string,
  content:string,
}
  

const onSubmitNewPost = async (form:NewPostProops) => {
  const statu = await axios('/post/create',{
    data:{
      title:form.title,
      content:form.content,
    }
  })
  newPost.value.title = ''
  newPost.value.content = ''
  if (statu.data.data.statu === 200) {
    getPostList(postList.value.length);
    return
  }
  ElMessage({
    type:'error',
    message:'发布失败，请重试'
  })
}

/**  
 * @description: 获取帖子列表
 * @param {}
 * 
*/
type PostListProops = {
  id:string,
  title:string,
  content:string,
  user_name:string,
  category_id:number,
  view_count:number,
  reply_count:number,
  is_top:number,
  is_deleted:number,
  last_reply_time:Date,
  PostList:PostInfo,
}
type PostInfo = {
  user_name:string,
  avator_url:string,
}
let postList = ref<PostListProops[]>([])
const getPostList = async (limit:number = 10 ) => {
  const list = await axios('/post/list',{
    data:{
      limit,
    }
  })
  if (list.data.data.statu === 200) {
    postList.value = list.data.data.result
    return
  }
  ElMessage({
    type: 'error',
    message:'获取失败，请重试'
  })

}

/**
 * @description 改变浏览量和留言量 

*/
const updateViewAndMessageCount = async () => {
  const res = await axios('/updateViewAndMessageCount',{
    data:{
      List:postList.value,
      limit: postList.value.length | 10,
    }
  })
  const data = res.data.data;
  console.log(res);
  if (data.statu === 200) {
    postList.value = data.result;
  }

}

let intervalGetVireCountAndMessageCount:ReturnType<typeof setInterval>;
onMounted(async () => {
  /* 初始化帖子列表 */
  await getPostList();
  /* 定时刷新浏览量和留言量 */
   intervalGetVireCountAndMessageCount = setInterval(() => {
    console.log('更新')
    updateViewAndMessageCount();
  }, 1000 * 60 * 5);
})

onUnmounted(() =>{
  clearInterval(intervalGetVireCountAndMessageCount);
})

/** 
 * @description 进入帖子详细页面
 * 
*/
const goToPostDetail = async (id:string) => {
  /* 跳转url */
  router.push({
    path:`/forum/thread/${id}`
  });
  /* 前端暂时修改浏览量 */
  postList.value.forEach(item => {
    if (item.id === id) {
      item.view_count++
    }
  });
}

/**
 * @description 检测是否滚动到底，更新postList 
*/
const postListScroll = ref<null | HTMLElement>(null);
const scrollBottom = debounce(() => {
  const container = postListScroll.value as HTMLElement;

  if (container.scrollTop + container.clientHeight + 200 >= container.scrollHeight) {
    /* 滚动条触底 */
    getPostList(postList.value.length + 10);
  }
}, 500)

</script>


<template>
  <div class="base">
    <el-form class="form" :model="newPost">
      <el-form-item >
        <el-input v-model="newPost.title" placeholder="标题" class="form-input"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="newPost.content" placeholder="输入消息" class="form-input" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round :icon="ChatDotRound" @click="onSubmitNewPost(newPost)">新帖</el-button>
      </el-form-item>
    </el-form>
    <div class="layout">
      <div class="forum">
        <div class="post-list" ref="postListScroll" @scroll="scrollBottom()">
          <div class="post-card" @click="goToPostDetail(item.id)" v-for="item of postList" :key="item.id">
            <div class="post-card-title">
              <h3>{{item.title}}</h3>
            </div>
            <div class="post-main">
              <span class="post-poster">{{item.PostList.user_name}}:</span>
              <div>
                <span class="post-contain">{{item.content}}</span>
              </div>
            </div>
            <div class="post-footer">
              <i class="iconfont icon-liulanliang dianzan" @click.stop="console.log(1)"></i>
              <div class="liulanliang-count">{{item.view_count}}</div>
              <i class="iconfont icon-24gf-bubble message"></i>
              <div class="message-count">{{item.reply_count}}</div>
            </div>
          </div>
        </div>
        
        <div class="post">
          <router-view v-slot="{Component}" >
            <transition name="post-slide" mode="out-in">
              <component :is="Component" :key="$route.path" ></component>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>


</template>


<style scoped lang="scss" src="./invitationCard.scss">

</style>
