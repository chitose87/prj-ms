export interface IRecordData {
  taskId: number;
  projectId: number;
  title: string;
  description: string;
  category: string;
  tags: string;
  status: string;
  adminUsers: string;
  currentUsers: string;
  targetDate: string;
  deadlineDate: string;
  importance: string;
  parentTaskId: number;
}
