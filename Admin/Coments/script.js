document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/api/auth/comentarios')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('comentarios-table').getElementsByTagName('tbody')[0];
            data.forEach(comentario => {
                const row = tableBody.insertRow();
                const idCell = row.insertCell(0);
                idCell.textContent = comentario.id;
                idCell.setAttribute('data-label', 'ID');

                const contenidoCell = row.insertCell(1);
                contenidoCell.textContent = comentario.contenido;
                contenidoCell.setAttribute('data-label', 'Contenido');

                const postCell = row.insertCell(2);
                postCell.textContent = comentario.post_titulo;
                postCell.setAttribute('data-label', 'Post');

                const autorCell = row.insertCell(3);
                autorCell.textContent = comentario.autor_nombre;
                autorCell.setAttribute('data-label', 'Autor');

                const fechaCell = row.insertCell(4);
                fechaCell.textContent = new Date(comentario.fecha).toLocaleString();
                fechaCell.setAttribute('data-label', 'Fecha');
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
