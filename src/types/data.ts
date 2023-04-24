export interface ActivityTagDataType extends TagDataType {
  tagVoteCount: number; // user voted tag count
  userVoted: boolean; // check if user voted this tag
}

export interface TagDataType {
  id: number;
  type: string; // 'area' | 'location' | 'other'
  text: string;
}

export interface ActivityDataType {
  id: number;
  title: string;
  subTitle:string | null;
  images: string[] | null;
  tags: ActivityTagDataType[] | null;
  branches: BranchDataType[];
  content: string;
  connection: string[] | null;
  holder: string[] | null ;
  objective: string[] | null;
  sources: string[] | null;
  trend: number;
  applyFee: string[] | null;
  status: string | undefined | null;
}

export interface BranchDataType {
  id: number;
  branchName: string | null;
  date: DateType[];
  location: string[] | null;
}

export interface DateType {
  name: string;
  start: Date | null;
  end: Date | null;
}
