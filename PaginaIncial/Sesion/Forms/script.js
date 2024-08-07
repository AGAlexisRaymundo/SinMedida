document.addEventListener('DOMContentLoaded', () => {
    const showModalButton = document.getElementById('showModal');
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('closeModal');
    const identificadorForm = document.getElementById('identificador-form');

    showModalButton.addEventListener('click', (event) => {
        event.preventDefault();
        modal.style.display = 'flex';
    });

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    identificadorForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const identificador = document.getElementById('identificador').value;

        try {
            const response = await fetch(`http://localhost:5000/api/auth/ident?identificador=${identificador}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Redirigir a otra página si el identificador es correcto
                window.location.href = '../../Citas/index.html'; // Cambia esto a la URL deseada
            } else {
                alert('Identificador no encontrado');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al enviar el identificador');
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
