function calcularIMC(event) {
    event.preventDefault();

    var peso = document.getElementById("peso").value;
    var altura = document.getElementById("altura").value / 100; // Convertir a metros
    var imc = peso / (altura * altura);
    var resultado = document.getElementById("resultado");
    var distancia = document.getElementById("distancia");

    if (isNaN(imc)) {
        resultado.innerHTML = "Por favor ingresa valores válidos.";
    } else {
        var categoria = '';
        var mensajeDistancia = '';
        if (imc < 18.5) {
            categoria = 'Bajo peso';
            mensajeDistancia = `Necesitas ganar ${(18.5 - imc).toFixed(2)} puntos de IMC para alcanzar el peso normal.`;
        } else if (imc >= 18.5 && imc < 24.9) {
            categoria = 'Peso normal';
            mensajeDistancia = `Estás a ${(25 - imc).toFixed(2)} puntos de IMC del sobrepeso y ${(imc - 18.5).toFixed(2)} puntos de IMC del bajo peso.`;
        } else if (imc >= 25 && imc < 29.9) {
            categoria = 'Sobrepeso';
            mensajeDistancia = `Necesitas perder ${(imc - 24.9).toFixed(2)} puntos de IMC para alcanzar el peso normal y estás a ${(30 - imc).toFixed(2)} puntos de IMC de la obesidad.`;
        } else {
            categoria = 'Obesidad';
            mensajeDistancia = `Necesitas perder ${(imc - 29.9).toFixed(2)} puntos de IMC para alcanzar el sobrepeso.`;
        }

        resultado.innerHTML = `Tu IMC es: ${imc.toFixed(2)} (${categoria}).`;
        distancia.innerHTML = mensajeDistancia;

        // Cargar Google Charts
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Categoría', 'Cantidad'],
                ['Bajo peso', imc < 18.5 ? 1 : 0],
                ['Peso normal', imc >= 18.5 && imc < 24.9 ? 1 : 0],
                ['Sobrepeso', imc >= 25 && imc < 29.9 ? 1 : 0],
                ['Obesidad', imc >= 30 ? 1 : 0]
            ]);

            var options = {
                title: 'Categoría de IMC',
                pieHole: 0.4,
                colors: ['blue', 'green', 'orange', 'red']
            };

            var chart = new google.visualization.PieChart(document.getElementById('imcChart'));
            chart.draw(data, options);
        }
    }
}
