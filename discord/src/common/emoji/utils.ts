/**
 *  @param inputs 参数一个或多个字符串 
 *  @return 返回二维数组
 * 
 * 
 */

const splitEmoji = (...inputs:string[]):string[][] => {
  /* 表情正则 */
  const emojiRegex: RegExp = /\p{Emoji}/u;
  const emojiArrays:string[][] = [];
  /* 将表情分类 */
  inputs.forEach((input:string) =>{
    const emojiArray:string[] = [];
    for (const char of input) {
      if (emojiRegex.test(char)) {
        emojiArray.push(char);
      }
    }
    emojiArrays.push(emojiArray);
    return emojiArrays;
  })
  
  return [...new Set(emojiArrays)];
}

import { defEmojis, guestrueEmojis, animalEmojis ,foodEmojis } from './emoji.js'

const getAllTypeEmojis = () => {
  const emojiArr = splitEmoji(defEmojis, guestrueEmojis, animalEmojis, foodEmojis )
  const emojiObj = {
    defEmojis: {name:'默认表情',value:emojiArr[0]},
    guestrueEmojis: {name:'手势',value:emojiArr[1]},
    animalEmojis: {name:'动物',value:emojiArr[2]},
    foodEmojis: {name:'食物',value:emojiArr[3]},
  }
  return emojiObj
}

export { getAllTypeEmojis }