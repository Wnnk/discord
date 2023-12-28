export interface GuildList {
  id:number,
  group_name?: string,
  group_owner: string,
  create_time: Date,
  iconpath: string,
  default_channel:string,
}

export type Popularcommunities = {
  count:number,
  group: {
    create_time?: Date,
    default_channel?:string,
    group_owner:string,
    group_name: string,
    iconpath: string,
    id:number,
  }
}
