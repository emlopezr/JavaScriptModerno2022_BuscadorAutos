// VARIABLES

// Inputs
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor de los resultados
const resultado = document.querySelector('#resultado');

// Objeto de la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

// INICIO DE LA APP

document.addEventListener('DOMContentLoaded', () => {
    // Mostrar todos los autos al cargar
    mostrarAutos(autos);

    // Llenar las opciones de año (Los ultimos 10)
    llenarSelectYear();
});

// LISTENERS DE LA BÚSQUEDA

marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAutos();
});

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value)
    filtrarAutos();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = parseInt(e.target.value)
    filtrarAutos();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = parseInt(e.target.value)
    filtrarAutos();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value)
    filtrarAutos();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value
    filtrarAutos();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value
    filtrarAutos();
});

// FUNCIONES

function mostrarAutos(autos) {
    // Limpiar los resultados previos
    limpiarHTML();

    // Mensaje de "No se encontraron resultados"
    if (autos.length === 0) {
        const noResultado = document.createElement('DIV');
        noResultado.classList.add('alerta', 'error');
        noResultado.textContent = 'No se encontraron reultados, intenta con otra búsqueda'
        resultado.appendChild(noResultado)

        return;
    }

    // Mostrar los autos en pantalla
    autos.forEach(auto => {
        // Destructuring al auto
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;

        // Crear e insertar cada auto en el HTML
        const autoHTML = document.createElement('P');
        autoHTML.textContent = `${marca} ${modelo} - Modelo: ${year} - Color: ${color} - ${puertas} Puertas - Transmisión ${transmision} - Precio: $${precio}`;
        resultado.appendChild(autoHTML);
    })
};

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelectYear() {
    const maxDate = new Date().getFullYear();
    const minDate = maxDate - 10;

    for (let i = maxDate; i >= minDate; i--) {
        const opcion = document.createElement('OPTION');
        opcion.textContent = i;
        opcion.value = i;
        year.appendChild(opcion)
    }
}

function filtrarAutos() {
    // Hacer el filtrado correspondiente
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    // Mostrar autos que cumplen el filtro
    mostrarAutos(resultado)
}

function filtrarMarca(auto) {
    if (datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    }

    // Si no se selecciona nada
    return auto;
}

function filtrarYear(auto) {
    if (datosBusqueda.year) {
        return auto.year === datosBusqueda.year;
    }

    // Si no se selecciona nada
    return auto;
}

function filtrarMinimo(auto) {
    if (datosBusqueda.minimo) {
        return auto.precio >= datosBusqueda.minimo;
    }

    // Si no se selecciona nada
    return auto;
}

function filtrarMaximo(auto) {
    if (datosBusqueda.maximo) {
        return auto.precio <= datosBusqueda.maximo;
    }

    // Si no se selecciona nada
    return auto;
}

function filtrarPuertas(auto) {
    if (datosBusqueda.puertas) {
        return auto.puertas === datosBusqueda.puertas;
    }

    // Si no se selecciona nada
    return auto;
}

function filtrarTransmision(auto) {
    if (datosBusqueda.transmision) {
        return auto.transmision === datosBusqueda.transmision;
    }

    // Si no se selecciona nada
    return auto;
}

function filtrarColor(auto) {
    if (datosBusqueda.color) {
        return auto.color === datosBusqueda.color;
    }

    // Si no se selecciona nada
    return auto;
}