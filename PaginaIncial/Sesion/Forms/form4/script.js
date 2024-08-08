document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('experiencia-form');
    const identificadorInput = document.getElementById('identificador');

    // Función para generar un número aleatorio de 8 dígitos
    function generarIdentificador() {
        return Math.floor(10000000 + Math.random() * 90000000);
    }

    // Rellena el campo identificador con un número aleatorio
    identificadorInput.value = generarIdentificador();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Verificar si todos los campos están llenos
        const radioGroups = form.querySelectorAll('input[type="radio"]');
        let valid = true;
        
        radioGroups.forEach(group => {
            const name = group.name;
            if (document.querySelector(`input[name="${name}"]:checked`) === null) {
                valid = false;
            }
        });

        if (!valid) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }

        const formData = new FormData(form);
        const params = new URLSearchParams();

        formData.forEach((value, key) => {
            params.append(key, value);
        });

        const queryString = params.toString();
        const url = `http://localhost:5000/api/auth/formcin?${queryString}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('Respuesta insertada correctamente');

                // Espera 10 segundos antes de redirigir
                setTimeout(() => {
                    window.location.href = '../index.html'; // Reemplaza con la URL de la página a la que deseas redirigir
                }, 10000); // 10000 ms = 10 segundos
            } else {
                alert('Hubo un problema al enviar los datos');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al enviar los datos');
        }
    });
});
