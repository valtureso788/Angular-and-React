import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteTask, getTask, updateTask } from '../api/tasks';
import EmptyState from '../components/EmptyState';
import TaskForm from '../components/TaskForm';
import type { Task, TaskFormValues } from '../types';

export default function TaskDetailPage() {
  const { id: rawId } = useParams();
  const taskId = Number(rawId);
  const validId = Number.isInteger(taskId) && taskId > 0;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const taskQuery = useQuery({
    queryKey: ['tasks', taskId],
    queryFn: () => getTask(taskId),
    enabled: validId,
    retry: false,
    initialData: () => queryClient.getQueryData<Task[]>(['tasks'])?.find((task) => task.id === taskId),
  });
  const updateMutation = useMutation({
    mutationFn: (task: Task) => updateTask(task),
    onSuccess: (task) => {
      queryClient.setQueryData(['tasks', task.id], task);
      queryClient.setQueryData<Task[]>(['tasks'], (current = []) => current.map((item) => item.id === task.id ? task : item));
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.setQueryData<Task[]>(['tasks'], (current = []) => current.filter((task) => task.id !== taskId));
      queryClient.removeQueries({ queryKey: ['tasks', taskId], exact: true });
      navigate('/tasks');
    },
  });

  if (!validId || taskQuery.isError || (!taskQuery.data && !taskQuery.isLoading)) {
    if (!validId || (taskQuery.isError && taskQuery.error.message === 'HTTP 404')) {
      return <EmptyState title="Задача не найдена" hint="Возможно, её удалили или ссылка неверна." />;
    }
    if (taskQuery.isError) {
      return <div className="error-panel"><p>Не удалось загрузить задачу: {taskQuery.error.message}</p><button onClick={() => void taskQuery.refetch()}>Повторить</button></div>;
    }
    return <EmptyState title="Задача не найдена" hint="Возможно, её удалили или ссылка неверна." />;
  }
  if (taskQuery.isLoading || !taskQuery.data) return <p className="status-message">Загружаем задачу…</p>;
  const task = taskQuery.data;
  const initialValues: TaskFormValues = {
    title: task.title,
    body: task.body,
    userId: task.userId,
    project: task.project,
    priority: task.priority,
    dueDate: task.dueDate ?? '',
  };
  async function save(values: TaskFormValues) {
    await updateMutation.mutateAsync({ ...task, ...values });
  }
  return (
    <section>
      <button className="text-button" onClick={() => navigate(-1)}>← Назад</button>
      <p className="eyebrow">ЗАДАЧА #{task.id}</p>
      <h1>{task.title}</h1>
      <p className="detail-description">{task.body}</p>
      <div className="detail-meta"><span>Проект: {task.project}</span><span>Приоритет: {task.priority}</span><span>Автор: {task.userId}</span><span>{task.completed ? 'Выполнена' : 'Активна'}</span></div>
      <div className="panel">
        <h2>Редактировать</h2>
        <TaskForm key={task.id} initialValues={initialValues} submitLabel="Сохранить изменения" onSubmit={save} />
      </div>
      {updateMutation.isError && <p className="error">Не удалось сохранить: {updateMutation.error.message}</p>}
      {deleteMutation.isError && <p className="error">Не удалось удалить: {deleteMutation.error.message}</p>}
      <button className="danger-button" onClick={() => deleteMutation.mutate(task.id)} disabled={deleteMutation.isPending}>Удалить задачу</button>
      {' '}<Link to="/tasks">К списку задач</Link>
    </section>
  );
}
