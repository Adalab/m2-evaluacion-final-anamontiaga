"use strict";

// console.log('>> Ready :)');

const btn = document.querySelector(".page__search--button");
const listFilms = document.querySelector(".page__results");

// array para guardar los favoritos
const favFilms = [];

// función que hace todas las cosas que quiero al hacer click en favoritos
function handleFav(event) {
  const currentFilm = event.currentTarget;

  // cojo los datos que quiero guardar en favoritos con un atributo
  const currentFilmName = currentFilm.getAttribute("data-name");
  const currentFilmImage = currentFilm.getAttribute("data-image");

  // le añado una clase para que se convierta en favoritos al hacer click
  currentFilm.classList.toggle("film--is--favorite");

  if (currentFilm.classList.contains("film--is--favorite") === true) {
    // añademela al array si se queda con la clase
    // pero añademela sólo si el array aún no lo tiene (===false), para que no se añada cada vez que hago click
    if (favFilms.includes(currentFilmName) === false) {
      favFilms.push(currentFilmName);
    }
  } else {
    // quítamela del array si no se queda con la clase
    const index = favFilms.indexOf(currentFilmName);
    // si el índice existe (es mayor que -1)
    if (index > -1) {
      favFilms.splice(index, 1); // situate en el elemento y recortame ese mismo
    }
  }

  console.log(favFilms);
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

        listFilms.innerHTML += `<li class="page__results--list" data-name="${data[i].show.name}" data-image="${imgSrc}"><img src="${imgSrc}" alt="${data[i].show.name}" class="page__results--image"><br/><h3 class="page__results--name">${data[i].show.name}</h3></li>`;
      }

      activateFavs();
    });
};

btn.addEventListener("click", getFilmInfo);

//# sourceMappingURL=main.js.map
