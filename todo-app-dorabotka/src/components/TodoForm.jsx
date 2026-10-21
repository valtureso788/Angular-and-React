import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAdd({ text: trimmed, priority });
    setText('');
    setPriority('medium');
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: 8, marginBottom: 16 }}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Что нужно сделать?"
        style={{
          flex: 1,
          padding: 10,
          borderRadius: 8,
          border: '1px solid #ddd',
        }}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
      >
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Добавить
      </button>
    </form>
  );
}

export default TodoForm;