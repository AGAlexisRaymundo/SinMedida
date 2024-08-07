document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/api/auth/mostrar-citas')
        .then(response => response.json())
        .then(data => {
            const tableBodyCitas = document.querySelector('#data-table-citas tbody');
            if (tableBodyCitas) {
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.id}</td>
                        <td>${row.nombre}</td>
                        <td>${row.apellido}</td>
                        <td>${row.correo}</td>
                        <td>${row.fecha}</td>
                        <td>${row.hora_inicio}</td>
                        <td>${row.hora_fin}</td>
                        <td>${row.tipo_cita}</td>
                    `;
                    tableBodyCitas.appendChild(tr);
                });
            } else {
                console.error('No se encontró el elemento tbody para data-table-citas');
            }
        })
        .catch(error => console.error('Error al obtener datos de citas:', error));
});
