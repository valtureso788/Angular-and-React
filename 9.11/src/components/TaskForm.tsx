import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { defaultTaskValues, taskSchema, type TaskFormValues } from '../schemas/taskSchema';
import ProjectSelector from './ProjectSelector';

export default function TaskForm({ onSubmit, initialValues = defaultTaskValues, submitLabel = 'Добавить задачу' }: {
  onSubmit: (values: TaskFormValues) => Promise<void>;
  initialValues?: TaskFormValues;
  submitLabel?: string;
}) {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialValues,
  });

  async function submit(values: TaskFormValues) {
    try {
      await onSubmit(values);
      if (initialValues === defaultTaskValues) reset(defaultTaskValues);
    } catch {
      // The parent renders the mutation error and the entered values stay in the form.
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit(submit)} noValidate>
      <label>Название<input {...register('title')} placeholder="Например, подготовить презентацию" />{errors.title && <small className="error">{errors.title.message}</small>}</label>
      <label>Описание<textarea {...register('body')} rows={3} placeholder="Что нужно сделать?" />{errors.body && <small className="error">{errors.body.message}</small>}</label>
      <div className="form-grid">
        <label>Автор (userId)<input type="number" {...register('userId', { valueAsNumber: true })} />{errors.userId && <small className="error">{errors.userId.message}</small>}</label>
        <ProjectSelector value={watch('project')} onChange={(value) => setValue('project', value, { shouldValidate: true })} />
        <label>Приоритет<select {...register('priority')}><option value="low">Низкий</option><option value="medium">Средний</option><option value="high">Высокий</option></select></label>
        <label>Срок<input type="date" {...register('dueDate')} /></label>
      </div>
      <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Сохранение…' : submitLabel}</button>
    </form>
  );
}
