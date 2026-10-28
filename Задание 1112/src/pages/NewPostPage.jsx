import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PostForm from '../components/PostForm';
import { createPost } from '../api/posts';

function NewPostPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/posts');
    },
  });

  return (
    <div>
      <Link to="/posts">← К списку</Link>
      <h1>Новый пост</h1>
      <PostForm onSubmit={(data) => mutation.mutateAsync(data)} />
    </div>
  );
}

export default NewPostPage;
