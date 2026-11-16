import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/tasks';

export default function HomePage() {
  const { data: tasks = [], isLoading, isError, error } = useQuery({ queryKey: ['tasks'], queryFn: getTasks });
  if (isLoading) return <p className="status-message">Загружаем статистику…</p>;
  if (isError) return <p className="error">Не удалось загрузить статистику: {error.message}</p>;
  const completed = tasks.filter((task) => task.completed).length;
  const byProject = tasks.reduce<Record<string, number>>((summary, task) => {
    summary[task.project] = (summary[task.project] ?? 0) + 1;
    return summary;
  }, {});
  return (
    <section>
      <div className="hero">
        <p className="eyebrow">ВАШ РАБОЧИЙ ПРОСТРАНСТВО</p>
        <h1>Планы становятся делами.</h1>
        <p>Соберите задачи, расставьте приоритеты и двигайтесь вперёд по одному пункту за раз.</p>
        <Link className="primary-link" to="/tasks">Перейти к задачам →</Link>
      </div>
      <div className="stats-grid">
        <article className="stat-card"><span>Всего задач</span><strong>{tasks.length}</strong></article>
        <article className="stat-card"><span>Выполнено</span><strong>{completed}</strong></article>
        <article className="stat-card"><span>Активно</span><strong>{tasks.length - completed}</strong></article>
      </div>
      <section className="panel">
        <h2>По проектам</h2>
        <div className="project-stats">
          <span>Личное <strong>{byProject.personal ?? 0}</strong></span>
          <span>Работа <strong>{byProject.work ?? 0}</strong></span>
          <span>Учёба <strong>{byProject.study ?? 0}</strong></span>
        </div>
      </section>
    </section>
  );
}
