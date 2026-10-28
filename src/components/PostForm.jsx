import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, defaultPostValues } from '../schemas/postSchema';

const errStyle = { color: 'red', margin: '2px 0', fontSize: 13 };
const rowStyle = { marginBottom: 14 };
const inputStyle = { display: 'block', width: '100%', padding: 8, boxSizing: 'border-box' };

function PostForm({ initialData, onSubmit, isEdit = false }) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
    defaultValues: initialData ?? defaultPostValues,
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'tags' });

  async function submit(data) {
    try {
      await onSubmit(data);
    } catch (err) {
      if (err.field) {
        setError(err.field, { type: 'server', message: err.message });
      } else {
        setError('root.serverError', { type: 'server', message: err.message });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <div style={rowStyle}>
        <label>Заголовок</label>
        <input style={inputStyle} {...register('title')} />
        {errors.title && <p style={errStyle}>{errors.title.message}</p>}
      </div>

      <div style={rowStyle}>
        <label>Текст</label>
        <textarea rows={4} style={inputStyle} {...register('body')} />
        {errors.body && <p style={errStyle}>{errors.body.message}</p>}
      </div>

      <div style={rowStyle}>
        <label>ID автора</label>
        <input type="number" style={inputStyle} {...register('userId')} />
        {errors.userId && <p style={errStyle}>{errors.userId.message}</p>}
      </div>

      <div style={rowStyle}>
        <label>Теги</label>
        {fields.map((field, i) => (
          <div key={field.id} style={{ marginBottom: 6 }}>
            <input
              style={{ padding: 8, marginRight: 6 }}
              placeholder={`Тег ${i + 1}`}
              {...register(`tags.${i}`)}
            />
            <button type="button" onClick={() => remove(i)}>
              Удалить тег
            </button>
            {errors.tags?.[i]?.message && (
              <p style={errStyle}>{errors.tags[i].message}</p>
            )}
          </div>
        ))}
        <button type="button" onClick={() => append('')}>
          Добавить тег
        </button>
        {errors.tags?.root && <p style={errStyle}>{errors.tags.root.message}</p>}
        {errors.tags?.message && <p style={errStyle}>{errors.tags.message}</p>}
      </div>

      <div style={rowStyle}>
        <label>Статус</label>
        <select style={inputStyle} {...register('status')}>
          <option value="draft">Черновик</option>
          <option value="published">Опубликован</option>
        </select>
        {errors.status && <p style={errStyle}>{errors.status.message}</p>}
      </div>

      <div style={rowStyle}>
        <label>Дата публикации</label>
        <input type="date" style={inputStyle} {...register('publishDate')} />
        {errors.publishDate && (
          <p style={errStyle}>{errors.publishDate.message}</p>
        )}
      </div>

      {errors.root?.serverError && (
        <p style={errStyle}>{errors.root.serverError.message}</p>
      )}

      <button
        type="submit"
        disabled={!isValid || isSubmitting || (!isDirty && isEdit)}
      >
        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
      </button>
    </form>
  );
}

export default PostForm;
