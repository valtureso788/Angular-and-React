import { useState } from 'react';

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
  };

  function handleSave() {
    const trimmed = editText.trim();
    if (trimmed) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text);
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 12px 12px 8px',
        borderBottom: '1px solid #eee',
        borderLeft: `4px solid ${priorityColors[todo.priority]}`,
      }}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            flex: 1,
            padding: 6,
            borderRadius: 6,
            border: '1px solid #ddd',
          }}
        />
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span
            onDoubleClick={() => setIsEditing(true)}
            style={{
              cursor: 'pointer',
              textDecoration: todo.done ? 'line-through' : 'none',
              color: todo.done ? '#999' : '#1e293b',
            }}
            title="Двойной клик для редактирования"
          >
            {todo.text}
          </span>
          <span style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
            🕒 {formatDate(todo.createdAt)}
          </span>
        </div>
      )}

      {isEditing ? (
        <>
          <button
            onClick={handleSave}
            style={{ cursor: 'pointer', background: 'transparent', border: 'none', fontSize: 18 }}
            title="Сохранить"
          >
            💾
          </button>
          <button
            onClick={handleCancel}
            style={{ cursor: 'pointer', background: 'transparent', border: 'none', fontSize: 18 }}
            title="Отмена"
          >
            ✖️
          </button>
        </>
      ) : (
        <button
          onClick={() => onDelete(todo.id)}
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
      )}
    </li>
  );
}

export default TodoItem;