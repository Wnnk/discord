<script setup lang='ts'>
import {reactive , ref, onMounted} from "vue"
import router  from '@/routers'
import http from 'axios'
import { ElMessage }  from 'element-plus'
import type { GuildList } from './interface' 
import axios from "@/axios";
import {useRoute } from 'vue-router'

const route = useRoute()

  /* 服务器icon */
  const fileInput = ref<HTMLInputElement | null>(null)  //上传按钮
  const selectedFile = ref<File | null>(null) //上传的图片
  const previewURL = ref(''); //浏览图片


  onMounted( ()=>{
    method.init_server()
  })

  const state =  reactive({
    private_icon:new URL('@/assets/images/discord.png',import.meta.url).href,
    open_server_box:false,
    upload_data:{
      server_name:'',
    },
    formData: new FormData(),
    server_list: [] as GuildList[],
    // current_index:sessionStorage.getItem('current_index') || '/main/private'
  })

  const method = reactive({
    /* 获取用户社区列表 */
    init_server() {
      axios('/guild/getlist',{}).then((res)=>{
        state.server_list = res.data.data.flag
        console.log(state.server_list);
      })

    },
    /* 发现社区 */
    guild(id?:number | null, default_channel?:string | null){
  
      if (id) {
       router.push({
        path:`/guild/${id}/${default_channel}`
       })
      }else{
        router.push({
          path:'/guild-discovery'
        })
      }
      
    },
    /* 触发上传file的input */
    handleUploadIconClick() {
      fileInput.value!.click()
    },
    /* 社区创建选择图片并提供预览 */
    choose_server_icon(event:Event){
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0]
      selectedFile.value =file || null
      /* 清除上一次的文件 */
      if (state.formData.has('file') ) {
        state.formData.delete('file')
      }
      state.formData.append('file',selectedFile.value as Blob)
      /* 预览图片 */
      const reader = new FileReader()
      reader.onload = function(e){
        previewURL.value = reader.result as string
      }
      if (file) {
        reader.readAsDataURL(file) 
      }
      
    },
    /* 创建社区 */
    server_create() {
      const otherData = {
        server_name: state.upload_data.server_name
      }
      if (state.formData.has('server_name')) {
        state.formData.delete('server_name');
      }
      state.formData.append('server_name',otherData.server_name)
      if(state.formData.get('server_name') !== '' && selectedFile !== null) {
        http.post('http://127.0.0.1:7001/guild/create',state.formData,{
          headers: {
            authorization: localStorage.getItem('token'),
            token:localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          }
        }).then(()=>{
          state.open_server_box = false
          ElMessage({
            message:'创建社区成功',
            type:'success'
          })
          method.init_server()
          /* 清空上一次社区图片和名称 */
          selectedFile.value = null
          previewURL.value = ''
          state.upload_data.server_name = ''
        })
      }else{
        ElMessage({
          message: `请上传社区的图标与社区的名字`,
          type: 'error'
        })
      }
    },
  })
</script>

<template>
  <el-aside class="aside">
    <el-menu
      class="el-menu-vertical-demo"
      router
    > <!-- 个人私信 -->
      <el-menu-item index="/main/private"  :class="{'is-active': route.path === '/main/private'}">
        <!-- 悬停提示 -->
        <el-tooltip
          raw-content
          :hide-after="50"
          effect="dark"
          content="私信"
          placement="right"
          :enterable="false"
        >
        
        <el-avatar   class="private-img" :size="48" fit="fill">
          <img :src="state.private_icon" class="private">
        </el-avatar>
        </el-tooltip>
        <!-- 信息红点 -->
        <el-badge
          :max="99"
          class="item-message"
          value="3"
        >
        </el-badge>
        <!-- 分割线 -->
      </el-menu-item>
      <div class="item-underline">
        <div class="guild-separator"></div>
      </div>
      <!-- 服务器栏 -->
      <el-menu-item v-for="item in state.server_list" 
        :key="item.id" :index="route.path"
        @click="method.guild(item.id,item.default_channel)"
        :class="{'is-active': route.path === '/guild/' + item.id + '/' + item.default_channel }"
      >  
        <el-tooltip
          raw-content
          :content="item.group_name"
          effect="dark"
          placement="right"
          class="box-item"
          :enterable="false"
        >
          <el-avatar class="channel-img" :size="48"  fit="fill">
            <img :src="item.iconpath">
          </el-avatar>
        </el-tooltip>
      </el-menu-item>
      <!-- 固定添加，搜索服务器 -->
        <div class="menu-icon">
          <el-tooltip
            raw-content
            content="添加服务器"
            effect="dark"
            placement="right"
            class="box-item"
            :enterable="false"
          >
            <el-icon class="channel-icon" :size="24" @click="state.open_server_box = true"><Plus /></el-icon>
          </el-tooltip>
        </div>
        
      

      <div class="menu-icon" >
        <el-tooltip
          raw-content
          content="公开探索服务器"
          effect="dark"
          placement="right"
          class="box-item"
          :enterable="false"
        >
        <el-icon class="channel-icon" :size="24"  @click="method.guild(null,null)"><Compass /></el-icon>
        </el-tooltip>
      </div>

      <div class="item-underline">
        <div class="guild-separator"></div>
      </div>
      <!-- 下载App -->
      <div  class="menu-icon">
        <el-tooltip
          raw-content
          content="下载APP"
          effect="dark"
          placement="right"
          class="box-item"
          :enterable="false"
        >
          <el-icon class="download-icon">
            <Download class="icon"/>
          </el-icon>
        </el-tooltip>
      </div>
    </el-menu>
  </el-aside>

  <el-dialog v-model="state.open_server_box" class="server" width="30%" >
    <div class="server-title">
      <h1>自定义服务器</h1>
      <span>一个名称以及一个图标就能赋予你的服务器个性。之后你可以随时变更</span>
    </div>
    <div class="server-contain">
      <div class="server-avatar"  @click=" method.handleUploadIconClick">
        <img :src="previewURL" alt="" v-if="previewURL ">
        <input type="file" ref="fileInput"  style="display: none" @change="method.choose_server_icon">
      </div>
      <div class="server-name">
        <span>服务器名称</span>
        <input type="text" v-model="state.upload_data.server_name">
        <el-button type="primary" @click="method.server_create">创建</el-button>
      </div>
      
    </div>

  </el-dialog>
  
  





