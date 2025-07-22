async function loadPosts() {
  const res = await fetch('/api/posts');
  const posts = await res.json();

  const container = document.getElementById('posts');
  container.innerHTML = '';
  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `<strong>${post.author}</strong><p>${post.content}</p>`;
    container.appendChild(div);
  });
}

document.getElementById('postForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const author = document.getElementById('author').value;
  const content = document.getElementById('content').value;

  await fetch('/api/posts', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ author, content })
  });

  document.getElementById('postForm').reset();
  loadPosts();
});

loadPosts();
