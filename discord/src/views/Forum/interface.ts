type ThreadHeadPorp = {
  title:string,
  content:string,
  create_time:string | null,
  user_name:string,
  avator_url:string,
}

type ReplyListProp = {
  id:string,
  content:string,
  create_time: string | null,
  parent_reply_id:string | null,
  parent_name:string | null,
  update_time: null | string,
  avator_url:string,
  user_name:string,
  parent_content?:string,
  user_id:string,
}
type ReplyThreadProp = {
  isReply:boolean,
  post_id:string,
  parent_reply_id:string | null,
  parent_name:string | null,
  content:string,
}


export type{ ThreadHeadPorp , ReplyListProp, ReplyThreadProp}