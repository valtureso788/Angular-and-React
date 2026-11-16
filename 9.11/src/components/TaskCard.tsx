import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import type { Task } from '../types';

const FavoriteButton = memo(function FavoriteButton({ id }: { id: number }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(id);
  return (
    <button className="favorite-button" aria-label={favorite ? 'Убрать из избранного' : 'В избранное'} onClick={() => toggleFavorite(id)}>
      {favorite ? '⭐' : '☆'}
    </button>
  );
});

function TaskCard({ task, onToggle, onDelete }: {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
}) {
  const handleToggle = useCallback(() => onToggle(task), [onToggle, task]);
  const handleDelete = useCallback(() => onDelete(task.id), [onDelete, task.id]);
  if (import.meta.env.DEV) console.log('render TaskCard', task.id);
  return (
    <li className={`task-card ${task.completed ? 'is-completed' : ''}`}>
      <input aria-label="Отметить выполненной" type="checkbox" checked={task.completed} onChange={handleToggle} />
      <FavoriteButton id={task.id} />
      <div className="task-summary">
        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
        <small>{task.project} · {task.priority}{task.dueDate ? ` · до ${task.dueDate}` : ''}</small>
      </div>
      <button className="danger-button" onClick={handleDelete}>Удалить</button>
    </li>
  );
}

export default memo(TaskCard);
