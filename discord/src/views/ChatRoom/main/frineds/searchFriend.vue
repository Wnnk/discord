<script setup lang='ts'>
import  {ZoomIn} from "@element-plus/icons-vue"
import { ref } from 'vue';
import axios from "@/axios";
import { debounce } from '@/utils/debounce'

const search_key = ref('');
const search_result = ref(false);
const search_list = ref<userSearch[]>([]);

type userSearch = {
  avator_url:string,
  uuid:string,
  user_name:string,
  status:number,
}

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


</script>

<template>
    <div class="search-box">
      <el-input
        class="search-input"
        v-model="search_key"
        placeholder="搜索好友"
        :suffix-icon="ZoomIn"
        @input="fuzzySearch()"
        @blur="search_result = false"
      >
      </el-input>
      <transition name="fuzzySearchResult">
        <div class="search-result" v-show="search_result">
          <div class="search-item" v-for="item of search_list" :key="item.uuid">
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