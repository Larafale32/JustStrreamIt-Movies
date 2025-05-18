async function lancerScript () {
    await fetchMeilleurFilm()
    await fetchMeilleursFilms()
    await fetchMysteryFilms()
    await fetchFilmsSF()
    await fetchFilmsSelection()

    document.querySelector(".selecteur1 select")
        .addEventListener("change", fetchFilmsSelection)

    eventListenerPopUp()
    eventListenerClosePopUp()
    recupFilmPopUp()

    // Initialisation des sections
    eventListenerFilms("top-rated-movies")
    eventListenerFilms("mystery-movies")
    eventListenerFilms("sf-movies")
    eventListenerFilms("movie-selection")

   
    eventListenerMeilleurFilm()
    
    // Redimensionnement écran
    window.addEventListener("resize", () => {
        const sections = ["top-rated-movies", "mystery-movies", "sf-movies", "movie-selection"]

        sections.forEach(sectionId => {
            masquerFilms(sectionId)

            const article = document.getElementById(sectionId)
            const films = article.querySelectorAll(".movie-container")
            const maxFilms = getNombreFilmsParEcran()

            if (films.length <= maxFilms) {
                masquerBoutonVoirPlus(sectionId)
                masquerBoutonVoirMoins(sectionId)
            } else {
                afficherboutonVoirPlus(sectionId)
                masquerBoutonVoirMoins(sectionId)
            }
        })
    })
}

lancerScript()