export interface IRecordData {
  index: number;
  child: IRecordData[];
  gen: number;

  id: number;

  projectId: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: string;

  adminUsers: string[];
  currentUsers: string[];
  viewed: any;

  targetDate: string;
  deadlineDate: string;
  importance: string;
  parentTaskId: number;

  log: any[];
}
