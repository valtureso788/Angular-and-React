// src/components/Footer.jsx
function Footer() {
  return (
    <footer style={{ marginTop: 32, padding: 16, textAlign: 'center', color: '#6b7280', fontSize: 14 }}>
      © {new Date().getFullYear()} Каталог студентов
    </footer>
  );
}

export default Footer;
