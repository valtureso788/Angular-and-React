import { useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import AddTask from './components/AddTask.jsx';
import TaskList from './components/TaskList.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { useCart } from './context/CartContext.jsx';
import { useTheme } from './context/ThemeContext.jsx';
import { useDebounce } from './hooks/useDebounce.js';
import { usePrevious } from './hooks/usePrevious.js';
import { useTasks } from './hooks/useTasks.js';

const products = [
  { id: 1, name: 'Книга', price: 600 },
  { id: 2, name: 'Блокнот', price: 250 },
  { id: 3, name: 'Ручка', price: 100 },
];

function SearchDemo() {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 500);
  const isTyping = query !== debounced;
  const previousQuery = usePrevious(debounced);
  return (
    <section className="panel">
      <h2>useDebounce + usePrevious</h2>
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Введите текст для поиска" />
      {isTyping && <span> Печатает...</span>}
      <p>Результат поиска: {debounced || '—'}</p>
      <small>Предыдущее значение: {previousQuery ?? '—'}</small>
    </section>
  );
}

function Cart() {
  const { items, dispatch, total } = useCart();
  return (
    <section className="panel">
      <h2>Корзина (Context + useReducer)</h2>
      <div className="row">{products.map((product) => <button key={product.id} onClick={() => dispatch({ type: 'ADD', product })}>Добавить {product.name} · {product.price} ₽</button>)}</div>
      {items.map((item) => <p key={item.id}>{item.name} × {item.quantity} <button onClick={() => dispatch({ type: 'REMOVE', id: item.id })}>Убрать</button></p>)}
      <strong>Итого: {total} ₽</strong>{' '}
      <button onClick={() => dispatch({ type: 'CLEAR' })}>Очистить корзину</button>
    </section>
  );
}

function TasksStats() {
  const tasks = useTasks();
  return <p>Всего задач: {tasks.length} · Выполнено: {tasks.filter((task) => task.done).length}</p>;
}

function ProtectedArea() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return <section className="panel"><h2>Защищённый маршрут</h2><p>Доступ разрешён для {user.name}.</p></section>;
}

function Dashboard() {
  const { theme, setTheme } = useTheme();
  const { user, login, logout } = useAuth();
  const [name, setName] = useState('');
  return (
    <>
      <header className="row"><h1>Todo: Context API и продвинутые хуки</h1><button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Тема: {theme}</button></header>
      <section className="panel">
        <h2>Авторизация через Context</h2>
        {user ? <><p>Вы вошли как {user.name}</p><button onClick={logout}>Выйти</button></> : <form className="row" onSubmit={(event) => { event.preventDefault(); if (name.trim()) login(name.trim()); }}><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ваше имя" /><button>Войти</button></form>}
        {user && <p><Link to="/private">Открыть защищённый маршрут →</Link></p>}
      </section>
      <section className="panel">
        <h2>Todo: два контекста (состояние + dispatch)</h2>
        <AddTask />
        <TasksStats />
        <TaskList />
      </section>
      <SearchDemo />
      <Cart />
      <p className="note">Контекст удобен для общих данных, но локальное состояние формы оставлено в компоненте, который им владеет.</p>
    </>
  );
}

export default function App() {
  return (
    <main className="app">
      <nav className="row"><Link to="/">Todo и упражнения</Link><Link to="/private">Защищённая страница</Link></nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/private" element={<ProtectedArea />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}
