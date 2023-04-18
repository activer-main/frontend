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
}

export interface ActivityTagDataType extends TagDataType {
  tagVoteCount: number; // user voted tag count
  userVoted: boolean; // check if user voted this tag
}

export interface TagDataType {
  id: number;
  type: string; // 'area' | 'location' | 'other'
  text: string;
}

export interface BranchDataType {
  id: number;
  branchName: string | null;
  dateStart: DateType | null;
  dateEnd: string[] | null ;
  applyStart: string[] | null ;
  applyEnd: string[] | null;
  applyFee: string[] | null;
  location: string[] | null;
  status: string | undefined | null;
}
export interface DateType {
  [key: string]: string
}

export interface NewActivityDataType {
  id: number;
  title: string;
  subTitle:string | null;
  images: string[] | null;
  tags: ActivityTagDataType[] | null;
  branches: NewBranchDataType[];
  content: string;
  connection: string[] | null;
  holder: string[] | null ;
  objective: string[] | null;
  sources: string[] | null;
  trend: number;
}

export interface NewBranchDataType {
  id: number;
  branchName: string | null;
  date: NewDataType[];
  applyFee: string[] | null;
  location: string[] | null;
  status: string | undefined | null;
}

export interface NewDataType {
  name: string;
  start: Date | null;
  end: Date | null;
}
