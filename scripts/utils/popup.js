import { tousLesFilms } from "./data.js"
import * as api from '../api.js'

export function afficherPopUp(filmPopUp) {
    let popUpBackground = document.querySelector(".pop-up-background")
    popUpBackground.style.display = "flex"

    let popUp = popUpBackground.querySelector(".pop-up")
    popUp.querySelector("h2").textContent = filmPopUp.title
    popUp.querySelector("img").src = filmPopUp.image_url
    popUp.querySelector(".resume p").textContent = filmPopUp.long_description

    let infosPrincipales = popUpBackground.querySelector(".infos-principales")
    infosPrincipales.querySelector(".liste-acteurs").textContent = `acteurs : ${filmPopUp.actors.join(",")}` 
    infosPrincipales.querySelector(".date-sortie").textContent = filmPopUp.year
    infosPrincipales.querySelector(".classification").textContent = `- ${filmPopUp.genres.join(", ")}` 
    infosPrincipales.querySelector(".score-IMDB").textContent = `score : ${filmPopUp.imdb_score}` 
    infosPrincipales.querySelector(".realisateur").textContent = `réalisateurs : ${filmPopUp.directors}` 
    infosPrincipales.querySelector(".duree").textContent = `durée ${filmPopUp.duration}` 
    infosPrincipales.querySelector(".pays-origin").textContent = `- pays d'origine ${filmPopUp.countries}` 
    infosPrincipales.querySelector(".box-office").textContent = `recettes : ${filmPopUp.worldwide_gross_income}` 

}


export function recupFilmPopUp(event) {
    const movieContainer = event.target.closest(".movie-container");
    if (!movieContainer) return null;
    
    const titreElement = movieContainer.querySelector(".hover-text");
    return titreElement ? titreElement.textContent.trim() : null;
}

export function eventListenerClosePopUp() {
    let popUpBackground = document.querySelector(".pop-up-background")
    const bouton = document.querySelector(".button")

    popUpBackground.addEventListener("click", (event) => {
        if (event.target === popUpBackground) {
            fermerPopUp()
        }
        if (event.target === bouton) {  
            fermerPopUp()
        }
    
})
}

export function eventListenerPopUp() {
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("click", async (event) => {
            // Mécanisme 1 : Cherche dans les films déjà chargés
            const movieContainer = event.target.closest(".movie-container");
            const titre = movieContainer.querySelector(".hover-text").textContent;
            const filmLocal = tousLesFilms.find(f => f.title === titre);

            if (filmLocal) {
                afficherPopUp(filmLocal);
            } 
            // Mécanisme 2 : Fallback API si non trouvé localement
            else {
                const titre = recupFilmPopUp(event);
                if (titre) await api.fetchFilmPopUp(titre);
            }
        });
    });
}

export function fermerPopUp() {
    let popUpBackground = document.querySelector(".pop-up-background")
    popUpBackground.style.display = "none"
    return popUpBackground
}