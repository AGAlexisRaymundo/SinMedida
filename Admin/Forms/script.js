document.addEventListener('DOMContentLoaded', () => {
    // Fetch data for formuno
    fetch('http://localhost:5000/api/auth/mostrar-formuno')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#data-table-formuno tbody');
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>${row.fecha_ingreso}</td>
                    <td>${row.enfermedades_cronicas}</td>
                    <td>${row.embarazo}</td>
                    <td>${row.sobrepeso_obesidad}</td>
                    <td>${row.programa_actividad_fisica}</td>
                    <td>${row.programa_nutricion}</td>
                    <td>${row.contraindicacion_actividad_fisica}</td>
                `;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Fetch data for formdos
    fetch('http://localhost:5000/api/auth/mostrar-formdos')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#data-table-formdos tbody');
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>${row.nombre_apellidos}</td>
                    <td>${row.fecha_nacimiento}</td>
                    <td>${row.sexo}</td>
                    <td>${row.estado_civil}</td>
                    <td>${row.escolaridad}</td>
                    <td>${row.servicios_basicos}</td>
                    <td>${row.lugar_nacimiento}</td>
                    <td>${row.estado_vives}</td>
                    <td>${row.municipio_vives}</td>
                    <td>${row.telefono_contacto}</td>
                    <td>${row.correo_electronico}</td>
                    <td>${row.religion}</td>
                    <td>${row.ocupacion}</td>
                    <td>${row.apoyo_gobierno}</td>
                    <td>${row.grupo_etnico}</td>
                    <td>${row.afiliacion_institucion}</td>
                    <td>${row.ingreso_mensual}</td>
                    <td>${row.egreso_mensual}</td>
                    <td>${row.estudios_jefe_hogar}</td>
                    <td>${row.numero_banos}</td>
                    <td>${row.numero_automoviles}</td>
                    <td>${row.internet_hogar}</td>
                    <td>${row.personas_trabajaron_mes}</td>
                    <td>${row.cuartos_para_dormir}</td>
                    <td>${row.familiar_vive_usa}</td>
                    <td>${row.sabe_proyecto_vida}</td>
                    <td>${row.tiene_proyecto_vida}</td>
                    <td>${row.estilo_vida_sano}</td>
                `;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

            // Fetch data for formtres
    fetch('http://localhost:5000/api/auth/mostrar-formtres')
        .then(response => response.json())
        .then(data => {
            const tableBodyFormtres = document.querySelector('#data-table-formtres tbody');
            if (tableBodyFormtres) {
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.id}</td>
                        <td>${row.pregunta1}</td>
                        <td>${row.pregunta2}</td>
                        <td>${row.pregunta3}</td>
                        <td>${row.pregunta4}</td>
                        <td>${row.pregunta5}</td>
                        <td>${row.pregunta6}</td>
                        <td>${row.pregunta7}</td>
                        <td>${row.pregunta8}</td>
                        <td>${row.pregunta9}</td>
                        <td>${row.pregunta10}</td>
                        <td>${row.pregunta11}</td>
                        <td>${row.pregunta12}</td>
                        <td>${row.pregunta13}</td>
                        <td>${row.pregunta14}</td>
                        <td>${row.pregunta15}</td>
                        <td>${row.fecha_registro}</td>
                    `;
                    tableBodyFormtres.appendChild(tr);
                });
            } else {
                console.error('No tbody element found for data-table-formtres');
            }
        })
        .catch(error => console.error('Error fetching data for formtres:', error));

                // Fetch data for formfour
    fetch('http://localhost:5000/api/auth/mostrar-formfour')
    .then(response => response.json())
    .then(data => {
        const tableBodyFormfour = document.querySelector('#data-table-formfour tbody');
        if (tableBodyFormfour) {
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>${row.me_gusta_mi_vida}</td>
                    <td>${row.soy_una_persona_feliz}</td>
                    <td>${row.estoy_satisfecho}</td>
                    <td>${row.mi_vida_me_trae_alegria}</td>
                    <td>${row.mi_vida_es_feliz}</td>
                    <td>${row.disfruto_de_mi_vida}</td>
                    <td>${row.mi_vida_es_maravillosa}</td>
                    <td>${row.estoy_de_buenas}</td>
                `;
                tableBodyFormfour.appendChild(tr);
            });
        } else {
            console.error('No se encontró el elemento tbody para data-table-formfour');
        }
    })
    .catch(error => console.error('Error al obtener datos de formfour:', error));

    // Fetch data for formcin
    fetch('http://localhost:5000/api/auth/mostrar-formcin')
        .then(response => response.json())
        .then(data => {
            const tableBodyFormcin = document.querySelector('#data-table-formcin tbody');
            if (tableBodyFormcin) {
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.id}</td>
                        <td>${row.identificador}</td>
                        <td>${row.respeto_mi_cuerpo}</td>
                        <td>${row.me_siento_bien_con_mi_cuerpo}</td>
                        <td>${row.siento_que_mi_cuerpo_tiene_buenas_cualidades}</td>
                        <td>${row.actitud_positiva_hacia_mi_cuerpo}</td>
                        <td>${row.atento_a_las_necesidades_de_mi_cuerpo}</td>
                        <td>${row.siento_amor_por_mi_cuerpo}</td>
                        <td>${row.valoro_caracteristicas_unicas_de_mi_cuerpo}</td>
                        <td>${row.comportamiento_refleja_actitud_positiva}</td>
                        <td>${row.me_siento_a_gusto_con_mi_cuerpo}</td>
                        <td>${row.me_siento_guapo_aunque_diferente_de_modelos}</td>
                    `;
                    tableBodyFormcin.appendChild(tr);
                });
            } else {
                console.error('No se encontró el elemento tbody para data-table-formcin');
            }
        })
        .catch(error => console.error('Error al obtener datos de formcin:', error));
});
