<script setup lang="ts">
import router from "@/routers";
const emit = defineEmits(['change_right_side'])

</script>


<template>
  <header class="head">
    <div class="home-icon">
      <img src="@/assets/images/brand.png" alt="">
    </div>
    <div class="links">
      <router-link to="" class="link-chat">Chat Interface</router-link>
      <router-link to="" class="link-download">Download</router-link>
      <router-link to="" class="link-blog">Blog</router-link>
      <router-link to="" class="link-support">Support</router-link>
    </div>
    <div class="login">
      <el-button  round size="large" @click="()=>{router.push('/login')}">Login</el-button>
    </div>
    <svg width="40" height="40" viewBox="0 0 40 40" class="svg-show" @click="emit('change_right_side')">
      <path fill="currentColor" 
      fill-rule="evenodd" 
      clip-rule="evenodd" 
      d="M33.3327 10H6.66602V15H33.3327V10ZM6.66602 18.3317H33.3327V23.3317H6.66602V18.3317ZM6.66602 26.665H33.3327V31.665H6.66602V26.665Z">
    </path>
    </svg>
  </header>
  
</template>



<style scoped lang="scss">
.head{
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  padding-top: 1rem;
  z-index: 9999;
}
.home-icon{
  margin-left: 1.4rem;
  width: 124px;
  height:56px;
  flex: 0 0 auto;
}
.home-icon img{
  max-width: 100%;
  max-height: 100%;
}
.links{
  flex: 1 ;
  display: flex;
  text-align: center;
  justify-content: space-between;
  font-size: 16px;
  line-height: 140%;
  font-weight: 600;
  color: #fff;
  margin-right: 1rem;
  padding: 0 10rem;
}
.login{
  margin-left: auto;
  font-size: 14px;
  padding: 7px 16px;
}
.svg-show{
  color:#fff;
  display: none;
}

@media screen and (max-width: 768px) {
  .links {
    visibility: hidden;
    padding: 0;
  }
  .svg-show{
    display:block;
    cursor: pointer;
  }
}
</style>