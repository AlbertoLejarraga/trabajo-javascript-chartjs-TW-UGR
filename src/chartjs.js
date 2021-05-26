const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let chart = null;
let tipoChart = null;
const varsX = 10
const varsY = 10
function obtenerEtiquetas(longitud = null){
    if (!longitud) longitud = varsX;
    return abc.substr(0, longitud).split("");
}
function listaNumerosRandom(numElems){
    //Devuelve una lista de numElems numeros random de inicio a fin (numeros de 0 a 10, por ejemplo)
    let lista = []
    for (let i=0;i<numElems;i++){
        lista.push(Math.floor((Math.random() * varsY)));
    }
    return lista;
}
function colorRandom(){
    return "rgb(" + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", " +Math.floor((Math.random() * 255)) + ")"
}
function addData(){
    const data = chart.data;
    if (data.datasets.length > 0) {
        data.labels = obtenerEtiquetas(data.labels.length + 1);
        for (var i = 0; i < data.datasets.length; i++) {
            data.datasets[i].data.push(Math.floor((Math.random() * varsY)));
        }
        chart.update();
    }
}
function addDataset(){
    const data = chart.data;

    let newDataset = {
        label: 'Dataset ' + (data.datasets.length + 1),
        data: listaNumerosRandom(chart.data.labels.length),
    };
    if (tipoChart==="line"){
        newDataset["fill"]=false;
        newDataset["borderColor"] = colorRandom();
    }else if (tipoChart==="bar"){
        let listBorder= [];
        let listBack = [];
        for (let i=0;i<chart.data.labels.length;i++){
            let color = colorRandom();
            listBorder.push(color);
            listBack.push(color.substr(0,color.length-1) + ', 0.2)');
        }
        newDataset["borderColor"] = listBorder;
        newDataset["backgroundColor"] = listBack;
        newDataset["borderWidth"] = 1;
    }else if (tipoChart === "radar"){
        let color = colorRandom();
        newDataset["borderColor"] = color;
        newDataset["backgroundColor"]= color.substring(0,color.length-1) + ",0.2)"
    }else if (tipoChart === "pie" || tipoChart==="doughnut" || tipoChart ==="polarArea"){
        let listBack = [];
        for (let i=0;i<varsX;i++){
            listBack.push(colorRandom());
        }
        newDataset["backgroundColor"] = listBack;
    }
    chart.data.datasets.push(newDataset);
    chart.update();
}
function randomData(){
    chart.data.datasets.forEach(dataset => {
        dataset.data = listaNumerosRandom(chart.data.labels.length);
    });
    chart.update();
}
function graficoLinea(){
    //Función para generar lo necesario para el gráfico de lineas

    //se generan los datos
    let data = {}
    //etiquetas en x
    data["labels"] = obtenerEtiquetas();//["a", "b", "c", ...]
    data["datasets"] = [{
        label: "Dataset 1",
        data: listaNumerosRandom(varsX),//[2,5,6,8,6,9,8]
        borderColor: colorRandom()//rgb(25,23,56)
    }];
    dibujarGrafico("line", data);
    tipoChart = "line";

}

function graficoBarra(){
    //Función para generar lo necesario para el gráfico de barras

    //se generan los datos
    let data = {}
    //etiquetas en x
    data["labels"] = obtenerEtiquetas();
    let listBorder= [];
    let listBack = [];
    for (let i=0;i<varsX;i++){
        let color = colorRandom();
        listBorder.push(color);
        listBack.push(color.substr(0,color.length-1) + ', 0.2)');//rgb(25,23,56,0.2)
    }
    data["datasets"] = [{
        label: "Dataset 1",
        data: listaNumerosRandom(varsY),
        borderColor: listBorder,
        backgroundColor: listBack,
        borderWidth: 1
    }]
    dibujarGrafico("bar", data);
    tipoChart = "bar";

}
function graficoRadar(){

    //se generan los datos
    let data = {}
    //etiquetas en x
    data["labels"] = obtenerEtiquetas();
    let color = colorRandom();

    data["datasets"] = [{
        label: "Dataset 1",
        data: listaNumerosRandom(varsY),
        borderColor: color,
        backgroundColor: color.substring(0,color.length-1) + ",0.2)"
    }]

    dibujarGrafico("radar", data);
    tipoChart = "radar";
}
function graficoTartaDoughnutPolar(tipo="pie"){
    //se generan los datos
    let data = {}
    //etiquetas en x
    data["labels"] = obtenerEtiquetas();
    let listBack = [];
    for (let i=0;i<varsX;i++){
        listBack.push(colorRandom());
    }

    data["datasets"] = [{
        label: "Dataset 1",
        data: listaNumerosRandom(varsY),
        backgroundColor: listBack
    }]

    dibujarGrafico(tipo, data);
    tipoChart = tipo;
}
function graficoOptions(){
    //Función para generar lo necesario para el gráfico de lineas

    //se generan los datos
    let data = {}
    //etiquetas en x
    data["labels"] = obtenerEtiquetas();
    data["datasets"] = [{
        label: "Dataset 1",
        data: listaNumerosRandom(varsX),
        fill: true,
        borderColor: colorRandom(),
        stepped:true
    }]
    let options = {}
    options["scales"]= {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Letras',
                    color: colorRandom(),
                    font: {
                        family: 'Comic Sans MS',
                        size: 20,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                    padding: {top: 20, left: 0, right: 0, bottom: 0}
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Números',
                    color: colorRandom(),
                    font: {
                        family: 'Times',
                        size: 20,
                        style: 'normal',
                        lineHeight: 1.2
                    },
                    padding: {top: 30, left: 0, right: 0, bottom: 0}
                }
            }
        };
    options["plugins"]={
        legend: {
            title: {
                display: true,
                text: 'Titulo del gráfico',
                position: "end"
            },
            align: "end"
        },
        tooltip:{
            callbacks:{
                beforeTitle: function(tooltipItem, data) {
                    return "Antes del título";
                },
                beforeLabel: function(tooltipItem, data) {
                    return "(Dataset: valor)";
                },
                footer: function(tooltipItem, data) {
                    return "footer del tooltip";
                }
            }
        }
    }
    options["interaction"] = {
        intersect: false,
        axis: "xy",
        mode: "index"
    }
    dibujarGrafico("line", data, options);
    tipoChart = "line";
}
function dibujarGrafico(type, data, options={}){
    let canvas = document.getElementById("canvas").getContext('2d');
    if (chart){
        chart.destroy();
    }
    chart = new Chart(canvas, {type:type, data:data, options:options});
}