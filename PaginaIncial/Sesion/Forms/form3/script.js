document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('experiencia-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const params = new URLSearchParams();
        formData.forEach((value, key) => {
            params.append(key, value);
        });

        console.log(params.toString()); // Agrega esta línea para verificar que los datos se están capturando correctamente

        try {
            const response = await fetch(`http://localhost:5000/api/auth/formfour?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('Respuesta insertada correctamente');
                form.reset();
                window.location.href = '../form4/index.html'; // Cambia esto a la URL de la página de destino
            } else {
                alert('Hubo un problema al enviar los datos');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al enviar los datos');
        }
    });
});
