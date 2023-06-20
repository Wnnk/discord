import { defineStore } from 'pinia'

export const globalStore = defineStore('globalStore', {
  state:()=>{
    return{
      user_info:{
        name:"",
        nick:"",
        avatar:new URL("",import.meta.url).href,
        token:"",
        register_time: new Date,
        introduce:"",
        email:"",
        password:"",
      }
    }
  }
})
