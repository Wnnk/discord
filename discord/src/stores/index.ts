import { defineStore } from 'pinia'
import type { Friend } from './interface/friendsList'


export const globalStore = defineStore('globalStore', {
  state:()=>{
    return{
      token:localStorage.getItem('token'),
      refreshToken:localStorage.getItem('refreshToken'),
      user_info:{
        user_name:"",
        avator_url:new URL("",import.meta.url).href,
        create_time: new Date,
        note:"",
        uuid:'',
        user_email:"",
        last_login_time: new Date,
        login_num:Number,
        status:Number,
        nickname:"",
      },
      friend_list:[] as Friend[],
      information:{},
      threadsWidth: 500
    }
    
  },
  getters:{},
  actions:{},
  persist: {
    storage: localStorage,
    paths:['user_info','threadsWidth']
  }
})
