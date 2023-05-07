export interface ActivityTagDataType extends TagDataType {
  tagVoteCount: number; // user voted tag count
  userVoted: boolean; // check if user voted this tag
  activityAmount: number;
  trend: number;
}

export interface TagDataType {
  id: number;
  type: string; // 'area' | 'location' | 'other'
  // TODO: type nullable
  text: string | null;
}

export interface ActivityDataType {
  id: string;
  trend: number;
  title: string | null;
  subTitle:string | null;
  content: string | null;
  html: string | null;
  status: string | null;
  fee: string[] | null;
  images: string[] | null;
  connections: string[] | null;
  holders: string[] | null ;
  objectives: string[] | null;
  sources: string[] | null;
  branches: BranchDataType[];
  tags: ActivityTagDataType[] | null;
  applyFee: string[] | null;
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
