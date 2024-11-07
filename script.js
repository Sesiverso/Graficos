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
                label: 'Dados do Gráfico',
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
                    display: true,
                    position: 'top', // Posição da legenda
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                },
                title: {
                    display: true,
                    text: `Gráfico de ${chartType === 'pie' ? 'Pizza' : 'Colunas'}`
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}`;
                        }
                    }
                }
            },
            scales: chartType === 'bar' ? {
                x: {
                    title: {
                        display: true,
                        text: 'Rótulos'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valores'
                    }
                }
            } : {}
        }
    });

    // Aguarda 2 segundos antes de criar o PDF com a imagem do gráfico
    setTimeout(createPDF, 2000);
}

// Função para criar e baixar o PDF com o gráfico
function createPDF() {
    const canvas = document.getElementById('chartCanvas');
    const imageData = canvas.toDataURL('image/png');

    pdf = new jsPDF('landscape');
    pdf.addImage(imageData, 'PNG', 10, 10, 280, 150);
}

// Função para baixar o PDF com o gráfico
function downloadPDF() {
    if (pdf) {
        pdf.save('grafico.pdf');
    } else {
        alert('Por favor, gere um gráfico antes de baixar o PDF.');
    }
}

// Função de controle para gerar o gráfico quando o botão é clicado
document.getElementById('generateButton').addEventListener('click', function () {
    const labelsInput = document.getElementById('labelsInput').value.split(',');
    const valuesInput = document.getElementById('valuesInput').value.split(',').map(Number);
    const chartType = document.getElementById('chartType').value;

    if (labelsInput.length !== valuesInput.length) {
        alert('Certifique-se de que a quantidade de rótulos e valores seja igual.');
        return;
    }

    generateChart(labelsInput, valuesInput, chartType);
});

// Função de controle para baixar o gráfico em PDF quando o botão é clicado
document.getElementById('downloadButton').addEventListener('click', downloadPDF);
