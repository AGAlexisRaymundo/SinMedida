document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#formulariosTable tbody');
    const responseDiv = document.getElementById('response');

    function fetchAndDisplayData() {
        fetch('http://localhost:5000/api/auth/formularios')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red.');
                }
                return response.json();
            })
            .then(data => {
                tableBody.innerHTML = ''; // Limpiar cualquier contenido existente en la tabla

                data.forEach(item => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td data-label="ID">${item.id}</td>
                        <td data-label="Nombre Empresa/Escuela">${item.nombre_empresa_escuela}</td>
                        <td data-label="Municipio">${item.municipio}</td>
                        <td data-label="Tema Plática">${item.tema_platica}</td>
                        <td data-label="Dirección">${item.direccion}</td>
                        <td data-label="Correo Electrónico">${item.correo_electronico}</td>
                        <td data-label="Número Teléfono">${item.numero_telefono}</td>
                        <td data-label="Mensaje">${item.mensaje}</td>
                        <td data-label="Fecha">${item.fecha}</td>
                    `;

                    tableBody.appendChild(row);
                });

                responseDiv.textContent = 'Datos cargados correctamente.';
            })
            .catch(error => {
                responseDiv.textContent = 'Hubo un problema al cargar los datos. Por favor, inténtalo de nuevo más tarde.';
                console.error('Error:', error);
            });
    }

    fetchAndDisplayData();
});
