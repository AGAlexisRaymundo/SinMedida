document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre_empresa_escuela = document.getElementById('nombre_empresa_escuela').value;
    const municipio = document.getElementById('municipio').value;
    const tema_platica = document.getElementById('tema_platica').value;
    const direccion = document.getElementById('direccion').value;
    const correo_electronico = document.getElementById('correo_electronico').value;
    const numero_telefono = document.getElementById('numero_telefono').value;
    const mensaje = document.getElementById('mensaje').value;

    const responseDiv = document.getElementById('response');

    // Crear objeto con los datos del formulario
    const formData = {
        nombre_empresa_escuela: nombre_empresa_escuela,
        municipio: municipio,
        tema_platica: tema_platica,
        direccion: direccion,
        correo_electronico: correo_electronico,
        numero_telefono: numero_telefono,
        mensaje: mensaje
    };

    // Enviar datos al servidor usando Fetch API
    fetch('http://localhost:5000/api/auth/insertar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la red.');
        }
        return response.text();
    })
    .then(data => {
        // Mostrar mensaje de éxito
        responseDiv.textContent = 'Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.';
    })
    .catch(error => {
        // Mostrar mensaje de error
        responseDiv.textContent = 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.';
    });

    // Limpiar el formulario después de enviar
    document.getElementById('contactForm').reset();
});
