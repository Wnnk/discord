<script setup lang='ts'>
import {reactive , onMounted} from 'vue'
import type { Popularcommunities } from '../interface' 
import axios from '@/axios';


const GroupState = reactive({
  server_list:[] as Popularcommunities[],
  isLoadind:false,
})

const getGuildList = ()=>{
  axios('/discover/getguildList',{

  }).then(res=>{
    if (res.data.code === '0') {
      const data = res.data.data;
      GroupState.server_list = data;
    }
  })
}

onMounted(()=>{
  getGuildList()
})




</script>

<template>
  <div class="discovery">
    <el-container>
      <el-header>
        <div class="header">
          <img src="@/assets/images/covery.jpg" alt="" class="header-img">
          <div class="header-content">
            <div class="header-content-box">
              <h1>在Discord找到自己的社区</h1>
              <div class="header-span">从游戏、音乐到教育，总有你的一片天地</div>
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="discovery-main">
          <div class="main-box">
            <h2>特色社区</h2>
            <div class="main-item" >
              <div class="card" v-for="item of GroupState.server_list" :key="item.group.id">
                <div class="card-header">
                  <div class="card-pic">
                    <img src="@/assets/images/login.jpg" alt="">
                  </div>
                  <div class="card-icon">
                    <img :src="item.group.iconpath" alt="">
                  </div>
                </div>
                <div class="card-info">
                  <div class="card-title">
                    <h3>{{item.group.group_name}}</h3>
                  </div>
                  <div class="card-text">
                    社区的简介
                  </div>
                  <div class="card-member-info">
                    <div class="member-total">
                      {{item.count}}位成员
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </el-main>
      <el-footer>FOOTER</el-footer>
    </el-container>
  </div>
</template>

<style lang='scss' scoped>
.discovery{
  height: 100%;
  width: 100%;
  max-width: 1608px;
  margin: 0 auto;
  
}
.el-header{
  height: 100%;
  padding: 0;
}
.header{
  margin-top: 30px;
  border-radius: 8px;
  position: relative;
  text-align: center;
  margin-bottom: 32px;
  min-height: 200px;
  
}
.header-img{
    display: inherit;
    border-radius: 8px;
    width: 100%;
    height: auto;
    z-index: -1;
    height: 300px;
  }
.header-content{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
}
.header-content-box{
  width: 100%;
  min-width: 360px;
  max-width: 720px;
  margin: 0 240px;
  h1{
    font-size: 20px;
    color: #FFFFFF;
  }
}
.header-span{
  color: #FFFFFF;
  font-size: 14px;
  margin-top: 8px;
  line-height: 20px;
}
.el-main{
  height: 100%;
  min-width: 580px;
  margin-bottom: 32px;
  padding: 0;

}
.discovery-main{
  min-width: 580px;
  margin-bottom: 32px;
}
.main-box{
  h2{
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    margin: 0;
    color: #F2F3F5;
  }
}
.main-item{
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  margin-right: 16px;
}
.card{
  margin: 10px 10px;
  position: relative;
  width: calc((100% - 80px) / 4);
  border-radius: 12px;
  background-color: #232428;
}
.card-header{
  position: relative;
  margin-bottom: 32px;
}
.card-pic{

  img{
    width: 100%;
    height: 100%;
    text-indent: -9999px;
    border-radius: 12px 12px 0 0;
  }
}
.card-icon{
  background-color: #232428;
  width: 48px;
  height: 50.4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  position: absolute;
  bottom: -21px;
  left: 12px;
  img{
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
}
.card-info{
  display: flex;
  flex: 1 1 auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
  padding: 0 16px 16px;
  overflow: hidden;
  .card-title{
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
    color: rgb(242, 243, 245);
    h3{
      margin: 0;
      font-size: 16px;
      line-height: 20px;
      font-weight: 600;
    }
  }
  .card-text{
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    overflow: hidden;
    margin: 4px 0 16px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    color:rgb(181, 186, 193);
  }
  .card-member-info{
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    -webkit-box-align: center;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    .member-total{
      color: #B5BAC1;
      font-size: 12px;
      line-height: 16px;
      font-weight: 400;
    }

  }
}
</style>