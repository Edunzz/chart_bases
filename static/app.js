
// funciones de graficado y publicación de data
function bar_chart(labels, datum, title_chart) {
    const container = document.getElementById('container');
    const newDiv = document.createElement('div');
    newDiv.className = 'col-lg-6 col-md-12';
    container.appendChild(newDiv);
    const canvas = document.createElement('canvas');
    canvas.id = 'bar-chart';
    newDiv.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const data = generateBarChartData(labels, datum);
    const config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: data
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: title_chart
                }
            }
        }
    };
    new Chart(ctx, config);
    console.log(data);
}

function generateBarChartData(labels, datum) {
    const colors = ['#6F2DA8', '#B4DC00', '#ff8c00', '#008b8b'];
    const data = [];
    for (let i = 0; i < labels.length; i++) {
        const colorIndex = i % colors.length;
        const color = colors[colorIndex];
        const item = {
            label: labels[i],
            data: [datum[i]],
            backgroundColor: color
        };
        data.push(item);
    }
    return data;
}


// Principal orquestador
function generate() {

    //loading animation starts
    const loadingDiv = document.createElement("div");
    loadingDiv.setAttribute("id", "loading");
    const loadingImg = document.createElement("img");
    loadingImg.setAttribute("src", "static/images/settings.gif");
    loadingDiv.appendChild(loadingImg);
    document.body.appendChild(loadingDiv);

    // BEGIN Graphics functions
    //n_custom_alerts = problems_details.reduce((count, problem) => problem.severityLevel === 'CUSTOM_ALERT' ? count + 1 : count, 0);
    const labels = ['Dataset 1', 'Dataset 2', 'Dataset N', 'Dataset N2'];
    const datum = [10, 20, 30, 80];
    bar_chart(labels, datum, "este es el primer chart barra de romerin");
    // END Graphics functions

    //loading animation ends
    document.getElementById("loading").remove();
}