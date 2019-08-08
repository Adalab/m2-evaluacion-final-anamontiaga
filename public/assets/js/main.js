"use strict";

// console.log('>> Ready :)');

const btn = document.querySelector(".page__search--button");
const listFilms = document.querySelector(".page__results");

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
    });
};

btn.addEventListener("click", getFilmInfo);

// cuando click en el resultado me añade una clase en la que el título es del color del fondo y viceversa

//# sourceMappingURL=main.js.map
