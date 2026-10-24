// Универсальный цветной бейдж
function Badge({ text, color = '#eef2ff', textColor = '#4338ca', rounded = 6 }) {
  return (
    <span
      style={{
        background: color,
        color: textColor,
        padding: '4px 10px',
        borderRadius: rounded,
        fontSize: '12px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </span>
  );
}

export default Badge;
