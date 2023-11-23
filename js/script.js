const jokeBtn = document.getElementById('fetchJoke');
const eliminarTodos = document.getElementById('eliminarTodos')
const btnEliminar = document.querySelectorAll("btnEliminar");
let jokeContainer = document.getElementById('jokeList');
let arrayChistes = []

const url = 'https://api.chucknorris.io/jokes/random';
cargarChiste();
jokeBtn.addEventListener("click",function(){
    ObtenerChiste();
})


function ObtenerChiste() {
    fetch(url).then(res => {
        if (!res.ok) {
            throw new Error("Error al recoger un chiste");
        } else {
            return res.json();
        }
    }).then(datos =>{
        const chiste = datos.value;+1
        arrayChistes.push (chiste);
        renderChiste (arrayChistes);
    })
};

function renderChiste (arr) {
    const ultimochiste=arr[arr.length - 1];
    if (arr.length > 0) {
    let html = `
    <li>
        <p class='frase'>${ultimochiste}</p>
        <button  id='eliminar' class='btnEliminar'>Eliminar</button>
    </li>
    `
        jokeContainer.innerHTML += html
        guardarChiste()
        
    }

}

function guardarChiste() {
    const cosas = JSON.stringify(arrayChistes);
    localStorage.setItem('chistesChuckNorris', cosas);
    console.log(localStorage)
}

function cargarChiste() {
    const chistes = JSON.parse(localStorage.getItem('chistesChuckNorris')) || {};
    const arrayLocal = Object.values(chistes);
    arrayChistes=arrayLocal;
    renderCargachiste(arrayChistes)
}

function renderCargachiste (arr) {
    if (arr.length > 0) {
        arr.forEach(element => {
            
            let html = `
            <li>
                <p class='frase'>${element}</p>
                <button  id='eliminar' class='btnEliminar'>Eliminar</button>
            </li>
            `
                jokeContainer.innerHTML += html
        });
    }
};

eliminarTodos.addEventListener("click",function(){
    arrayChistes=[];
    jokeContainer.innerHTML="";
    localStorage.clear();
})
console.log(btnEliminar);


// Manejador de click en el botón "Obtener Chiste"
// Una función para obtener un chiste de Chuck Norris desde la API
// Una función para renderizar la lista de chistes en el DOM
// Una función para guardar la lista de chistes en localStorage
// Una función para cargar la lista de chistes desde localStorage
// revisar si fuera necesario JSON.stringify y JSON.parse para los datos del localStorage

// Como BONUS crear un botón para eliminar todos los elementos a la vez y/o un botón para eliminar uno a uno el elemento seleccionado
// Manejador de click en los botones de eliminación (se eliminará desde el local storage como del DOM)