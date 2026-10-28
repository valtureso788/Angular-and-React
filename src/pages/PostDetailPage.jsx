import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPost, deletePost } from '../api/posts';

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['posts', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/posts');
    },
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) {
    return (
      <div>
        <p>Пост не найден</p>
        <Link to="/posts">← К списку</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/posts">← К списку</Link>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      <p style={{ color: '#888' }}>Автор: {data.userId}</p>
      <Link to={`/posts/${id}/edit`}>
        <button>Редактировать</button>
      </Link>{' '}
      <button
        onClick={() => deleteMutation.mutate()}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending ? 'Удаление...' : 'Удалить'}
      </button>
      {deleteMutation.isError && (
        <p style={{ color: 'red' }}>Ошибка: {deleteMutation.error.message}</p>
      )}
    </div>
  );
}

export default PostDetailPage;
