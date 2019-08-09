"use strict";

const btn = document.querySelector(".page__search--button");
const listFilms = document.querySelector(".page__results");
const favFilmContainer = document.querySelector(".page__favorites__films");

let favFilms = [];
let searchedFilms = [];

// LOCAL STORAGE

function saveData() {
  localStorage.setItem("favfilms", JSON.stringify(favFilms));
}

function catchData() {
  const catchInfo = JSON.parse(localStorage.getItem("favfilms"));
  if (catchInfo !== null) {
    favFilms = catchInfo;
    paintFavs();
  }
}

function handleFav(event) {
  const currentFilm = event.currentTarget;
  const clickedIndex = parseInt(currentFilm.dataset.index);
  favFilms.push(searchedFilms[clickedIndex]);

  currentFilm.classList.toggle("film--is--favorite");

  paintFavs();

  const currentFavFilm = document.querySelector(".page__favorites__films--item");

  if (currentFilm.classList.contains("film--is--favorite") === false) {
    currentFavFilm.style = "display: none;";
  }

  saveData(favFilms);
}

function paintFavs() {
  let htmlFavCode = "";

  for (const favFilm of favFilms) {
    htmlFavCode += `<li class="page__favorites__films--item"><img src="${favFilm.show.image}" alt="${favFilm.show.name}" class="page__favorites__films--image"><h3 class="page__favorites__films--name">${favFilm.show.name}</h3></li>`;
  }

  favFilmContainer.innerHTML = htmlFavCode;
}

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

const getFilm = function() {
  let inputFilm = document.querySelector(".page__search--film");
  inputFilm = inputFilm.value;
  return `http://api.tvmaze.com/search/shows?q=${inputFilm}`;
};

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
