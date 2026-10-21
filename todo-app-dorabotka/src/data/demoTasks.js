// Демо-задачи для первого запуска (когда localStorage пуст).
// id генерируются один раз при загрузке модуля.
export const DEMO_TASKS = [
  {
    id: crypto.randomUUID(),
    title: 'Изучить React Router',
    description:
      'Разобраться с BrowserRouter, Route, Link, NavLink, useNavigate, useParams, useSearchParams.',
    done: true,
    createdAt: new Date('2024-01-15T10:30:00').toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Написать кастомный хук useLocalStorage',
    description:
      'Хук должен использовать lazy initializer и корректно сериализовать/десериализовать данные.',
    done: false,
    createdAt: new Date('2024-01-16T14:20:00').toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Собрать приложение «Мои задачи»',
    description: '',
    done: false,
    createdAt: new Date('2024-01-17T09:05:00').toISOString(),
  },
];
