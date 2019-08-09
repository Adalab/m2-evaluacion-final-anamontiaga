"use strict";

// console.log('>> Ready :)');

const btn = document.querySelector(".page__search--button");
const listFilms = document.querySelector(".page__results");

// array para guardar los favoritos
const favFilms = [];

function handleFav(event) {
  const currentFilm = event.currentTarget;
  // le añado una clase para que se convierta en favoritos al hacer click
  currentFilm.classList.toggle("film--is--favorite");

  console.log(currentFilm);
}

function activateFavs() {
  const films = document.querySelectorAll(".page__results--list");
  const filmsTitles = document.querySelectorAll(".page__results--name");
  // para aplicarle las propiedades cuando clicko, primero las busco
  for (const film of films) {
    film.addEventListener("click", handleFav);
  }
  for (const title of filmsTitles) {
    title.parentElement.addEventListener("click", handleFav);
  }
}

// buscamos la película llamando a la API
const getFilm = function() {
  let inputFilm = document.querySelector(".page__search--film");
  inputFilm = inputFilm.value;
  return `http://api.tvmaze.com/search/shows?q=${inputFilm}`;
};

// buscamos la información que queremos de la película llamando a la API y diciéndole la info que queremos. El fetch es el return de la función getFilm
const getFilmInfo = function(ev) {
  ev.preventDefault();
  fetch(getFilm())
    .then(response => response.json())
    .then(data => {
      listFilms.innerHTML = ""; // te lo pinta en blanco y no me repite las búsquedas y refresca

      for (let i = 0; i < data.length; i++) {
        let imgSrc;
        // // declaramos variable vacía con el src
        // // condicional para definir qué src tendrá la imagen en función de si hay imagen en el servidor o no -en ese caso la colocaremos por defecto-
        if (data[i].show.image === null) {
          imgSrc = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        } else {
          imgSrc = data[i].show.image.medium;
        }

        listFilms.innerHTML += `<li class="page__results--list"><img src="${imgSrc}" alt="${data[i].show.name}" class="page__results--image"><br/><h3 class="page__results--name">${data[i].show.name}</h3></li>`;
      }

      activateFavs();
    });
};

btn.addEventListener("click", getFilmInfo);

// cuando click en el resultado me añade una clase en la que el título es del color del fondo y viceversa

// const resultFilmName = document.querySelectorAll(".page__results--name");

// function handleFav(event) {
//   const currentFilm = event.currentTarget;
//   console.log(currentFilm);
// }

// function activateFavs() {
//   const resultFilm = document.querySelectorAll(".page__results--list");
//   for (const item of resultFilm) {
//     item.addEventListener("click", handleFav);
//   }
// }

// activateFavs();

// function selectFilm() {
//   for (const item of resultFilm) {
//     resultFilm.style = "background-color: #a00957;";
// for (const item of resultFilmName) {
//   resultFilmName.style = "color: pink;";
// }
//   }
// }

// resultFilm.addEventListener("click", selectFilm);

//# sourceMappingURL=main.js.map
