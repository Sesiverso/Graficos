let pieChart;

function generateChart(labels, values) {
    const ctx = document.getElementById('pieChart').getContext('2d');

    // Se o gráfico já existir, destrua-o antes de criar um novo
    if (pieChart) {
        pieChart.destroy();
    }

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Gráfico de Pizza'
                }
            }
        }
    });
}

document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const labels = document.getElementById('labels').value.split(',').map(label => label.trim());
    const values = document.getElementById('values').value.split(',').map(value => parseFloat(value.trim()));
    
    generateChart(labels, values);
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = document.getElementById('pieChart').toDataURL('image/png');
    link.download = 'grafico_de_pizza.png';
    link.click();
});
