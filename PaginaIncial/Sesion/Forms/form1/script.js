document.getElementById('formularioSalud').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const formData = new FormData(this);
  
    // Concatenar los valores de servicios básicos
    let serviciosBasicos = [];
    formData.getAll('servicios_basicos').forEach(value => serviciosBasicos.push(value));
    formData.set('servicios_basicos', serviciosBasicos.join(', '));
  
    const queryString = new URLSearchParams(formData).toString();
  
    fetch(`http://localhost:5000/api/auth/insertar?${queryString}`, {
      method: 'GET'
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      window.location.href = '../form2/index.html'; // Cambia 'pagina_siguiente.html' por la URL de la página a la que quieres redirigir
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un error al enviar los datos.');
    });
  });
  