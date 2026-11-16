export type Project = 'personal' | 'work' | 'study';
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  userId: number;
  title: string;
  body: string;
  completed: boolean;
  project: Project;
  priority: Priority;
  dueDate?: string;
}

export interface TaskFormValues {
  title: string;
  body: string;
  userId: number;
  project: Project;
  priority: Priority;
  dueDate: string;
}
