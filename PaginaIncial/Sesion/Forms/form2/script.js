document.getElementById('formularioSalud').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const queryString = new URLSearchParams(formData).toString();

    fetch(`http://localhost:5000/api/auth/formtres?${queryString}`, {
        method: 'GET'
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        window.location.href = '../form3/index.html'; // Cambia 'index.html' por la URL de la página a la que quieres redirigir
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al enviar los datos.');
    });
});
