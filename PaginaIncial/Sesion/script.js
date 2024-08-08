document.addEventListener('DOMContentLoaded', () => {
    const showLogin = document.getElementById('showLogin');
    const showRegister = document.getElementById('showRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (showLogin && showRegister && loginForm && registerForm) {
        showLogin.addEventListener('click', () => {
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        });

        showRegister.addEventListener('click', () => {
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        });

        const showRegisterLink = document.getElementById('showRegisterLink');
        if (showRegisterLink) {
            showRegisterLink.addEventListener('click', () => {
                showRegister.click();
            });
        }

        const showLoginLink = document.getElementById('showLoginLink');
        if (showLoginLink) {
            showLoginLink.addEventListener('click', () => {
                showLogin.click();
            });
        }
    } else {
        console.error('Elementos HTML no encontrados o no definidos correctamente.');
    }
});
