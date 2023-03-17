
// funciones de graficado y publicación de data
function doughnut_report(n_problems_close, n_problems_open) {
    var canvas = document.getElementById('doughnut-chart');
    if (canvas.chart) {
        canvas.chart.destroy();
    }
    canvas.innerHTML = "";
    var ctx = canvas.getContext('2d');
    var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Closed', 'Open'],
            datasets: [{
                label: 'Problems',
                data: [n_problems_close, n_problems_open],
                backgroundColor: ['#6F2DA8', '#B4DC00'],
                borderWidth: 0
            }]
        },
        options: {
            legend: {
                position: 'top',
                labels: {
                    fontColor: '#242424',
                    boxWidth: 20,
                    padding: 10,
                    generateLabels: function (chart) {
                        var data = chart.data;
                        return data.labels.map(function (label, i) {
                            var meta = chart.getDatasetMeta(0);
                            var ds = data.datasets[0];
                            var arc = meta.data[i];
                            var custom = arc && arc.custom || {};
                            var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
                            var arcOpts = chart.options.elements.arc;
                            var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                            var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                            var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
                            return {
                                text: label + ': ' + ds.data[i],
                                fillStyle: fill,
                                strokeStyle: stroke,
                                lineWidth: bw,
                                hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                index: i
                            };
                        });
                    }
                }
            },
            title: {
                display: true,
                text: 'Cantidad de Problemas por estado'
            }
        }
    });
    canvas.chart = chart;

}

// Principal orquestador
async function generate(event) {
    
    //loading animation starts
    const loadingDiv = document.createElement("div");
    loadingDiv.setAttribute("id", "loading");
    const loadingImg = document.createElement("img");
    loadingImg.setAttribute("src", "static/images/settings.gif");
    loadingDiv.appendChild(loadingImg);
    document.body.appendChild(loadingDiv);

    // BEGIN Graphics functions
    //n_custom_alerts = problems_details.reduce((count, problem) => problem.severityLevel === 'CUSTOM_ALERT' ? count + 1 : count, 0);
    doughnut_report()
    // END Graphics functions

    //loading animation ends
    document.getElementById("loading").remove();
}