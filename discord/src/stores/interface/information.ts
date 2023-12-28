export interface information {
  avator_url:string,
  create_time:string,
  note:string,
  status:number,
  user_name:string,
  uuid?:string
  last_login_time?:string,
}

export interface message {
  id:number,
  sender_uuid:string,
  receiver_uuid:string,
  is_deleted:number,
  read:number,
  contain:string,
  create_time:string,
  message_type:number,
  attachment?:string,
}