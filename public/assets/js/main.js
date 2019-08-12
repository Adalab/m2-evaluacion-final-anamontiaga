"use strict";

// 1º Declaración de variables con elementos del DOM
const btn = document.querySelector(".page__search--button");
const listFilms = document.querySelector(".page__results");
const favFilmContainer = document.querySelector(".page__favorites__films");

// Declaro dos arrays, una para los films que busco en el input y otra para los que seleciono y meto en favoritos
let favFilms = [];
let searchedFilms = [];

// LOCAL STORAGE. Cojo todo lo que haya en el array de favoritos, lo paso a cadena y lo guardo en LS con el nombre de favfilms.
// Esta función se ejecuta cuando clickamos en los favoritos (saveData(favfilms) en handleFav(event))

function saveData() {
  localStorage.setItem("favfilms", JSON.stringify(favFilms));
}

// Si en el LS hay algo, me lo metes en el array de favoritos, osea, me los dejas ahí
function catchData() {
  const catchInfo = JSON.parse(localStorage.getItem("favfilms"));
  if (catchInfo !== null) {
    favFilms = catchInfo;
    paintFavs(); // y me los vuelves a pintar
  }
}

// 5º Añadimos clase en el filme que pinchamos para cambiar color y generamos un índice para meter los filmes en el array de favFilms.
// Además los pintamos e la lista de favoritos (paintFavs()).
// Además salvamos los datos.
function handleFav(event) {
  const currentFilm = event.currentTarget;
  const clickedIndex = parseInt(currentFilm.dataset.index);
  favFilms.push(searchedFilms[clickedIndex]);

  currentFilm.classList.toggle("film--is--favorite");

  paintFavs();

  saveData(favFilms);
}

// 6º Pintamos los favoritos, leyendo el array de favoritos
function paintFavs() {
  let htmlFavCode = "";

  for (let index = 0; index < favFilms.length; index++) {
    htmlFavCode += `<li class="page__favorites__films--item" data-index="${index}"><button class="page__favorites__films--btn" data-index="${index}">x</button><img src="${favFilms[index].show.image}" alt="${favFilms[index].show.name}" class="page__favorites__films--image"><h3 class="page__favorites__films--name">${favFilms[index].show.name}</h3></li>`;
  }

  favFilmContainer.innerHTML = htmlFavCode;
  removeAllFavs();
}

// intento de borrar favoritos
function removeFav(ev) {
  let currentFavFilm = parseInt(ev.currentTarget.dataset.index);
  favFilms.splice(currentFavFilm, 1);
  paintFavs();
  saveData();
}

// 4ª cambiamos el color a los filmes clickados( al <li> y al <h3>)
function activateFavs() {
  const films = document.querySelectorAll(".page__results--list");
  const filmsTitles = document.querySelectorAll(".page__results--name");

  for (const film of films) {
    film.addEventListener("click", handleFav);
  }
  for (const title of filmsTitles) {
    title.parentElement.addEventListener("click", handleFav);
  }
}
// 2º Para realizar la petición de búsqueda de datos, obtenemos la URL, personalizada con el valor del input
const getFilm = function() {
  let inputFilm = document.querySelector(".page__search--film");
  inputFilm = inputFilm.value;
  return `http://api.tvmaze.com/search/shows?q=${inputFilm}`;
};

// 3º Hacemos la petición de datos, ejecutando la función anterior, con el método .then
// Definimos un elemento vacío en el DOM.
// Si la imagen está vacía, muéstranos la imagen por defecto, si no, muéstranos la medium.
// Y además píntame esos datos en el elemento del DOM.
// Los datos que me devuelve la Promesa los guardamos en un array, searchedFilms
// Y además, activamos la función activeFavs, para que nos los cambie de color al clickarlos (definida más arriba)

const getFilmInfo = function(ev) {
  ev.preventDefault();
  fetch(getFilm())
    .then(response => response.json())
    .then(data => {
      listFilms.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        if (data[i].show.image === null) {
          data[i].show.image = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        } else {
          data[i].show.image = data[i].show.image.medium;
        }

        listFilms.innerHTML += `<li class="page__results--list" data-index="${i}"><img src="${data[i].show.image}" alt="${data[i].show.name}" class="page__results--image"><h3 class="page__results--name">${data[i].show.name}</h3></li>`;
      }
      searchedFilms = data;
      activateFavs();
    });
};

catchData();

btn.addEventListener("click", getFilmInfo);

function removeAllFavs() {
  const removeBtns = document.querySelectorAll(".page__favorites__films--btn");
  for (const removeBtn of removeBtns) {
    removeBtn.addEventListener("click", removeFav);
  }
}

//# sourceMappingURL=main.js.map
