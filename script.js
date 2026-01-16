// Aquí guardamos los datos que usaremos en los gráficos en formato JSON
const dataSets = {
    dataset1: {
        etiquetas: ['Imágenes de Naturaleza', 'Imágenes de Ciudad', 'Imágenes de Animales', 'Imágenes de Personas'],
        valores: [40, 30, 20, 10]
    },
    dataset2: {
        etiquetas: ['Con colores cálidos', 'Con colores fríos', 'Negro predominando', 'Blanco predominando'],
        valores: [25, 35, 15, 25]
    }
};

// Imágenes importadas desde Picsum
function generarImagenes(cantidad) {
    // Obtenemos el elemento HTML donde mostraremos las imágenes
    const contenedor = document.getElementById('imageList');
    
    // Limpiamos lo que había antes (borramos todas las imágenes)
    contenedor.innerHTML = '';

    // Creamos un timestamp para que las imágenes sean diferentes cada vez
    const timeStamp = Date.now();

    // Un bucle for sencillo que crea imágenes hasta llegar a la cantidad seleccionada
    for (let indice = 1; indice <= cantidad; indice++) {
        const columna = document.createElement('div');
        columna.className = 'col-sm-6 col-md-4 col-lg-3';
        // Dentro de la columna metemos el HTML de la tarjeta
        columna.innerHTML = `
            <div class="card image-card h-100">
                <img
                    src="https://picsum.photos/300/200?random=${indice}&t=${timeStamp}"
                    class="card-img-top rounded-circle p-2"
                    loading="lazy"
                    alt="Imagen ${indice}"
                >
                <div class="card-body text-center">
                    <h6 class="card-title">Imagen ID ${indice}</h6>
                    <p class="card-text">Descripción de la imagen ${indice}</p>
                </div>
            </div>
        `;
        contenedor.appendChild(columna);
    }
}

// Variables globales para los gráficos
let graficoBarras, graficoDonut;

// Esta función crea dos gráficos usando ApexCharts

function renderizarGraficos(claveDatos) {
    // Obtenemos los datos según el dataset seleccionado
    const datos = dataSets[claveDatos];

    // Si ya existen gráficos anteriores, los borramos para evitar errores
    if (graficoBarras) graficoBarras.destroy();
    if (graficoDonut) graficoDonut.destroy();

    graficoBarras = new ApexCharts(
        document.querySelector("#barChart"),
        {
            chart: { 
                type: 'bar',
                height: 300
            },
            series: [{
                name: 'Valores',
                data: datos.valores // Los datos numéricos
            }],
            xaxis: {
                categories: datos.etiquetas // Las etiquetas del eje X
            }
        }
    );

    graficoDonut = new ApexCharts(
        document.querySelector("#donutChart"), // El elemento donde se dibujará
        {
            chart: { 
                type: 'donut',
                height: 300
            },
            series: datos.valores, // Los valores numéricos
            labels: datos.etiquetas
        }
    );

    // Renderizamos ambos gráficos en la página
    graficoBarras.render();
    graficoDonut.render();
}

// Event Listeners
document.getElementById('rowSelector').addEventListener('change', evento => {
    const cantidadSeleccionada = parseInt(evento.target.value);
    generarImagenes(cantidadSeleccionada);
});

document.getElementById('dataSelector').addEventListener('change', evento => {
    const datasetSeleccionado = evento.target.value;
    renderizarGraficos(datasetSeleccionado);
});
// Mostramos 10 imágenes y los gráficos del dataset1 por defecto
generarImagenes(10);
renderizarGraficos('dataset1');
