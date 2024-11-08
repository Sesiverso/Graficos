let chartInstance;
let pdf;

// Função para gerar o gráfico
function generateChart(labels, values, chartType) {
    const ctx = document.getElementById('chartCanvas').getContext('2d');

    // Se o gráfico já existir, destrua-o antes de criar um novo
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: chartType,
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
                    text: `Gráfico de ${chartType === 'pie' ? 'Pizza' : 'Colunas'}`
                }
            }
        }
    });

    setTimeout(createPDF, 2000);
}

// Função para criar o PDF
function createPDF() {
    const canvas = document.getElementById('chartCanvas');
    pdf = new jspdf.jsPDF();

    html2canvas(canvas).then(function(canvas) {
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 15, 40, 180, 160);
        document.getElementById('downloadBtn').disabled = false;
    });
}

// Evento de gerar gráfico
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const chartType = document.getElementById('chartType').value;
    const labels = document.getElementById('labels').value.split(',').map(label => label.trim());
    const values = document.getElementById('values').value.split(',').map(value => parseFloat(value.trim()));

    generateChart(labels, values, chartType);
});

// Função de download do PDF
document.getElementById('downloadBtn').addEventListener('click', function() {
    if (pdf) {
        document.getElementById('status').textContent = "Baixando...";
        pdf.save('grafico.pdf');
        setTimeout(() => {
            document.getElementById('status').textContent = "";
        }, 2000);
    }
});
