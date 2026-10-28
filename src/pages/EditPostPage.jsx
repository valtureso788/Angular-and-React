import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PostForm from '../components/PostForm';
import { getPost, updatePost } from '../api/posts';
import { defaultPostValues } from '../schemas/postSchema';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
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

  // API отдаёт только title/body/userId — остальные поля берём по умолчанию
  const initialData = {
    ...defaultPostValues,
    title: data.title,
    body: data.body,
    userId: data.userId,
  };

  return (
    <div>
      <Link to="/posts">← К списку</Link>
      <h1>Редактирование поста #{id}</h1>
      <PostForm
        isEdit
        initialData={initialData}
        onSubmit={(values) => mutation.mutateAsync({ id, data: values })}
      />
    </div>
  );
}

export default EditPostPage;
