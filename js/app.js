// Variables
const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar Al Carrito"
    document.querySelectorAll('.bg-blue-500').forEach(btn => {
        btn.addEventListener('click', agregarCarrito);
    });

    // Cuando se elimina un juego del carrito
    carrito.addEventListener('click', eliminarJuego);

    // Al Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

// Funciones
// Función que añade el juego al carrito
function agregarCarrito(e) {
    e.preventDefault();
    
    const juego = e.target.parentElement.parentElement;
    leerDatosJuego(juego);
}

// Lee los datos del juego
function leerDatosJuego(juego) {
    const infoJuego = {
        imagen: juego.querySelector('img').src,
        titulo: juego.querySelector('h4').textContent,
        precio: juego.querySelector('.text-gray-600').textContent,
        id: juego.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    if (articulosCarrito.some(j => j.id === infoJuego.id)) {
        const juegos = articulosCarrito.map(j => {
            if (j.id === infoJuego.id) {
                j.cantidad++;
                return j;
            } else {
                return j;
            }
        });
        articulosCarrito = [...juegos];
    } else {
        articulosCarrito = [...articulosCarrito, infoJuego];
    }

    carritoHTML();
}

// Elimina el juego del carrito en el DOM
function eliminarJuego(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-juego')) {
        const juegoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(j => j.id !== juegoId);
        carritoHTML();
    }
}

// Muestra el carrito en el DOM
function carritoHTML() {
    vaciarCarrito();

    articulosCarrito.forEach(juego => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${juego.imagen}" width=100>
            </td>
            <td>${juego.titulo}</td>
            <td>${juego.precio}</td>
            <td>${juego.cantidad}</td>
            <td>
                <a href="#" class="borrar-juego text-red-500" data-id="${juego.id}">X</a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });
}

// Elimina los juegos del carrito en el DOM
function vaciarCarrito() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
