//Lista de Peliculas
const movies = [
    {
        id: 1,
        name: 'The Dark Knight',
        rating: 9,
        price: 7,
        img: 'https://http2.mlstatic.com/D_NQ_NP_875706-MLA75064396954_032024-O.webp'
    },
    {
        id: 2,
        name: 'Pulp Fiction',
        rating: 8,
        price: 7.5,
        img: 'https://images-cdn.ubuy.ae/643619ada502b8147a65942f-pulp-fiction-framed-movie-poster.jpg'
    },
    {
        id: 3,
        name: 'The Matrix',
        rating: 8,
        price: 6,
        img: 'https://m.media-amazon.com/images/I/71PfZFFz9yL._AC_SL1000_.jpg'
    },
    {
        id: 4,
        name: 'Fight Club',
        rating: 8,
        price: 10,
        img: 'https://m.media-amazon.com/images/I/612Jvvyl3iL._AC_SL1500_.jpg'
    },
    {
        id: 5,
        name: 'Gladiator',
        rating: 8,
        price: 4,
        img: 'https://atthemovies.uk/cdn/shop/products/Gladiator2000us27x40in195u.jpg?v=1621385091'
    }
]

//Genera lista en DOM
let moviesDiv = document.getElementById("movies");

movies.forEach(movie => {
    let container = document.createElement("div");
    container.className = "movie col-2 card";
    container.innerHTML =
        `
            <div class="card-header">
                <h3 class="text-primary-emphasis">${movie.name}</h3>
            </div>
            <div class="card-body">
            <img class="movie-img rounded" src=${movie.img} alt=${movie.id}/>
            <button class="add btn btn-primary" id=${movie.id}>+</button>
            <button class="sub btn btn-primary" id=${movie.id} disabled>-</button>
            <ul class="list-group list-group-flush>
                <li class="list-group-item"><h4>Info</h4></li>
                <li class="list-group-item"><b>Price:</b> $${movie.price}</li>
                <li class="list-group-item"><b>Rating:</b> ${movie.rating}</li>
            </ul>
            </div>
        `

    moviesDiv.appendChild(container)
});

//Carrito
let cart = document.getElementById("cart-content");
let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];

//Updatea el estado del carro
function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cartStorage));
}

//Updatea el display del carro
function updateCartDisplay() {
    cart.innerHTML = '';

    cartStorage.forEach(item => {
        let container = document.createElement("div");
        container.className = "cart-item d-flex justify-content-evenly align-items-center border border-3 border-secondary mb-2 p-1";
        container.innerHTML =
            `
                <div class="fw-bold"><img class="rounded" style="width: 50px; height: 50px; object-fit: cover;" src=${item.movie.img} alt=${item.movie.id}/></div>
                <div class="fw-bold">${item.movie.name}</div>
                <div class="fw-bold">$${item.movie.price}</div>
                <div class="fw-bold">Asientos: ${item.amount}</div>
                <div class="fw-bold">Total: $${item.movie.price * item.amount}</div>
    `

        cart.appendChild(container)
    })

    updateCart();
}

//Primera carga del estado del carrito
updateCartDisplay();

//Agregar y quitar elementos del carrito
let addButtons = document.querySelectorAll(".add");
let subButtons = document.querySelectorAll(".sub");

//Filtra el objeto a agregar
function addFilterMovie(id) {
    updateButton(id, false);

    const selectedMovie = movies.find(movie => movie.id == id);
    const existingEntry = cartStorage.find(entry => entry.movie.id === selectedMovie.id);

    if (existingEntry) {
        existingEntry.amount++;
    } else {
        cartStorage.push({ amount: 1, movie: selectedMovie });
    }

    updateCartDisplay();
}

//Filtra el objeto a remover
function removeFilterMovie(id) {
    const selectedMovie = movies.find(movie => movie.id == id);
    const existingEntry = cartStorage.find(entry => entry.movie.id === selectedMovie.id);

    existingEntry.amount--;
    if (existingEntry.amount == 0) {
        updateButton(id, true);
        cartStorage.splice(cartStorage.indexOf(existingEntry), 1);
    }

    updateCartDisplay();
}

//Manejar el estado del boton
function updateButton(id, state) {
    subButtons.forEach(button => {
        if (id == button.id) {
            button.disabled = state;
        }
    });
}

function updateAllButtons(state) {
    subButtons.forEach(button => {
        button.disabled = state;
    });
}

//Agrega elementos
addButtons.forEach(button => {
    button.onclick = () => addFilterMovie(button.id);
});

//Resta elementos
subButtons.forEach(button => {
    button.onclick = () => removeFilterMovie(button.id);
});

//Limpia la info
let clearButton = document.getElementById("clear");

clearButton.onclick = () => {
    localStorage.clear();
    cartStorage = [];
    updateAllButtons(true);
    updateCartDisplay();
};