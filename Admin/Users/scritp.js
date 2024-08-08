document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/api/auth/usuarios')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('users-table').getElementsByTagName('tbody')[0];
            data.forEach(user => {
                const row = tableBody.insertRow();

                const idCell = row.insertCell(0);
                idCell.textContent = user.id;
                idCell.setAttribute('data-label', 'ID');

                const nombreCell = row.insertCell(1);
                nombreCell.textContent = user.nombre;
                nombreCell.setAttribute('data-label', 'Nombre');

                const apellidosCell = row.insertCell(2);
                apellidosCell.textContent = user.apellidos;
                apellidosCell.setAttribute('data-label', 'Apellidos');

                const edadCell = row.insertCell(3);
                edadCell.textContent = user.edad;
                edadCell.setAttribute('data-label', 'Edad');

                const correoCell = row.insertCell(4);
                correoCell.textContent = user.correo;
                correoCell.setAttribute('data-label', 'Correo');

                const telefonoCell = row.insertCell(5);
                telefonoCell.textContent = user.numero_telefono;
                telefonoCell.setAttribute('data-label', 'Teléfono');

                const imagenCell = row.insertCell(6);
                const imgElement = document.createElement('img');
                imgElement.src = `http://localhost:5000/${user.imagen}`;
                imgElement.alt = 'Imagen de perfil';
                imgElement.style.width = '150px';
                imgElement.style.height = '150px';
                imagenCell.appendChild(imgElement);
                imagenCell.setAttribute('data-label', 'Imagen');
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
