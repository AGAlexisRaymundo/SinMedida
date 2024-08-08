document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('No se encontró token de autenticación');
        window.location.href = 'index.html'; // Redirige a la página de inicio de sesión si no hay token
        return;
    }

    try {
        // Petición para obtener los datos del perfil del usuario
        const profileResponse = await fetch('http://localhost:5000/api/auth/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (profileResponse.ok) {
            const userProfile = await profileResponse.json();
            mostrarPerfil(userProfile);
        } else {
            alert('Error al obtener datos de perfil');
            window.location.href = 'index.html'; // Redirige a la página de inicio de sesión en caso de error
        }

        // Petición para obtener la imagen de perfil del usuario
        const imageResponse = await fetch('http://localhost:5000/api/auth/profile/image', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (imageResponse.ok) {
            const imageBlob = await imageResponse.blob();
            mostrarImagenPerfil(imageBlob);
        } else {
            console.error('Error al obtener la imagen de perfil:', imageResponse.statusText);
        }

    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud al servidor');
        window.location.href = 'index.html'; // Redirige a la página de inicio de sesión en caso de error
    }
});

function mostrarPerfil(userProfile) {
    // Mostrar los datos del perfil en el HTML
    document.getElementById('profileNombre').textContent = userProfile.nombre || '';
    document.getElementById('profileApellidos').textContent = userProfile.apellidos || '';
    document.getElementById('profileEdad').textContent = userProfile.edad || '';
    document.getElementById('profileCorreo').textContent = userProfile.correo || '';
    document.getElementById('profileNumeroTelefono').textContent = userProfile.numero_telefono || '';
}

function mostrarImagenPerfil(imageBlob) {
    // Mostrar la imagen de perfil en el HTML
    const profileImage = document.getElementById('profileImage');
    profileImage.src = URL.createObjectURL(imageBlob);
}
