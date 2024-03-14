<script setup lang='ts'>
import { ref } from 'vue';
import axios from "@/axios";
import { debounce } from '@/utils/debounce'
import { ElMessage } from 'element-plus';

const search_key = ref('');
const search_result = ref(false);
const search_list = ref<userSearch[]>([]);
const select_user = ref<userSearch>();
type userSearch = {
  avator_url:string,
  uuid:string,
  user_name:string,
  status:number,
}

/**
 *  @description 搜索用户
*/
const  fuzzySearch = debounce(async () => {
   /* 过滤空格 */
   search_key.value = search_key.value.trim();
   if (search_key.value === '') return
   /* 下拉框消失 */
   search_result.value = false;
   const res =  await axios('/user/search',{
    data:{
      search_key: search_key.value,
    }
   })

   /* 没有结果返回空数组 */
  //  if (res.data.data.length === 0) return;
   search_list.value = res.data.data;
   search_result.value = true;

}, 1000);


/**  
 * @description 添加好友
*/
const addFriend = async (user_name?:string,user_info?:userSearch) => {
  const addFriendForm = {
    friend_name:'',
    friend_uuid:'',
  }
  if (user_name) {
    /* 仅通过输入查询用户 */
    addFriendForm.friend_name = user_name;
  }else if(user_info) {
    /* 通过下拉框选中用户 */
    search_key.value = user_info.user_name;
    addFriendForm.friend_name = user_info.user_name;
    addFriendForm.friend_uuid = user_info.uuid;
  }else {
    return;
  }
  /* 发送添加好友请求 */
  const addFriendRes =  await axios('/information/addFriend',{
    data:addFriendForm
  })
  if (addFriendRes.data.code ='0') {
    ElMessage({
      message: addFriendRes.data.msg,
      type: 'success',
    })
    return
  }
  ElMessage({
    type:'error',
    message: addFriendRes.data.msg,
  })

  
}


/** 
 * @description 选中用户 
*/
const selectUser = async (check_user:userSearch) => {
  search_key.value = check_user.user_name;
  select_user.value = check_user;
  console.log(select_user.value);
}


</script>

<template>
    <div class="search-box">
      <el-input
        class="search-input"
        v-model="search_key"
        placeholder="Enter 发送添加好友申请"
        @input="fuzzySearch()"
        @blur="search_result = false"
      >
        <template #append>
          <el-button class="search-addfriend" @click="addFriend(search_key,select_user)">添加好友</el-button>
        </template>
      </el-input>
      <transition name="fuzzySearchResult">
        <div class="search-result" v-show="search_result">
          <div class="search-item" v-for="item of search_list" :key="item.uuid" @click="selectUser(item)">
              <el-avatar :src=item.avator_url  class="user-avator"/>
              <span class="user-name">{{ item.user_name }}</span>
          </div>
          
        </div>
      </transition>
      
    </div>
</template>

<style lang='scss' scoped>
.search-box{
  background-color: #313338;
  .search-input{
  width: 100%;
  height: 35px;
  border-radius: 3px;
  font-size: 14px;
  color: #333;
  background-color: #1e1f22;
  outline: none;
  .is-focus{
    box-shadow: unset;
  }

  &::placeholder{
    color: #999;
    font-size: 20px;
  }

    
  }

  :deep(.el-input__wrapper) {
      background-color: #1e1f22;
      box-shadow: unset;
  }

 :deep(.el-input-group__append) {
   background-color: #1e1f22;
   box-shadow: -1px 0px 0px ;
 }
}
/* 模糊搜索结果下拉框 */
.search-result{
    position: absolute;
    width: 100%;
    max-height: 300px;
    background-color: #898db0;
    z-index: 99;
    border-radius: 0px 0px 8px 8px;
  }
/* 下拉框信息 */
.search-item{
  display: flex;
  border-bottom: 0.5px solid #6c6d6f;
  align-items: center;
  &:hover{
    background-color: #393c41;
    cursor: pointer;
    border-radius: 2px;
  }
  .user-avator{
    margin: 8px;
  }
  .user-name{
    display: block;
  }
}

/* 下拉框动画 */
.fuzzySearchResult-enter-active, .fuzzySearchResult-leave-active {
  transition: opacity 0.9s linear;
}
.fuzzySearchResult-enter, .fuzzySearchResult-leave-to{
  opacity: 0;
}
</style>