</template>

<style lang="scss" scoped>



.aside{
  width: 72px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3f4147;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #313338;
    border-radius: 4px;
  }
  
}
.el-menu{
  background-color: transparent;
  border-right: none;
  width: 72px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3f4147;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: #313338;
    border-radius: 4px;
  }
}

.el-menu-vertical-demo{
  width: 72px;
  
  .el-menu-item{
    width: 72px;
    display: flex;
    padding: 0 !important;
    align-items: center;
    justify-content: center;
   
    /* 移入变化 */
    &:hover{
      background-color: transparent;
       /* 左侧白条 */
      &::before{
        content: "";
        position: absolute;
        left: 0;
        top:20px;
        bottom: 20px;
        width: 4px;
        background-color: #fff;
        border-radius: 0 4px 4px 0;
        transition:  all 0.3s ease-out;
        opacity: 0.5;
      }
      /* 鼠标移入后图标变化 */
      .channel-img{
        border-radius: 35% !important;
        width: 50px;
        height: 50px;
        transition: all 0.3;
      }
      /* 改变背景色 */
      .private-img{
        background-color: #5856F2;
        border-radius: 35% !important;
        width: 50px;
        height: 50px;
        transition: all 0.3;
      }
      /* 改变.private颜色 */
      .private{
        filter: brightness(100);
      }
    }
   

  }
 .is-active::before {
    content: "";
    position: absolute;
    width: 4px;
    left: 0;
    top: 6px !important;
    bottom: 6px !important;
    opacity: 1 !important;
    border-radius: 0 4px 4px 0;
    background-color: #fff;
  }
 
  
  
  .item-underline{
    position: relative;
    margin: 0 0 8px;
    display: flex;
    -webkit-box-pack:center;
    justify-content: center;
    width: 72px;
  }
  /* 分割线 */
  .guild-separator{
    height: 2px;
    width: 32px;
    border-radius: 1px;
    background-color: rgba(78, 80, 88, 0.48);
  }
  /* 左侧栏图标 */
  .channel-img{
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 48px;
      height: 48px;
      &:hover{
        width: 50px;
        height: 50px;
      }
    }
  }
  
  .private{
    width: 26px;
    height: 20px;
  }

  .channel-icon{
    width: 48px;
    height: 48px;
    background-color: #232428;
    color: rgb(35, 165, 89);
    border-radius: 50%;
    border: #313338 solid 1px;
    &:hover{
      color: white;
      border-radius: 35% !important;
      width: 50px;
      height: 50px;
      transition: all 0.3;
      background-color: rgb(35, 165, 89);
    }
  }

  /* tip */
  .el-badge{
    position: absolute;
    margin-left: 35px;
    margin-bottom: 10px;
  }
  /* 除去tip的白色边框 */
  .item-message{
    :deep(.el-badge__content--danger){
      border: none;
    }
  }

  /* 添加服务器与搜索服务器 */
  .menu-icon{
    width: 72px;
    height: 56px;
    margin-top: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  /* 下载icon */
  .download-icon{
    width: 72px;
    .icon{
      width: 48px;
      height: 48px;
      //background-color: #313338 !important;
      border-radius: 50%;
      transition: all 0.3s;
      color: rgb(35, 165, 89);
      &:hover{
        width: 50px;
        height: 50px;
      }
    }
  }

}

.server-title{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1{
    color: #060607;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
  }
  span{
    margin-bottom: 8px;
  }
}


.server-contain{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.server-avatar{
  border-radius: 50%;
  width: 50px;
  height: 50px;
  // border: 1px dashed #4E5058;
  background-color: #E3E5E8;
  cursor: pointer;
  img{
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

}
.server-name{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  span{
    color: #4E5058;
    font-size: 12px;
    line-height: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .02em;
    margin-bottom: 8px;
  }
  input{
    height: 40px;
    padding: 10px;
    border-radius: 3px;
    background-color: #E3E5E8;
    box-sizing: border-box;
    margin-bottom: 8px;
  }
}


</style>
