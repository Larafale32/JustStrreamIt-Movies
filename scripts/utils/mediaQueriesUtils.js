export function changerAffichageFilms(sectionId, display) {
    let article = document.getElementById(sectionId)
    let films = article.querySelectorAll(".movie-container")

    const maxFilms = getNombreFilmsParEcran()



    for (let i = maxFilms; i < films.length; i++) {
        films[i].style.display = display

    }
}

export function masquerFilms(sectionId) {
    const article = document.getElementById(sectionId)
    const films = article.querySelectorAll(".movie-container")

    const maxFilms = getNombreFilmsParEcran()

    films.forEach((film, index) => {
        film.style.display = index < maxFilms ? "flex" : "none"
    })
}


export function getNombreFilmsParEcran() {
    const largeur = window.innerWidth

    if (largeur < 700) return 2 
    if (largeur < 900) return 4

    return 6 
}



