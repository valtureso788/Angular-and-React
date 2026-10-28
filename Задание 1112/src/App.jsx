import { Routes, Route, Navigate } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import NewPostPage from './pages/NewPostPage';
import EditPostPage from './pages/EditPostPage';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 20, fontFamily: 'sans-serif' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<PostsPage />} />
        {/* /posts/new — до /posts/:id, иначе "new" уйдёт в :id */}
        <Route path="/posts/new" element={<NewPostPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/:id/edit" element={<EditPostPage />} />
        <Route path="*" element={<Navigate to="/posts" replace />} />
      </Routes>
    </div>
  );
}

export default App;
