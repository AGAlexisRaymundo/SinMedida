document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (token) {
        mostrarElementosAutenticados();
    } else {
        mostrarElementosNoAutenticados();
    }

    const showLogin = document.getElementById('showLogin');
    const showRegister = document.getElementById('showRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (showLogin) {
        showLogin.addEventListener('click', () => {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        });
    }

    if (showRegister) {
        showRegister.addEventListener('click', () => {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
    }

    const showLoginLink = document.getElementById('showLoginLink');
    const showRegisterLink = document.getElementById('showRegisterLink');

    if (showLoginLink) {
        showLoginLink.addEventListener('click', () => {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        });
    }

    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', () => {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
    }

    const profileButton = document.getElementById('profileButton');
    const logoutButton = document.getElementById('logoutButton');
    const agendaButton = document.getElementById('agendaButton')

    if (profileButton) {
        profileButton.addEventListener('click', () => {
            window.location.href = 'Perfil/index.html'; // Cambiar a la página de perfil
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            alert('Sesión cerrada');
            mostrarElementosNoAutenticados();
        });
    }

    if (agendaButton) {
        agendaButton.addEventListener('click', () => {
            window.location.href = 'Forms/index.html'; // Cambiar a la página de formulario
        });
    }

    document.getElementById('loginFormInner').addEventListener('submit', async (e) => {
        e.preventDefault();
        const correo = document.getElementById('loginUsername').value; // Ajustado a 'loginUsername'
        const password = document.getElementById('loginPassword').value;

        // Verifica si el correo y la contraseña son los específicos
        const correoEspecifico = "admin@gmail.com";
        const passwordEspecifica = "SinMedida2023";

        if (correo === correoEspecifico && password === passwordEspecifica) {
            // Redirigir a otra página si el correo y la contraseña coinciden
            window.location.href = '../../Admin/index.html';
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo, password })
            });

            if (response.ok) {
                const data = await response.json();
                alert('Inicio de sesión exitoso');
                localStorage.setItem('token', data.token);
                mostrarElementosAutenticados();
            } else {
                const errorMessage = await response.text();
                alert(`Error al iniciar sesión: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error en el servidor al intentar iniciar sesión');
        }
    });

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
            } else {
                const errorMessage = await response.text();
                alert(`Error al registrar usuario: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Error en el servidor al intentar registrar usuario');
        }
    });
});

function mostrarElementosAutenticados() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('profileButton').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'block';
    document.getElementById('agendaButton').style.display = 'block'; // Mostrar el botón de formulario
}

function mostrarElementosNoAutenticados() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('profileButton').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('agendaButton').style.display = 'none'; // Ocultar el botón de formulario
}
