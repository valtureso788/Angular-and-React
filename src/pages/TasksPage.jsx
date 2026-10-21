import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { DEMO_TASKS } from '../data/demoTasks';

function TasksPage() {
  const [tasks, setTasks] = useLocalStorage('tasks-app:v1', DEMO_TASKS);
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const filter = searchParams.get('filter') || 'all';

  function handleAdd(e) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const newTask = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      description: description.trim(),
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
    setTitle('');
    setDescription('');
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTask(id) {
    if (!window.confirm('Удалить задачу?')) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function setFilter(value) {
    if (value === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter: value });
    }
  }

  const visibleTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.done).length,
    done: tasks.filter((t) => t.done).length,
  };

  const filters = [
    { key: 'all', label: 'Все' },
    { key: 'active', label: 'Активные' },
    { key: 'done', label: 'Выполненные' },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>📋 Список задач</h1>

      {/* Форма добавления */}
      <form onSubmit={handleAdd} style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название задачи (обязательно)"
          required
          style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 15 }}
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание (необязательно)"
          style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 14 }}
        />
        <button
          type="submit"
          style={{
            alignSelf: 'flex-start',
            padding: '10px 24px',
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Добавить
        </button>
      </form>

      {/* Фильтры */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: '8px 14px',
              border: '1px solid #ddd',
              borderRadius: 8,
              background: filter === f.key ? '#3b82f6' : 'white',
              color: filter === f.key ? 'white' : '#374151',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            {f.label} ({counts[f.key]})
          </button>
        ))}
      </div>

      {/* Список задач */}
      {visibleTasks.length === 0 ? (
        <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>Пусто</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {visibleTasks.map((task) => (
            <li
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 10px',
                borderBottom: '1px solid #e2e8f0',
                background: '#fff',
                borderRadius: 8,
                marginBottom: 6,
              }}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
              <Link
                to={`/tasks/${task.id}`}
                style={{
                  flex: 1,
                  textDecoration: task.done ? 'line-through' : 'none',
                  color: task.done ? '#94a3b8' : '#1e293b',
                  fontSize: 15,
                }}
              >
                {task.title}
              </Link>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 18,
                  color: '#ef4444',
                }}
                title="Удалить"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TasksPage;
