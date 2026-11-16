import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { createTask, deleteTask, getTasks, updateTask } from '../api/tasks';
import EmptyState from '../components/EmptyState';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { useFavorites } from '../context/FavoritesContext';
import { useDebounce } from '../hooks/useDebounce';
import type { Task } from '../types';

type Filter = 'all' | 'active' | 'completed' | 'favorites';
function parseFilter(value: string): Filter {
  return value === 'active' || value === 'completed' || value === 'favorites' ? value : 'all';
}

export default function TasksPage() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useFavorites();
  const [search, setSearch] = useState('');
  const [project, setProject] = useState('all');
  const filter = parseFilter(searchParams.get('filter') ?? 'all');
  const searchTerm = useDebounce(search, 300);
  const tasksQuery = useQuery({ queryKey: ['tasks'], queryFn: getTasks });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (created) => queryClient.setQueryData<Task[]>(['tasks'], (current = []) => [created, ...current]),
  });
  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (updated) => {
      queryClient.setQueryData<Task[]>(['tasks'], (current = []) => current.map((task) => task.id === updated.id ? updated : task));
      queryClient.setQueryData(['tasks', updated.id], updated);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (_result, id) => {
      queryClient.setQueryData<Task[]>(['tasks'], (current = []) => current.filter((task) => task.id !== id));
      queryClient.removeQueries({ queryKey: ['tasks', id], exact: true });
    },
  });
  const updateTaskAction = updateMutation.mutate;
  const deleteTaskAction = deleteMutation.mutate;

  const filteredTasks = useMemo(() => {
    const tasks = tasksQuery.data ?? [];
    return tasks.filter((task) => {
      const matchesFilter = filter === 'favorites' ? favorites.includes(task.id)
        : filter === 'active' ? !task.completed
          : filter === 'completed' ? task.completed : true;
      const matchesSearch = task.title.toLocaleLowerCase('ru').includes(searchTerm.trim().toLocaleLowerCase('ru'));
      return matchesFilter && matchesSearch && (project === 'all' || task.project === project);
    });
  }, [tasksQuery.data, filter, favorites, searchTerm, project]);

  const setFilter = (value: Filter) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') params.delete('filter');
    else params.set('filter', value);
    setSearchParams(params);
  };
  const toggleCompleted = useCallback((task: Task) => {
    updateTaskAction({ ...task, completed: !task.completed });
  }, [updateTaskAction]);
  const removeTask = useCallback((id: number) => deleteTaskAction(id), [deleteTaskAction]);
  const selectedFilterLabel = filter === 'favorites' ? 'Ты пока ничего не добавил в избранное ⭐' : 'Задач пока нет. Создай первую!';

  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">ВАШ СПИСОК</p><h1>Задачи</h1></div><span>{filteredTasks.length} задач</span></div>
      <div className="panel">
        <h2>Добавить задачу</h2>
        <TaskForm onSubmit={async (values) => { await createMutation.mutateAsync(values); }} />
        {createMutation.isError && <p className="error">Не удалось создать задачу: {createMutation.error.message}</p>}
      </div>
      <div className="filters panel">
        <div className="filter-row">
          <label>Состояние
            <select value={filter} onChange={(event) => setFilter(parseFilter(event.target.value))}>
              <option value="all">Все</option><option value="active">Активные</option><option value="completed">Выполненные</option><option value="favorites">Избранные</option>
            </select>
          </label>
          <label>Проект
            <select value={project} onChange={(event) => setProject(event.target.value)}>
              <option value="all">Все проекты</option><option value="personal">Личное</option><option value="work">Работа</option><option value="study">Учёба</option>
            </select>
          </label>
          <label className="search-field">Поиск по названию
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Например, читать" />
          </label>
        </div>
        {search !== searchTerm && <small>Ищем…</small>}
      </div>
      {tasksQuery.isLoading && <p className="status-message">Загружаем задачи…</p>}
      {tasksQuery.isError && <div className="error-panel"><p>Не удалось загрузить задачи: {tasksQuery.error.message}</p><button onClick={() => void tasksQuery.refetch()}>Повторить</button></div>}
      {tasksQuery.isSuccess && tasksQuery.data.length === 0 && <EmptyState title="Задач пока нет. Создай первую!" hint="Добавленная задача появится здесь." />}
      {tasksQuery.isSuccess && tasksQuery.data.length > 0 && filteredTasks.length === 0 && (
        <EmptyState title={selectedFilterLabel} hint={filter === 'favorites' ? 'Отметь задачу звездой, чтобы добавить её в избранное.' : 'Измени фильтры или поисковый запрос.'} />
      )}
      {filteredTasks.length > 0 && (
        <ul className="task-list">
          {filteredTasks.map((task) => <TaskCard key={task.id} task={task} onToggle={toggleCompleted} onDelete={removeTask} />)}
        </ul>
      )}
      {(updateMutation.isError || deleteMutation.isError) && <p className="error">Не удалось обновить задачу: {(updateMutation.error ?? deleteMutation.error)?.message}</p>}
    </section>
  );
}
