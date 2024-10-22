let pieChart;
let pdf; // Variável para armazenar o PDF gerado

// Função para gerar o gráfico
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

    // Após gerar o gráfico, cria automaticamente o PDF
    createPDF();
}

// Função para criar o PDF
function createPDF() {
    const canvas = document.getElementById('pieChart');
    pdf = new jspdf.jsPDF(); // Inicializa o PDF

    // Usa html2canvas para capturar a imagem do canvas
    html2canvas(canvas).then(function(canvas) {
        const imgData = canvas.toDataURL('image/png');
        
        // Adiciona a imagem ao PDF
        pdf.addImage(imgData, 'PNG', 15, 40, 180, 160);
        
        // Habilita o botão de download
        document.getElementById('downloadBtn').disabled = false;
    });
}

// Evento de gerar gráfico
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const labels = document.getElementById('labels').value.split(',').map(label => label.trim());
    const values = document.getElementById('values').value.split(',').map(value => parseFloat(value.trim()));
    
    generateChart(labels, values);
});

// Função de download do PDF
document.getElementById('downloadBtn').addEventListener('click', function() {
    if (pdf) {
        document.getElementById('status').textContent = "Baixando..."; // Exibe mensagem de status
        pdf.save('grafico_de_pizza.pdf'); // Realiza o download do PDF

        // Após o download, limpa a mensagem de status
        setTimeout(() => {
            document.getElementById('status').textContent = "";
        }, 2000);
    }
});
