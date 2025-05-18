let tousLesFilms = []

function afficherMeilleurFilm(film) {
    let article = document.getElementById("best-movie")
    article.querySelector("h2").textContent = film.title
    let imageContainer = article.querySelector(".image-container")
    imageContainer.querySelector("img").src = film.image_url
    let infosPrincipales = article.querySelector(".infos-principales")
    infosPrincipales.querySelector(".resume").textContent = `Résumé : ${film.long_description}` || "non renseigné"
    infosPrincipales.querySelector(".liste-acteurs").textContent = `acteurs : ${film.actors.join(",")}` || "non renseigé"
    infosPrincipales.querySelector(".date-sortie").textContent = `date de sortie : ${film.date_published}`|| "non renseigné"
    infosPrincipales.querySelector(".classification").textContent = `genres : ${film.genres.join(", ")}` || "non renseigné"
    infosPrincipales.querySelector(".score-IMDB").textContent = `score : ${film.imdb_score}` || "non renseigné"
    infosPrincipales.querySelector(".realisateur").textContent = `réalisateurs : ${film.directors}` || "non renseigné"
    infosPrincipales.querySelector(".duree").textContent = `durée ${film.duration}` || "non renseigné"
    infosPrincipales.querySelector(".pays-origin").textContent = `pays d'origine ${film.countries}` || "non renseigné"
    infosPrincipales.querySelector(".box-office").textContent = `recettes : ${film.worldwide_gross_income}` || "non renseigné"
}
    

async function fetchMeilleurFilm() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/titles/?title=Interstellar")

        if (!response.ok) {
            throw new Error(`Erreur : ${response.status}`)
        }
        const data = await(response.json())
        let meilleurFilm = data.results[0]

        afficherMeilleurFilm(meilleurFilm)

        tousLesFilms = tousLesFilms.concat(meilleurFilm)
        console.log(tousLesFilms[0])

    }catch(error) {
        console.log(error.message)
    }
    
}

function afficherMeilleursFilms(films) {
    let i = 0
    let article = document.getElementById("top-rated-movies")
    let movieContainers = article.querySelectorAll(".movie-container")

    for (i; i < films.length && i < movieContainers.length; i++) {
        movieContainers[i].querySelector("img").src = films[i].image_url
        movieContainers[i].querySelector(".hover-text").textContent = films[i].title
    }
}

async function fetchMeilleursFilms() {
    let meilleursFilms = []
    let page = 1

    try{
        while (meilleursFilms.length < 6 && page < 3) {
            const response = await fetch(`http://localhost:8000/api/v1/titles/?imdb_score_min=7&min_year=2012&page=${page}`)
            if(!response.ok) {
                throw new Error(`Erreur : ${response.status}`)
            }

            const data = await response.json()
    
            meilleursFilms = meilleursFilms.concat(data.results)
            page++
        }

        afficherMeilleursFilms(meilleursFilms.slice(0, 6))
        tousLesFilms = tousLesFilms.concat(meilleursFilms)

        }catch (error) {
            console.log(error.message)
        }
    
}

function afficherMysteryFilms(mysteryFilms) {
    let i = 0
    let article = document.getElementById("mystery-movies")
    let movieContainers = article.querySelectorAll(".movie-container")

    for (i; i < 6; i++) {
        movieContainers[i].querySelector("img").src = mysteryFilms[i].image_url
        movieContainers[i].querySelector(".hover-text").textContent = mysteryFilms[i].title
    }
}

async function fetchMysteryFilms() {
    let mysteryFilms = []
    let page = 1
    try {
        while (mysteryFilms.length < 6 && page < 3) {
            const response = await fetch("http://localhost:8000/api/v1/titles/?genre_contains=Mystery&min_year=2010")
            if(!response.ok) {
                throw new Error(`Erreur : ${response.status}`)
            }
            
            const data = await response.json()
            mysteryFilms = mysteryFilms.concat(data.results)
            page ++ 
         
        }

        afficherMysteryFilms(mysteryFilms.slice(0, 6))
        tousLesFilms = tousLesFilms.concat(mysteryFilms)

        }catch (error) {
            console.log(error.message)
        }

    }



function afficherFilmsSF(filmsSF) {
    let article = document.getElementById("sf-movies")
    let movieContainers = article.querySelectorAll(".movie-container")

    for(let i=0; i<6; i++){
        movieContainers[i].querySelector("img").src = filmsSF[i].image_url
        movieContainers[i].querySelector(".hover-text").textContent = filmsSF[i].title
    }
    
}

