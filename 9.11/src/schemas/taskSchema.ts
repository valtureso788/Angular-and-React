import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().trim().min(3, 'Минимум 3 символа').max(100, 'Максимум 100 символов'),
  body: z.string().trim().min(5, 'Добавьте описание (минимум 5 символов)').max(500, 'Максимум 500 символов'),
  userId: z.number().int().positive('Введите положительный ID автора'),
  project: z.enum(['personal', 'work', 'study']),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
export const defaultTaskValues: TaskFormValues = {
  title: '',
  body: '',
  userId: 1,
  project: 'personal',
  priority: 'medium',
  dueDate: '',
};
