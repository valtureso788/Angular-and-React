import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
      }}
    >
      <h1 style={{ fontSize: 80, margin: 0, color: '#cbd5e1' }}>404</h1>
      <h2 style={{ color: '#475569', marginBottom: 20 }}>Страница не найдена</h2>
      <Link
        to="/"
        style={{
          color: '#3b82f6',
          textDecoration: 'none',
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        ← На главную
      </Link>
    </div>
  );
}

export default NotFoundPage;
