document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioSalud');
    let isFormSubmitted = false;

    if (formulario) {
        formulario.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (isFormSubmitted) {
                alert('El formulario ya ha sido enviado.');
                return;
            }

            try {
                // Obtener los valores del formulario de manera segura
                const enfermedades_cronicas = getValue('enfermedadesCronicas');
                const embarazo = getValue('embarazo');
                const sobrepeso_obesidad = getValue('sobrepesoObesidad');
                const programa_actividad_fisica = getValue('programaActividadFisica');
                const programa_nutricion = getValue('programaNutricion');
                const contraindicacion_actividad_fisica = getValue('contraindicacionActividadFisica');

                // Función para obtener el valor de un select por ID
                function getValue(id) {
                    const element = document.getElementById(id);
                    return element ? element.value : '';
                }

                // Objeto con los datos del formulario
                const formData = {
                    enfermedades_cronicas,
                    embarazo,
                    sobrepeso_obesidad,
                    programa_actividad_fisica,
                    programa_nutricion,
                    contraindicacion_actividad_fisica
                };

                const response = await fetch('http://localhost:5000/api/auth/formuno', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Formulario enviado correctamente');

                    // Deshabilitar todos los campos del formulario después de enviarlo
                    Array.from(formulario.elements).forEach((element) => {
                        element.disabled = true;
                    });

                    // Establecer la bandera de envío del formulario
                    isFormSubmitted = true;

                    // Redirigir a otra página
                    window.location.href = '../form1/index.html'; // Cambia '/ruta-a-la-nueva-pagina' por la URL a la que quieres redirigir
                } else {
                    const errorMessage = await response.text();
                    alert(`Error al enviar formulario: ${errorMessage}`);
                }
            } catch (error) {
                console.error('Error al enviar formulario:', error);
                alert('Error en el servidor al intentar enviar formulario');
            }
        });
    } else {
        console.error('No se encontró el formulario en el DOM.');
    }
});
