import { memo, useCallback } from 'react';
import { useTasksDispatch } from '../hooks/useTasks.js';

const TaskItem = memo(function TaskItem({ task }) {
  const dispatch = useTasksDispatch();
  const toggle = useCallback(() => dispatch({ type: 'TOGGLE', payload: task.id }), [dispatch, task.id]);
  const remove = useCallback(() => dispatch({ type: 'DELETE', payload: task.id }), [dispatch, task.id]);
  console.log('render TaskItem', task.text);
  return (
    <li>
      <input type="checkbox" checked={task.done} onChange={toggle} />
      <span className={task.done ? 'done' : ''}>{task.text}</span>
      <button onClick={remove}>Удалить</button>
    </li>
  );
});
export default TaskItem;
