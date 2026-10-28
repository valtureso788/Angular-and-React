import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, deletePost } from '../api/posts';

function PostsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previous = queryClient.getQueryData(['posts']);
      queryClient.setQueryData(['posts'], (old = []) =>
        old.filter((p) => p.id !== id)
      );
      return { previous };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['posts'], context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) {
    return (
      <div>
        <p style={{ color: 'red' }}>Ошибка: {error.message}</p>
        <button onClick={() => refetch()}>Повторить</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Блог</h1>
        <Link to="/posts/new">
          <button>Создать пост</button>
        </Link>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.map((post) => (
          <li key={post.id} style={{ borderBottom: '1px solid #ddd', padding: '12px 0' }}>
            <Link to={`/posts/${post.id}`}>
              <strong>{post.title}</strong>
            </Link>
            <p style={{ fontSize: 13, color: '#666' }}>
              {post.body.slice(0, 80)}…
            </p>
            <Link to={`/posts/${post.id}/edit`}>
              <button>Редактировать</button>
            </Link>{' '}
            <button
              onClick={() => deleteMutation.mutate(post.id)}
              disabled={deleteMutation.isPending}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsPage;
