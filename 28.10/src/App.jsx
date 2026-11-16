import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage.js';

const initialPosts = [
  { id: 1, title: 'Как учиться регулярно', body: 'Небольшие ежедневные шаги помогают закрепить знания.' },
  { id: 2, title: 'Заметки разработчика', body: 'Храните идеи рядом с проектом и возвращайтесь к ним.' },
  { id: 3, title: 'Маршруты в SPA', body: 'Клиентская навигация меняет страницу без полной перезагрузки.' },
];
const users = [
  { id: 1, name: 'Анна', city: 'Москва', email: 'anna@example.com' },
  { id: 2, name: 'Пётр', city: 'Санкт-Петербург', email: 'petr@example.com' },
  { id: 3, name: 'Мария', city: 'Москва', email: 'maria@example.com' },
];
const ADMIN_ENABLED = false;

function Layout() {
  const [theme, setTheme] = useLocalStorage('practice-theme', 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="shell">
      <header>
        <strong>Практика 7–8</strong>
        <nav>
          <NavLink to="/">Todo</NavLink>
          <NavLink to="/posts">Блог</NavLink>
          <NavLink to="/users">Пользователи</NavLink>
          <NavLink to="/about">О проекте</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
        </button>
      </header>
      <main><Outlet /></main>
    </div>
  );
}

function Home() {
  const [count, setCount] = useLocalStorage('practice-counter', 0);
  const [note, setNote] = useState(() => localStorage.getItem('practice-note') ?? '');
  const [savedNote, setSavedNote] = useState(() => localStorage.getItem('practice-note') ?? '');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem('practice-note', note);
        setSavedNote(note);
      } catch (error) {
        console.warn('Не удалось сохранить черновик', error);
      }
    }, 500);
    return () => window.clearTimeout(timer);
  }, [note]);

  function clearSavedData() {
    if (!window.confirm('Сбросить счётчик, тему и черновик?')) return;
    localStorage.removeItem('practice-counter');
    localStorage.removeItem('practice-theme');
    localStorage.removeItem('practice-note');
    localStorage.removeItem('todos-v1');
    setCount(0);
    setNote('');
    setSavedNote('');
    window.location.reload();
  }

  return (
    <section>
      <h1>LocalStorage: мини Todo и упражнения</h1>
      <article className="card">
        <h2>Счётчик с сохранением</h2>
        <p className="counter">{count}</p>
        <button onClick={() => setCount((value) => value + 1)}>Увеличить</button>{' '}
        <button onClick={() => setCount((value) => value - 1)}>Уменьшить</button>
      </article>
      <article className="card">
        <h2>Черновик заметки (автосохранение через 500 мс)</h2>
        <textarea value={note} onChange={(event) => setNote(event.target.value)} />
        <small>{savedNote === note ? 'Сохранено' : 'Сохраняю…'}</small>
      </article>
      <article className="card">
        <h2>Todo с localStorage</h2>
        <Todo />
      </article>
      <button className="danger" onClick={clearSavedData}>Сбросить всё с подтверждением</button>
    </section>
  );
}

function Todo() {
  const [todos, setTodos] = useLocalStorage('todos-v1', []);
  const [text, setText] = useState('');
  function add(event) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((items) => [{ id: crypto.randomUUID(), text: trimmed, done: false }, ...items]);
    setText('');
  }
  return (
    <>
      <form onSubmit={add} className="row">
        <input value={text} onChange={(event) => setText(event.target.value)} placeholder="Новая задача" />
        <button>Добавить</button>
      </form>
      <p>Всего: {todos.length} · Выполнено: {todos.filter((todo) => todo.done).length}</p>
      {todos.length === 0 ? <p>Задач пока нет. Добавь первую!</p> : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <label><input type="checkbox" checked={todo.done} onChange={() => setTodos((items) => items.map((item) => item.id === todo.id ? { ...item, done: !item.done } : item))} /> {todo.text}</label>
              <button className="danger" onClick={() => setTodos((items) => items.filter((item) => item.id !== todo.id))}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function Posts() {
  return <section><h1>Блог</h1><p>Посты лежат в массиве в памяти.</p><ul>{initialPosts.map((post) => <li key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></li>)}</ul></section>;
}
function PostDetail() {
  const { id } = useParams();
  const post = initialPosts.find((item) => item.id === Number(id));
  return post ? <article><Link to="/posts">← Все посты</Link><h1>{post.title}</h1><p>{post.body}</p></article> : <p>Пост не найден. <Link to="/posts">К списку</Link></p>;
}
function Users() {
  const [params, setParams] = useSearchParams();
  const city = params.get('city') ?? '';
  const visibleUsers = useMemo(() => users.filter((user) => !city || user.city === city), [city]);
  return (
    <section>
      <h1>Пользователи</h1>
      <label>Фильтр по городу{' '}
        <select value={city} onChange={(event) => setParams(event.target.value ? { city: event.target.value } : {})}>
          <option value="">Все города</option><option value="Москва">Москва</option><option value="Санкт-Петербург">Санкт-Петербург</option>
        </select>
      </label>
      <ul>{visibleUsers.map((user) => <li key={user.id}><Link to={`/users/${user.id}`}>{user.name} — {user.city}</Link></li>)}</ul>
      {visibleUsers.length === 0 && <p>Пользователей нет.</p>}
    </section>
  );
}
function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find((item) => item.id === Number(id));
  if (!user) return <p>Пользователь не найден. <Link to="/users">К списку</Link></p>;
  return <section><p><Link to="/">Главная</Link> / <Link to="/users">Пользователи</Link> / {user.name}</p><h1>{user.name}</h1><p>{user.email}</p><p>{user.city}</p><button onClick={() => navigate(-1)}>← Назад</button></section>;
}
function Admin() {
  return ADMIN_ENABLED ? <h1>Панель администратора</h1> : <Navigate to="/" replace />;
}
function About() { return <section><h1>О проекте</h1><p>Задания по localStorage, кастомным хукам и React Router.</p></section>; }
function NotFound() { return <section><h1>404 — страница не найдена</h1><Link to="/">На главную</Link></section>; }

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
