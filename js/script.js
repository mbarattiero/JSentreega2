const productos = document.getElementById("productos")
const carrito = document.getElementById("carrito")
const Carrito = JSON.parse(localStorage.getItem("carrito")) || []


//genero mi array de objetos
const Productos = [
    {
        imagen: "https://www.tematika.com/media/catalog/Ilhsa/Imagenes/671280.jpg",
        titulo: "Mujeres que corren con los lobos",
        precio: 30000

    },
    {
        imagen: "https://www.tematika.com/media/catalog/Ilhsa/Imagenes/558747.jpg",
        titulo: "El arte de la guerra",
        precio: 15000

    },
    {
        imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/4e/1b/4e1b62e5c74ebc66eec511720d0f513d.jpg",
        titulo: "Zen en el arte del tiro con arco",
        precio: 12000,

    },
   
];


const restadoraAlCarrito = (titulo) => {
    const producto = Carrito.find(el => {
        return el.titulo === titulo
    })
//si esto es true
    if(producto.cantidad <= 1){
        let arrayDetitulos = Carrito.map(el => {
            return el.titulo
        })

        let index = arrayDetitulos.indexOf(titulo)

        Carrito.splice(index, 1)
        //si no
    }else{
        producto.cantidad -= 1
    }
    actualizadoraDeCarrito()
}

const sumadoraAlCarrito = (titulo) => {
    const producto = Carrito.find(el => {
            return el.titulo === titulo
    })
    producto.cantidad += 1
    actualizadoraDeCarrito()
}

const creadoraDeCardsDeCarrito = (titulo, precio, cantidad) => {
    const contenedor = document.createElement("div")
    const tituloDOM = document.createElement("h3")
    const precioDOM = document.createElement("p")
    const contenedorCantidad = document.createElement("div")
    const cantidadDOM = document.createElement("p")
    const botonPlusDOM = document.createElement("button")
    const botonMinumDOM = document.createElement("button")

    contenedor.classList.add("contenedor")
    tituloDOM.classList.add("titulo")
    precioDOM.classList.add("precio")
    cantidadDOM.classList.add("cantidad")

    tituloDOM.innerText = titulo
    precioDOM.innerText = precio
    cantidadDOM.innerText = cantidad

    botonPlusDOM.innerText = "+"
    botonMinumDOM.innerText = "-"

    botonPlusDOM.addEventListener("click", ()=>{
        sumadoraAlCarrito(titulo)
    })

    botonMinumDOM.addEventListener("click", ()=>{
        restadoraAlCarrito(titulo)
    })

    contenedorCantidad.appendChild(botonMinumDOM)
    contenedorCantidad.appendChild(cantidadDOM)
    contenedorCantidad.appendChild(botonPlusDOM)

    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(contenedorCantidad)

    return contenedor
}


const actualizadoraDeCarrito = () => {
    carrito.innerHTML = ""

    const totalDOM = document.createElement("h3")

    const total = Carrito.reduce((acc, el)=>{
        return acc + el.cantidad * el.precio
    },0)

    totalDOM.innerText = total

    Carrito.forEach(el =>{
        carrito.appendChild(creadoraDeCardsDeCarrito(el.titulo, el.precio, el.cantidad))
        carrito.appendChild(totalDOM)
    })
    localStorage.setItem("carrito", JSON.stringify(Carrito))
}


const agregadoraAlCarrito = (titulo, precio) => {
    const booleano = Carrito.some(el => {
        return el.titulo === titulo
    })

    if(booleano){
        const producto = Carrito.find(el => {
            return el.titulo === titulo
        })
        producto.cantidad += 1
    }else{
        Carrito.push({
            titulo,
            precio,
            cantidad: 1
        })
    }
    actualizadoraDeCarrito()
}

const creadoraDeCards = (titulo, imagen, precio) => {
    const contenedor = document.createElement("div")
    const tituloDOM = document.createElement("h3")
    const imagenDOM = document.createElement("img")
    const precioDOM = document.createElement("p")
    const botonDOM = document.createElement("button")

    contenedor.classList.add("contenedor")
    tituloDOM.classList.add("titulo")
    imagenDOM.classList.add("imagen")
    precioDOM.classList.add("precio")
    botonDOM.classList.add("boton")

    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    botonDOM.innerText = "Quiero Comprar"

    imagenDOM.src = imagen

    botonDOM.addEventListener("click", ()=>{
        agregadoraAlCarrito(titulo, precio)
    })


    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(imagenDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(botonDOM)

    return contenedor
}


Productos.forEach(el => {
    const productoDOM = creadoraDeCards(el.titulo, el.imagen, el.precio)

    productos.appendChild(productoDOM)
})



