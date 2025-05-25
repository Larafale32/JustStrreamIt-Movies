import * as api from './api.js'
import * as show from './affichage.js'
import * as mQ from './utils/mediaQueriesUtils.js'
import * as popup from './utils/popup.js'

async function lancerScript () {
    await api.fetchMeilleurFilm("Fight Club")
    await api.fetchMeilleursFilms("top-rated-movies", 7)
    await api.fetchCategoryFilms("Mystery", "mystery-movies")
    await api.fetchCategoryFilms("Sci-Fi", "sf-movies")
    await api.fetchFilmsSelection()

    document.querySelector(".selecteur1 select")
        .addEventListener("change", api.fetchFilmsSelection)

    popup.eventListenerPopUp()
    popup.eventListenerClosePopUp()

    // Initialisation des sections
    show.eventListenerFilms("top-rated-movies")
    show.eventListenerFilms("mystery-movies")
    show.eventListenerFilms("sf-movies")
    show.eventListenerFilms("movie-selection")

   
    
    show.eventListenerMeilleurFilm()

    
    // Redimensionnement écran
    window.addEventListener("resize", () => {
        const sections = ["top-rated-movies", "mystery-movies", "sf-movies", "movie-selection"]

        sections.forEach(sectionId => {
            mQ.masquerFilms(sectionId)

     
        })
    })
}

lancerScript()