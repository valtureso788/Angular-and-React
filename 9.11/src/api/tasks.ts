import type { Priority, Project, Task, TaskFormValues } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
interface ApiTodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  body?: string;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const body: unknown = await response.json();
      if (typeof body === 'object' && body !== null && 'message' in body && typeof body.message === 'string') {
        message = body.message;
      }
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error;
    }
    throw new Error(message);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

function normalize(todo: ApiTodo): Task {
  const projects: Project[] = ['personal', 'work', 'study'];
  const priorities: Priority[] = ['low', 'medium', 'high'];
  return {
    id: todo.id,
    userId: todo.userId,
    title: todo.title,
    body: todo.body ?? 'Задача из публичного API.',
    completed: todo.completed,
    project: projects[(todo.id - 1) % projects.length],
    priority: priorities[(todo.id - 1) % priorities.length],
  };
}

export async function getTasks(): Promise<Task[]> {
  const data = await request<ApiTodo[]>('/todos?_limit=20');
  return data.map(normalize);
}

export async function getTask(id: number): Promise<Task> {
  const data = await request<ApiTodo>(`/todos/${id}`);
  return normalize(data);
}

export async function createTask(values: TaskFormValues): Promise<Task> {
  const data = await request<ApiTodo>('/todos', {
    method: 'POST',
    body: JSON.stringify({ ...values, completed: false }),
  });
  return { ...values, id: data.id, completed: false };
}

export async function updateTask(task: Task): Promise<Task> {
  const data = await request<ApiTodo>(`/todos/${task.id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
  });
  return { ...task, ...data, body: task.body, project: task.project, priority: task.priority, dueDate: task.dueDate };
}

export async function deleteTask(id: number): Promise<void> {
  await request<void>(`/todos/${id}`, { method: 'DELETE' });
}
