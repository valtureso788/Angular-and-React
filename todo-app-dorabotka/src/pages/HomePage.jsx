import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { DEMO_TASKS } from '../data/demoTasks';

function HomePage() {
  const [tasks] = useLocalStorage('tasks-app:v1', DEMO_TASKS);
  const navigate = useNavigate();

  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const active = total - done;

  const statStyle = {
    display: 'flex',
    gap: 20,
    marginBottom: 32,
  };

  const cardStyle = (color) => ({
    flex: 1,
    padding: '20px 16px',
    borderRadius: 12,
    background: color,
    color: '#fff',
    textAlign: 'center',
  });

  return (
    <div>
      <h1 style={{ marginBottom: 8 }}>👋 Добро пожаловать!</h1>
      <p style={{ color: '#64748b', marginBottom: 28 }}>Твои задачи на сегодня:</p>

      <div style={statStyle}>
        <div style={cardStyle('#3b82f6')}>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{total}</div>
          <div>Всего</div>
        </div>
        <div style={cardStyle('#10b981')}>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{done}</div>
          <div>Выполнено</div>
        </div>
        <div style={cardStyle('#f59e0b')}>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{active}</div>
          <div>Активных</div>
        </div>
      </div>

      <button
        onClick={() => navigate('/tasks')}
        style={{
          padding: '12px 28px',
          background: '#3b82f6',
          color: '#fff',
          border: 'none',
          borderRadius: 10,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Перейти к задачам →
      </button>
    </div>
  );
}

export default HomePage;
