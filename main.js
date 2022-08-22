//variables
let listaProds = document.querySelector('.productos-lista');
let carritoProds = document.querySelector('.productos-carrito');
let totalCarrito = document.querySelector('.total-carrito')
let cantidadProduct = document.querySelector('.contador');


let carrito = [];
let totalCard = 0;
let countProduct = 0;

//functions

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        totalCard = JSON.parse(localStorage.getItem('total'))
        countProduct = JSON.parse(localStorage.getItem('contador'))
        countProduct = carrito.length
        cargarCarrito();
    }
    loadEventListenrs();
    function loadEventListenrs() {
        listaProds.addEventListener('click', agregarProducto);
        carritoProds.addEventListener('click', eliminarProducto);
    }
})




function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-agregar')) {
        const productoSeleccionado = e.target.parentElement;
        leerInfo(productoSeleccionado);
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }
}

function eliminarProducto(e) {
    if (e.target.classList.contains('btn-eliminar')) {
        const deleteId = e.target.getAttribute('data-id');
        carrito.forEach(value => {
            if (value.id == deleteId) {
                let precioBorrar = parseFloat(value.price) * parseFloat(value.cantidad);
                totalCard = totalCard - precioBorrar;
                totalCard = totalCard.toFixed(2);
            }
        });
        carrito = carrito.filter(product => product.id !== deleteId);
        localStorage.setItem('carrito', JSON.stringify(countProduct))
        countProduct = carrito.length;
        localStorage.setItem('total', JSON.stringify(totalCard))
    }
    if (carrito.length === 0) {
        totalCarrito.innerHTML = 0;
        cantidadProduct.innerHTML = 0;
    }
    cargarCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito))



}

function leerInfo(product) {
    const infoProducto = {
        //image: product.querySelector('div img').src,
        nombre: product.querySelector('.nombre').textContent,
        marca: product.querySelector('.marca').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProducto.price);
    totalCard = totalCard.toFixed(2);
    localStorage.setItem('total', JSON.stringify(totalCard))

    const exist = carrito.some(product => product.id === infoProducto.id);
    if (exist) {
        const pro = carrito.map(product => {
            if (product.id === infoProducto.id) {
                product.cantidad++;
                return product;
            } else {
                return product
            }
        });
        carrito = [...pro];
    } else {
        carrito = [...carrito, infoProducto]
        localStorage.setItem('carrito', JSON.stringify(countProduct))
        countProduct = carrito.length;

    }
    cargarCarrito();
}

function cargarCarrito() {
    vaciarCarrito();
    carrito.forEach(product => {
        const { nombre, marca, price, cantidad, id } = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <div class="item-content">
                <h5>${nombre} <span>${marca}</span></h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Cantidad: ${cantidad}</h6>
            </div>
            <span class="btn-eliminar" data-id="${id}">X</span>
        `;

        carritoProds.appendChild(row);
        totalCarrito.innerHTML = totalCard;

        cantidadProduct.innerHTML = countProduct;
    });
}



function vaciarCarrito() {
    carritoProds.innerHTML = '';
}

let instrumentos = []

instrumentos.push(new Instrumento(1, "Guitarra", "Fender", 250000, img='../images/guitarra_index2.jpg'))
instrumentos.push(new Instrumento(2, "Bajo", "Texas", 300000, img='../images/bajo_index1.jpg'))
instrumentos.push(new Instrumento(3, "Bateria", "Legend", 10000, img='../images/bateria_legend.jpg'))
instrumentos.push(new Instrumento(4, "Amplificador", "Marshall", 20000, img='../images/ampli_prod1.jpg'))
instrumentos.push(new Instrumento(5, "Flauta", "Yamaha", 250000, img='../images/flauta_prod1.jpg'))
instrumentos.push(new Instrumento(6, "Contrabajo", "Thomann", 50000, img='../images/contrabajo_prod1.jpg'))
instrumentos.push(new Instrumento(7, "Violin", "Stagg", 220000, img='../images/viola_prod1.jpg'))
instrumentos.push(new Instrumento(8, "Teclado", "Yamaha", 330000, img='../images/teclado_prod1.jpg'))
instrumentos.push(new Instrumento(9, "Controlador", "Pioneer", 110000, img='../images/midi_prod1.jpg'))
instrumentos.push(new Instrumento(10, "Saxo", "Selmer", 270000, img='../images/saxo_index1.jpg'))
instrumentos.push(new Instrumento(11, "Wah-Wah", "Boss", 280000, img='../images/pedalera_index.jpg'))
instrumentos.push(new Instrumento(12, "Bateria", "Grestch", 125000, img='../images/bateria_grestch.jpg'))
instrumentos.push(new Instrumento(13, "Bombo", "Criollo", 310000, img='../images/bombo_prod1.jpg'))
instrumentos.push(new Instrumento(14, "Guitarra", "Acústica", 270000, img='../images/guitarra_index3.jpg'))
instrumentos.push(new Instrumento(15, "Bajo", "Acústico", 550000, img='../images/foto_prod2.jpg'))
instrumentos.push(new Instrumento(16, "Violonchelo", "Aliyes", 400000, img='./images/violin_index1.jpg'))
instrumentos.push(new Instrumento(17, "Piano", "Yamaha", 320000, img='../images/foto_prod9.jpg'))
instrumentos.push(new Instrumento(18, "Armonica", "Hohner", 200000, img='../images/armonica_index2.jpg'))
instrumentos.push(new Instrumento(19, "Guitarra", "Les Paul", 420000, img='../images/guitarra_lespaul.jpg'))
instrumentos.push(new Instrumento(20, "Ukelele", "Benton", 800000, img='../images/ukelele.jpg'))

instrumentos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('carts')
    div.innerHTML = `
    <div>
    <img src=${producto.img} class="foto-prod"></img>   
    <p>$<span>${producto.precio}</span></p>
    </div>
        <p class="nombre">${producto.nombre}</p>
        <p class="marca">${producto.marca}</p>
        <a href="" class="btn-agregar" data-id="${producto.id}">agregar al carrito</a>`
    listaProds.appendChild(div)

})


document.getElementById("jsonBtn").addEventListener('click', cargarJson);
let info = document.getElementById("detalles")


function cargarJson() {
    fetch('../instrumentos.json')
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            let detalle = " "
            data.forEach(function (instrumento) {
                detalle += `
                <p> - ${instrumento.nombre}</p>
                <p> ${instrumento.descri}</p>
                <p> ${instrumento.pago}</p>`
            })
            info.innerHTML = detalle
            
        })
}