async function fetchFilmsSF() {
    let filmsSF = []
    let page = 1

    try {
        while(filmsSF.length < 6 && page < 3) {
            const response = await fetch("http://localhost:8000/api/v1/titles/?genre=Sci-Fi&min_year=2010")

            if (!response.ok) {
                throw new Error(`Erreur : ${response.status}`)
            }
            const data = await response.json()
            filmsSF = filmsSF.concat(data.results)
            page ++
        }

        afficherFilmsSF(filmsSF)
        tousLesFilms = tousLesFilms.concat(filmsSF)

    }catch (error) {
        console.log(error.message)
    }
}

function recupSelection() {
    let selecteur = document.querySelector(".selecteur1")
    let selection = selecteur.querySelector("select")
    let choix = selection.value

    console.log(choix)

    return choix

}

function afficherFilmsSelection(filmsSelection) {
    let article = document.getElementById("movie-selection")
    let movieContainers = article.querySelectorAll(".movie-container")

    for (let i=0; i < 6; i++) {
        
        movieContainers[i].querySelector("img").src = filmsSelection[i].image_url
        movieContainers[i].querySelector(".hover-text").textContent = filmsSelection[i].title

    }
}

async function fetchFilmsSelection() {
    let filmsSelection = []
    let page = 1
    let choix = recupSelection()

    
   try {
        while (filmsSelection.length < 6 && page < 3) {
            const response = await fetch(`http://localhost:8000/api/v1/titles/?genre=${choix}&min_year=2010`)

            if (!response.ok) {
                throw new Error(`Erreur : ${response.status}`)
            }

            const data = await response.json()
            filmsSelection = filmsSelection.concat(data.results)
            page++
        }
        afficherFilmsSelection(filmsSelection)
        tousLesFilms = tousLesFilms.concat(filmsSelection)

    } catch (error) {
        console.log(error.message)
    }
    
}

function afficherPopUp(filmPopUp) {
    let popUpBackground = document.querySelector(".pop-up-background")
    popUpBackground.style.display = "flex"

    let popUp = popUpBackground.querySelector(".pop-up")
    popUp.querySelector("img").src = filmPopUp.image_url
    popUp.querySelector("p").textContent = filmPopUp.long_description

    let infosPrincipales = popUpBackground.querySelector(".infos-principales")
    infosPrincipales.querySelector(".liste-acteurs").textContent = `acteurs : ${filmPopUp.actors.join(",")}` || "non renseigé"
    infosPrincipales.querySelector(".date-sortie").textContent = `date de sortie : ${filmPopUp.date_published}`|| "non renseigné"
    infosPrincipales.querySelector(".classification").textContent = `genres : ${filmPopUp.genres.join(", ")}` || "non renseigné"
    infosPrincipales.querySelector(".score-IMDB").textContent = `score : ${filmPopUp.imdb_score}` || "non renseigné"
    infosPrincipales.querySelector(".realisateur").textContent = `réalisateurs : ${filmPopUp.directors}` || "non renseigné"
    infosPrincipales.querySelector(".duree").textContent = `durée ${filmPopUp.duration}` || "non renseigné"
    infosPrincipales.querySelector(".pays-origin").textContent = `pays d'origine ${filmPopUp.countries}` || "non renseigné"
    infosPrincipales.querySelector(".box-office").textContent = `recettes : ${filmPopUp.worldwide_gross_income}` || "non renseigné"

}

function fermerPopUp() {
    let popUpBackground = document.querySelector(".pop-up-background")
    popUpBackground.style.display = "none"
    return popUpBackground
}

async function fetchFilmPopUp() {
    filmPopUp = recupFilmPopUp()
    try {
        const response = await fetch(`http://localhost:8000/api/v1/titles/?title=${filmPopUp}`)
        if (!response.ok) {
            throw new Error(`Erreur : ${response.status}`)
        }

        data = await response.json()
        infosFilm = infosFilm.concat(data)

        afficherPopUp(filmPopUp)
    } catch (error) {
        console.log(error.message)
    }

}

function eventListenerPopUp() {
    const images = document.querySelectorAll("img")

    images.forEach((img) => {
        img.addEventListener("click", (event) => {
            let movieContainer = event.target.closest(".movie-container")
            let titre = movieContainer.querySelector(".hover-text").textContent

            let filmClique = tousLesFilms.find(film => film.title === titre)

            if (filmClique) {
                afficherPopUp(filmClique)
            } else {
                console.log("Film non trouvé :", titre)
            }
        })
    })
    
}

