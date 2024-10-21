// Variables
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para renderizar el carrito
function renderizarCarrito() {
  const carritoBody = document.getElementById("carrito-body");
  carritoBody.innerHTML = "";
  let totalGeneral = 0;

  carrito.forEach(producto => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${producto.img}" class="w-22 h-20 object-cover"></td>
      <td class="px-4">${producto.nombre}</td>
      <td class="px-4">$${producto.precio}</td>
      <td class="px-4">${producto.cantidad}</td>
      <td class="px-4">$${producto.precio * producto.cantidad}</td>
      <td class="text-center"><button class="eliminar-producto text-red-600 px-4 py-2" data-id="${producto.id}">X</button></td>
    `;
    carritoBody.appendChild(fila);
    totalGeneral += producto.precio * producto.cantidad;
  });

  document.getElementById("total-general").textContent = `Total: $${totalGeneral}`;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para agregar productos al carrito
function agregarAlCarrito(e) {
  if (e.target.classList.contains("agregar-carrito")) {
    const productoId = e.target.dataset.id;
    const productoNombre = e.target.dataset.nombre;
    const productoPrecio = parseFloat(e.target.dataset.precio);
    const productoImg = e.target.dataset.img;

    const productoExistente = carrito.find(producto => producto.id === productoId);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      const nuevoProducto = {
        id: productoId,
        nombre: productoNombre,
        precio: productoPrecio,
        cantidad: 1,
        img: productoImg
      };
      carrito.push(nuevoProducto);
    }
    renderizarCarrito();
  }
}

// Función para eliminar un producto
function eliminarProducto(e) {
  if (e.target.classList.contains("eliminar-producto")) {
    const productoId = e.target.dataset.id;
    carrito = carrito.filter(producto => producto.id !== productoId);
    renderizarCarrito();
  }
}

// Función para vaciar el carrito
function vaciarCarrito() {
  carrito = [];
  renderizarCarrito();
}

// Event Listeners
document.addEventListener("click", agregarAlCarrito);
document.addEventListener("click", eliminarProducto);
document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);

// Abre el modal del carrito
document.getElementById("btn-carrito").addEventListener("click", function() {
  document.getElementById("modal-carrito").classList.remove("hidden");
  renderizarCarrito(); // Renderiza el carrito al abrir el modal
});

// Cierra el modal del carrito
document.getElementById("cerrar-modal").addEventListener("click", function() {
  document.getElementById("modal-carrito").classList.add("hidden");
});

// Inicializar carrito al cargar la página
renderizarCarrito();