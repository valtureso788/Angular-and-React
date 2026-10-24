// Карточка статистики: label, value, color, icon
function StatCard({ label, value, color, icon }) {
  return (
    <div
      style={{
        flex: '1 1 200px',
        background: color,
        borderRadius: '12px',
        padding: '16px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {icon && <span style={{ marginRight: 6 }}>{icon}</span>}
        {value}
      </div>
      <div style={{ fontSize: '13px', color: '#555', marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default StatCard;
