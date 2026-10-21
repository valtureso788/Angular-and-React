import { NavLink, Outlet } from 'react-router-dom';

const navStyle = {
  display: 'flex',
  gap: 16,
  padding: '12px 24px',
  background: '#1e293b',
  marginBottom: 0,
};

const linkStyle = ({ isActive }) => ({
  color: isActive ? '#60a5fa' : '#cbd5e1',
  textDecoration: 'none',
  fontWeight: isActive ? 700 : 400,
  fontSize: 16,
});

function Layout() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <nav style={navStyle}>
        <span style={{ color: '#fff', fontWeight: 700, marginRight: 8 }}>📝 Мои задачи</span>
        <NavLink to="/" end style={linkStyle}>
          Главная
        </NavLink>
        <NavLink to="/tasks" style={linkStyle}>
          Задачи
        </NavLink>
      </nav>
      <main style={{ maxWidth: 640, margin: '40px auto', padding: '0 20px' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
