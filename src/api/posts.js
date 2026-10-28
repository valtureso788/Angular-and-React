const BASE = 'https://jsonplaceholder.typicode.com';

async function request(url, options) {
  const res = await fetch(`${BASE}${url}`, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const json = (method, data) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

// Имитация серверной валидации (jsonplaceholder сам такого не умеет):
// заголовок со словом "forbidden" отклоняется с ошибкой поля title.
function checkServerRules(data) {
  if (data.title?.toLowerCase().includes('forbidden')) {
    const err = new Error('Такой заголовок запрещён сервером');
    err.field = 'title';
    throw err;
  }
}

export function getPosts() {
  return request('/posts?_limit=10');
}

export async function getPost(id) {
  const post = await request(`/posts/${id}`);
  // jsonplaceholder на несуществующий id отдаёт 404 и/или пустой объект
  if (!post || !post.id) throw new Error('Пост не найден');
  return post;
}

export async function createPost(data) {
  checkServerRules(data);
  return request('/posts', json('POST', data));
}

export async function updatePost({ id, data }) {
  checkServerRules(data);
  return request(`/posts/${id}`, json('PUT', { id, ...data }));
}

export async function deletePost(id) {
  await request(`/posts/${id}`, { method: 'DELETE' });
  return id;
}
