document.addEventListener('DOMContentLoaded', function() {
    const tipoCitaSelect = document.getElementById('tipo_cita');
    const presencialOptions = document.getElementById('presencial-options');
    const virtualOptions = document.getElementById('virtual-options');
    const form = document.getElementById('appointmentForm');

    tipoCitaSelect.addEventListener('change', function() {
        const selectedType = tipoCitaSelect.value;

        if (selectedType === 'Presencial') {
            presencialOptions.classList.remove('hidden');
            virtualOptions.classList.add('hidden');
        } else if (selectedType === 'Virtual') {
            presencialOptions.classList.add('hidden');
            virtualOptions.classList.remove('hidden');
        } else {
            presencialOptions.classList.add('hidden');
            virtualOptions.classList.add('hidden');
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            correo: formData.get('correo'),
            fecha: formData.get(tipoCitaSelect.value === 'Presencial' ? 'fecha_presencial' : 'fecha_virtual'),
            hora_inicio: formData.get(tipoCitaSelect.value === 'Presencial' ? 'hora_presencial' : 'hora_virtual').split('-')[0],
            hora_fin: formData.get(tipoCitaSelect.value === 'Presencial' ? 'hora_presencial' : 'hora_virtual').split('-')[1],
            tipo_cita: formData.get('tipo_cita')
        };

        const queryString = new URLSearchParams(data).toString();

        fetch(`http://localhost:5000/api/auth/insertar-cita?${queryString}`, {
            method: 'GET'
        })
        .then(response => response.text())
        .then(responseText => {
            alert(responseText);
        })
        .catch(error => {
            console.error('Error al insertar datos:', error);
            alert('Error al insertar datos');
        });
    });
});
