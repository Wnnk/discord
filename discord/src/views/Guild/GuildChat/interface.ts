export type GuildChatList = GuildChat[]

export type ChannelList = Channel[]

export type MemberInfo = Member[]


interface Member{
  uuid:string,
  avator_url:string,
  create_time:string,
  last_login_time:string,
  user_name:string,
  status:number,
}

export interface Channel{
  channel_id:string,
  channel_name:string,
  group_Id:number,
  parvate_channel:number,
}

export interface Group{
  created_time:string,
  default_channel:string,
  group_name:string,
  group_owner:string,
  iconpath:string,
  id:number
}


interface GuildChat {
  id:number,
  channel_id:string,
  create_time:string,
  group_id:string,
  message:string,
  sender_id:string,
  message_type:MessageType,
  userInfo:UserInfo
}

type MessageType = 0 | 1 | 2

type UserInfo = {
  avator_url:string,
  user_name:string,
}

