import * as mQ from './utils/mediaQueriesUtils.js'
import * as button from './utils/button.js'
import * as popup from './utils/popup.js'
import * as api from './api.js'
import { tousLesFilms } from './utils/data.js'

export function afficherMeilleurFilm(film) {
    let article = document.getElementById("best-movie")
    article.querySelector("h2").textContent = film.title
    let imageContainer = article.querySelector(".image-container")
    imageContainer.querySelector("img").src = film.image_url

    let resume = article.querySelector(".resume")
    resume.querySelector("p").textContent = `Résumé : ${film.long_description}` 

    let infosPrincipales = article.querySelector(".infos-principales")
    infosPrincipales.querySelector(".liste-acteurs").textContent = `acteurs : ${film.actors.join(",")}` 
    infosPrincipales.querySelector(".date-sortie").textContent = film.year
    infosPrincipales.querySelector(".classification").textContent = `genres : ${film.genres.join(", ")}` 
    infosPrincipales.querySelector(".score-IMDB").textContent = `score : ${film.imdb_score}` 
    infosPrincipales.querySelector(".realisateur").textContent = `réalisateurs : ${film.directors}` 
    infosPrincipales.querySelector(".duree").textContent = `durée ${film.duration}` 
    infosPrincipales.querySelector(".pays-origin").textContent = `pays d'origine ${film.countries}` 
    infosPrincipales.querySelector(".box-office").textContent = `recettes : ${film.worldwide_gross_income}`
}

export function afficherMeilleursFilms(films, sectionId) {
    let i = 0
    let article = document.getElementById(sectionId)
    let movieContainers = article.querySelectorAll(".movie-container")

    for (i; i < films.length && i < movieContainers.length; i++) {
        movieContainers[i].querySelector("img").src = films[i].image_url
        movieContainers[i].querySelector(".hover-text").textContent = films[i].title
    }
}

export function afficherCategoryFilms(category, sectionId) {
    let i = 0
    let article = document.getElementById(sectionId)
    let movieContainers = article.querySelectorAll(".movie-container")

    for (i; i < 6; i++) {
        movieContainers[i].querySelector("img").src = category[i].image_url
        movieContainers[i].querySelector(".hover-text").textContent = category[i].title
    }
}

export function afficherFilmsSF(filmsSF) {
    let article = document.getElementById("sf-movies")
    let movieContainers = article.querySelectorAll(".movie-container")

    for(let i=0; i<6; i++){
        movieContainers[i].querySelector("img").src = filmsSF[i].image_url
        movieContainers[i].querySelector(".hover-text").textContent = filmsSF[i].title
    }
    
}

export function afficherFilmsSelection(filmsSelection) {
    let article = document.getElementById("movie-selection")
    let movieContainers = article.querySelectorAll(".movie-container")

    for (let i=0; i < 6; i++) {
        
        movieContainers[i].querySelector("img").src = filmsSelection[i].image_url
        movieContainers[i].querySelector(".hover-text").textContent = filmsSelection[i].title

    }
}

export function recupSelection() {
    let selecteur = document.querySelector(".selecteur1")
    let selection = selecteur.querySelector("select")
    let choix = selection.value

    console.log(choix)

    return choix

}

export function eventListenerFilms(sectionId) {
    let article = document.getElementById(sectionId)
    let boutonVoirPlus = article.querySelector(".voir-plus")
    let boutonVoirMoins = article.querySelector(".voir-moins")
    let boutonsDetails = article.querySelectorAll(".details")

    mQ.masquerFilms(sectionId)

    boutonsDetails.forEach(bouton => {
        bouton.addEventListener("click", async (event) => {

            const movieContainer = event.target.closest(".movie-container");
            if (!movieContainer) return; 

            const titre = movieContainer.querySelector(".hover-text").textContent;

            const filmLocal = tousLesFilms.find(f => f.title === titre);

            if (filmLocal) {
                afficherPopUp(filmLocal);
            } else {
                if (titre) await api.fetchFilmPopUp(titre);
            }
        });
    });

    boutonVoirPlus.addEventListener("click", () => {
        button.afficherBoutonVoirMoins(sectionId)
        button.masquerBoutonVoirPlus(sectionId)
        button.voirPlus(sectionId)

    })

    boutonVoirMoins.addEventListener("click", () => {
        button.afficherboutonVoirPlus(sectionId)
        button.masquerBoutonVoirMoins(sectionId)
        button.voirMoins(sectionId)
    })
    
}


export async function eventListenerMeilleurFilm() {
    const buttonVoirPlus = document.querySelector("#best-movie .voir-plus");
    const buttonVoirMoins = document.querySelector("#best-movie .voir-moins");
    const infosPrincipales = document.querySelector("#best-movie .infos-principales");
    const btnVoirDetails = document.querySelector("#best-movie .voir-details")

    let film = tousLesFilms[0]

    btnVoirDetails.addEventListener("click", () => {
        popup.afficherPopUp(film);
       
    });


    buttonVoirMoins.style.display = 'none';

    buttonVoirPlus.addEventListener("click", () => {
        infosPrincipales.style.display = "grid";
        buttonVoirPlus.style.display = "none";
        buttonVoirMoins.style.display = "grid";
    });

    buttonVoirMoins.addEventListener("click", () => {
        infosPrincipales.style.display = "none";
        buttonVoirMoins.style.display = "none";
        buttonVoirPlus.style.display = "grid";
    });
}

