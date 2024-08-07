document.getElementById('registerFormInner').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', document.getElementById('registerNombre').value);
    formData.append('apellidos', document.getElementById('registerApellidos').value);
    formData.append('edad', document.getElementById('registerEdad').value);
    formData.append('correo', document.getElementById('registerCorreo').value);
    formData.append('numero_telefono', document.getElementById('registerNumeroTelefono').value);
    formData.append('password', document.getElementById('registerPassword').value);
    formData.append('imagen', document.getElementById('registerImagen').files[0]);

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Usuario registrado');
        } 
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error al registrar usuario');
    }
});
