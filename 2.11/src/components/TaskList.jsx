import { useMemo, useState } from 'react';
import { useTasks } from '../hooks/useTasks.js';
import TaskItem from './TaskItem.jsx';

export default function TaskList() {
  const tasks = useTasks();
  const [filter, setFilter] = useState('all');
  const visible = useMemo(() => {
    if (filter === 'active') return tasks.filter((task) => !task.done);
    if (filter === 'done') return tasks.filter((task) => task.done);
    return tasks;
  }, [tasks, filter]);
  return (
    <section>
      <div className="row">{['all', 'active', 'done'].map((value) => <button key={value} onClick={() => setFilter(value)} aria-pressed={filter === value}>{value}</button>)}</div>
      {visible.length === 0 ? <p>Пусто</p> : <ul>{visible.map((task) => <TaskItem key={task.id} task={task} />)}</ul>}
    </section>
  );
}