function eventListenerClosePopUp() {
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

function recupFilmPopUp() {
    alltitles = document.querySelectorAll(".hover-text")

    
    for (let i=0; i<tousLesFilms.length; i++){
        console.log(tousLesFilms[i].title)
    }   
}

function changerAffichageFilms(sectionId, display) {
    let article = document.getElementById(sectionId)
    let films = article.querySelectorAll(".movie-container")

    const maxFilms = getNombreFilmsParEcran()

    for (let i = maxFilms; i < films.length; i++) {
        films[i].style.display = display
    }
}


function voirPlus(sectionId) {
  changerAffichageFilms(sectionId, "flex")
}

function voirMoins(sectionId) {
    changerAffichageFilms(sectionId, "none")
}

function affichageBouton(sectionId, className, display) {
    let article = document.getElementById(sectionId)
    let button = article.querySelector(className)

    button.style.display = display

}

function afficherboutonVoirPlus(sectionId) {
    affichageBouton(sectionId, ".voir-plus", "grid")
}

function masquerBoutonVoirPlus(sectionId) {
    affichageBouton(sectionId, ".voir-plus", "none")
}

function afficherBoutonVoirMoins(sectionId) {
    affichageBouton(sectionId, ".voir-moins", "grid")
}

function masquerBoutonVoirMoins(sectionId) {
    affichageBouton(sectionId, ".voir-moins", "none")
}

function masquerFilms(sectionId) {
    const article = document.getElementById(sectionId)
    const films = article.querySelectorAll(".movie-container")

    const maxFilms = getNombreFilmsParEcran()

    films.forEach((film, index) => {
        film.style.display = index < maxFilms ? "flex" : "none"
    })
}

function eventListenerFilms(sectionId) {
    let article = document.getElementById(sectionId)
    let boutonVoirPlus = article.querySelector(".voir-plus")
    let boutonVoirMoins = article.querySelector(".voir-moins")

    masquerFilms(sectionId)
    
    boutonVoirPlus.addEventListener("click", () => {
        afficherBoutonVoirMoins(sectionId)
        masquerBoutonVoirPlus(sectionId)
        voirPlus(sectionId)

    })

    boutonVoirMoins.addEventListener("click", () => {
        afficherboutonVoirPlus(sectionId)
        masquerBoutonVoirMoins(sectionId)
        voirMoins(sectionId)
    })
    
}

function getNombreFilmsParEcran() {
    const largeur = window.innerWidth

    if (largeur < 700) return 1
    if (largeur < 900) return 2

    return 3
}


function masquerInfosMeilleurFilm() {
    document.querySelector("#best-movie .infos-principales").classList.add("masquer");
}

function afficherInfosMeilleurFilm() {
    document.querySelector("#best-movie .infos-principales").classList.remove("masquer");
}

function masquerButtonMeilleurFilm(buttonElement) {
    buttonElement.classList.add("masquer");
}

function afficherButtonMeilleurFilm(buttonElement) {
    buttonElement.classList.remove("masquer");
}

function eventListenerMeilleurFilm() {
    let buttonVoirPlus = document.querySelector("#best-movie .voir-plus");
    let buttonVoirMoins = document.querySelector("#best-movie .voir-moins");

    masquerButtonMeilleurFilm(buttonVoirMoins)

    buttonVoirPlus.addEventListener("click", () => {
        afficherInfosMeilleurFilm();
        masquerButtonMeilleurFilm(buttonVoirPlus);
        afficherButtonMeilleurFilm(buttonVoirMoins);
    });

    buttonVoirMoins.addEventListener("click", () => {
        masquerInfosMeilleurFilm();
        masquerButtonMeilleurFilm(buttonVoirMoins);
        afficherButtonMeilleurFilm(buttonVoirPlus);
    });

    window.addEventListener("resize", () => {
        let largeur = window.innerWidth;

        if (largeur < 700) {
            masquerInfosMeilleurFilm();
            afficherButtonMeilleurFilm(buttonVoirPlus);
            masquerButtonMeilleurFilm(buttonVoirMoins);
        } else {
            afficherInfosMeilleurFilm();
            masquerButtonMeilleurFilm(buttonVoirPlus);
            masquerButtonMeilleurFilm(buttonVoirMoins);
        }
    });

    window.dispatchEvent(new Event("resize"));
}
