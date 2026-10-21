import { useParams, useNavigate, Link } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { DEMO_TASKS } from '../data/demoTasks';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString('ru-RU');
}

function TaskDetailPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useLocalStorage('tasks-app:v1', DEMO_TASKS);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <h2 style={{ color: '#ef4444' }}>Задача не найдена</h2>
        <Link to="/tasks" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: 16 }}>
          ← Вернуться к списку
        </Link>
      </div>
    );
  }

  function toggleDone() {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t))
    );
  }

  function handleDelete() {
    if (!window.confirm('Удалить задачу?')) return;
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    navigate('/tasks');
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#3b82f6',
          fontSize: 16,
          cursor: 'pointer',
          marginBottom: 20,
          padding: 0,
        }}
      >
        ← Назад
      </button>

      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: 28,
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        }}
      >
        <h2 style={{ marginBottom: 8, color: '#1e293b' }}>{task.title}</h2>

        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16 }}>
          🕒 Создана: {formatDate(task.createdAt)}
        </p>

        <p style={{ marginBottom: 16 }}>
          Статус:{' '}
          <strong style={{ color: task.done ? '#10b981' : '#f59e0b' }}>
            {task.done ? '✅ Выполнена' : '⏳ В работе'}
          </strong>
        </p>

        {task.description ? (
          <p style={{ marginBottom: 24, color: '#374151', lineHeight: 1.6 }}>
            {task.description}
          </p>
        ) : (
          <p style={{ marginBottom: 24, color: '#94a3b8', fontStyle: 'italic' }}>
            Описание не указано
          </p>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={toggleDone}
            style={{
              padding: '10px 20px',
              background: task.done ? '#f59e0b' : '#10b981',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {task.done ? 'Вернуть в работу' : 'Отметить выполненной'}
          </button>

          <button
            onClick={handleDelete}
            style={{
              padding: '10px 20px',
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage;
