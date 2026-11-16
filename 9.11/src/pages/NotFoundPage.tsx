import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <section className="not-found"><p className="eyebrow">404</p><h1>Такой страницы нет</h1><p>Проверь адрес или вернись к списку задач.</p><Link className="primary-link" to="/">На главную</Link></section>;
}
