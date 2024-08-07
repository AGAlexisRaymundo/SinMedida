document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/api/auth/posts')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('posts-table').getElementsByTagName('tbody')[0];
            data.forEach(post => {
                const row = tableBody.insertRow();
                const idCell = row.insertCell(0);
                idCell.textContent = post.id;
                idCell.setAttribute('data-label', 'ID');

                const tituloCell = row.insertCell(1);
                tituloCell.textContent = post.titulo;
                tituloCell.setAttribute('data-label', 'Título');

                const contenidoCell = row.insertCell(2);
                contenidoCell.textContent = post.contenido;
                contenidoCell.setAttribute('data-label', 'Contenido');

                const autorCell = row.insertCell(3);
                autorCell.textContent = post.autor_nombre;
                autorCell.setAttribute('data-label', 'Autor');

                const fechaCell = row.insertCell(4);
                fechaCell.textContent = new Date(post.fecha).toLocaleString();
                fechaCell.setAttribute('data-label', 'Fecha');
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
