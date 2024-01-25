<script setup lang='ts'>
import { getAllTypeEmojis} from '@/common/emoji/utils'
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
const props = defineProps({
  all:{
    type:Boolean,
    default: false,
  }
})
const emit = defineEmits(['emojiHandle'])
const res = getAllTypeEmojis();

const emojiObj = ref<any>({});
if (props.all) {
  emojiObj.value = res;
}else {
  emojiObj.value ={
    defEmojis:res.defEmojis,
  }

}

const emoji = reactive({
  chooseItem:'',
  historyList:[] as string[],
  allEmoji:emojiObj.value
})
/* 选择某个表情 */
const chooseEmojiDefault = (item:string) => {
  emoji.chooseItem = item;
  emoji.historyList.unshift(item);
  console.log(item)
  emit('emojiHandle',item);
  return item
}
</script>

<template>
  <div class="emoji-box">
    <div class="default">
      <div class="emojiList" v-for="items in emojiObj" :key="items">
        <i class="emojiTitle">{{items.name}}</i>
        <div class="emoji" v-for="item in items.value" :key="item" @click="chooseEmojiDefault(item)">
         {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
@import './emoji.scss'
</style>