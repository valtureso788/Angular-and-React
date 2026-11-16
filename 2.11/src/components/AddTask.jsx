import { useState } from 'react';
import { useTasksDispatch } from '../hooks/useTasks.js';

export default function AddTask() {
  const dispatch = useTasksDispatch();
  const [text, setText] = useState('');
  function submit(event) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    dispatch({ type: 'ADD', payload: { id: crypto.randomUUID(), text: value, done: false } });
    setText('');
  }
  return <form className="row" onSubmit={submit}><input value={text} onChange={(event) => setText(event.target.value)} placeholder="Новая задача" /><button>Добавить</button></form>;
}
