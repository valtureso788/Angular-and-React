import { z } from 'zod';

export const postSchema = z.object({
  title: z
    .string()
    .min(3, 'Минимум 3 символа')
    .max(100, 'Максимум 100 символов'),
  body: z
    .string()
    .min(10, 'Минимум 10 символов')
    .max(1000, 'Максимум 1000 символов'),
  userId: z.coerce
    .number({ error: 'Укажите число' })
    .int('Должно быть целым')
    .positive('Должно быть больше 0'),
  tags: z
    .array(
      z
        .string()
        .min(2, 'Минимум 2 символа')
        .max(20, 'Максимум 20 символов')
    )
    .min(1, 'Нужен хотя бы 1 тег')
    .max(5, 'Максимум 5 тегов'),
  status: z.enum(['draft', 'published'], { error: 'Выберите статус' }),
  publishDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Формат даты: ГГГГ-ММ-ДД')
    .refine(
      (value) => {
        const [y, m, d] = value.split('-').map(Number);
        return new Date(y, m - 1, d).getTime() >= new Date().setHours(0, 0, 0, 0);
      },
      { message: 'Дата не может быть в прошлом' }
    ),
});

export function todayString() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export const defaultPostValues = {
  title: '',
  body: '',
  userId: 1,
  tags: ['general'],
  status: 'draft',
  publishDate: todayString(),
};
