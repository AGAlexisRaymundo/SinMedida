document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    // Función para cargar posts
    async function loadPosts() {
        try {
            const response = await fetch('http://localhost:5000/api/auth/posts', { headers });
            if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
            const posts = await response.json();
            const postsContainer = document.getElementById('postsContainer');
            postsContainer.innerHTML = ''; // Limpiar el contenedor antes de cargar los posts

            posts.forEach(post => {
                const postDiv = createPostElement(post);
                postsContainer.appendChild(postDiv);
            });

            addCommentEventListeners();
            loadComments(posts);
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        }
    }

    // Función para crear el elemento de post
    function createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <h2>${post.titulo}</h2>
            <p>${post.contenido}</p>
            <p><small>Por ${post.autor_nombre || 'Autor desconocido'} ${post.autor_apellidos || ''} el ${new Date(post.fecha).toLocaleDateString()}</small></p>
            <div class="comentarios" data-post-id="${post.id}"></div>
            <div class="nuevo-comentario">
                <textarea placeholder="Escribe un comentario..." data-post-id="${post.id}"></textarea>
                <button data-post-id="${post.id}">Comentar</button>
            </div>
        `;
        return postDiv;
    }

    // Función para agregar los event listeners a los botones de comentar
    function addCommentEventListeners() {
        document.querySelectorAll('.nuevo-comentario button').forEach(button => {
            button.addEventListener('click', async () => {
                const postId = button.dataset.postId;
                const contenido = document.querySelector(`textarea[data-post-id="${postId}"]`).value;

                if (!token) {
                    alert('Debes iniciar sesión para comentar');
                    return;
                }

                try {
                    const response = await fetch(`http://localhost:5000/api/auth/posts/${postId}/comentarios`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ contenido })
                    });

                    if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
                    alert('Comentario publicado');
                    loadPosts(); // Recargar los posts después de publicar el comentario
                } catch (error) {
                    console.error('Error al publicar comentario:', error);
                    alert('Error al publicar comentario');
                }
            });
        });
    }

    // Función para cargar los comentarios de los posts
    async function loadComments(posts) {
        posts.forEach(async post => {
            const comentariosContainer = document.querySelector(`.comentarios[data-post-id="${post.id}"]`);
            try {
                const response = await fetch(`http://localhost:5000/api/auth/posts/${post.id}/comentarios`, { headers });
                if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
                const comentarios = await response.json();
                comentariosContainer.innerHTML = ''; // Limpiar el contenedor antes de cargar los comentarios

                comentarios.forEach(comentario => {
                    const comentarioDiv = document.createElement('div');
                    comentarioDiv.classList.add('comentario');
                    comentarioDiv.innerHTML = `
                        <p>${comentario.contenido}</p>
                        <p><small>Por ${comentario.nombre || 'Autor desconocido'} ${comentario.apellidos || ''} el ${new Date(comentario.fecha).toLocaleDateString()}</small></p>
                    `;
                    comentariosContainer.appendChild(comentarioDiv);
                });
            } catch (error) {
                console.error('Error al obtener comentarios:', error);
                comentariosContainer.innerHTML = `<p>Error al obtener comentarios</p>`;
            }
        });
    }

    // Event listener para el formulario de nuevo post
    document.getElementById('newPostForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const titulo = document.getElementById('postTitle').value;
        const contenido = document.getElementById('postContent').value;

        if (!token) {
            alert('Debes iniciar sesión para crear un post');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ titulo, contenido })
            });

            if (!response.ok) throw new Error(`Error en la solicitud: ${response.statusText}`);
            alert('Post creado');
            loadPosts(); // Recargar los posts después de crear uno nuevo
        } catch (error) {
            console.error('Error al crear post:', error);
            alert('Error al crear post');
        }
    });

    // Cargar los posts al cargar la página
    loadPosts();
});
