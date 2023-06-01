export interface ActivityTagDataType extends TagDataType {
  tagVoteCount: number; // user voted tag count
  userVoted: boolean; // check if user voted this tag
  activityAmount: number;
  trend: number;
}

export interface TagDataType {
  id: number;
  type: string; // 'area' | 'location' | 'other'
  text: string;
}

export enum statusUnion {
  DREAM = '願望',
  ENROLLED = '已註冊',
  DONE = '已完成',
}
export interface ActivityDataType {
  id: string;
  trend: number;
  title: string;
  subTitle:string | null;
  content: string | null;
  html: string | null;
  status: statusUnion | null;
  addTime: string | null;
  createAt: string | null;
  fee: string[] | null;
  images: string[] | null;
  connections: string[] | null;
  holders: string[] | null ;
  objectives: string[] | null;
  sources: string[] | null;
  branches: BranchDataType[];
  tags: ActivityTagDataType[] | null;

}

export interface ManageActivityDataType {
  trend: ActivityDataType['trend']
  // createdTime: number;
  title: ActivityDataType['title'],
}

export interface BranchDataType {
  id: number;
  branchName: string | null;
  location: string[] | null;
  date: DateType[] | null;
}

export interface DateType {
  name: string | null;
  start: Date | null;
  end: Date | null;
}

export interface SearchHistoryDataType {
  id: string;
  keyword: string | null;
  tags: TagDataType[] | null;
  date: string | null
}

export interface CommentDataType {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  rate: number;
  content: string;
  sequnce: number;
  createdAt: string;
  modifiedAt: string;
}
