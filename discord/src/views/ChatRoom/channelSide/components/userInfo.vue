<script setup lang='ts'>
import { defineComponent } from 'vue';
defineComponent({
  name:"UserInfo"
})
</script>

<template>
    <el-col :span="12" class="bottom-profile-avatar">
      <el-avatar src="@/assets/images/icn.jpg" class="bottom-profile-avatar-img"></el-avatar>
      <span>
        <p>用户名字</p>
        <p>用户名字</p>
      </span>
    </el-col>

    <el-col :span="12" class="bottom-profile-avatar">
      <el-tooltip 
        :hide-after="50" 
        class="box-item"
        effect="dark" 
        content="取消静音" 
        placement="top"
      >
      <el-icon size="32" color="rgb(181, 186, 193)"><Mute /></el-icon>
      
      </el-tooltip>
      <el-tooltip
        :hide-after="50" 
        class="box-item" 
        effect="dark" 
        content="耳机静音" 
        placement="top"
      >
      <el-icon size="32" color="rgb(181, 186, 193)"><Headset /></el-icon>
      </el-tooltip>

      <el-tooltip
        :hide-after="50" 
        class="box-item" 
        effect="dark" 
        content="设置" 
        placement="top"
      >
      <el-icon size="32" color="rgb(181, 186, 193)"><Setting /></el-icon>
      </el-tooltip>
    </el-col>
</template>

<style lang='scss' scoped>

.bottom-profile-avatar{
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* 头像与名字 */
  &:first-child{
    justify-content: space-evenly;

    .bottom-profile-avatar-img{
      width: 40px;
      height: 40px;

    }

    &:hover{
        background-color: #3d3e45;
        border-radius: 5px;
        cursor: pointer;
    }
    /* 字体设置 */
    span{
      width: 45px;

      p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:first-child{
          color: #f2f3f5;
          font-weight: bold;
        }
      }
    }

    /* 图标 */
    &:last-child{
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      font-size: 18px;
      color: #b5bac1;
      height: 30px;
      width: 30px;
      &:hover{
        background-color: #35373c;
        border-radius: 5px;
        cursor: pointer;
        color:#dbdee1;
      }
    }

    


  }
}
</style>