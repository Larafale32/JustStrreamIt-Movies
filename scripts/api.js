import * as show from './affichage.js'
import * as popup from './utils/popup.js'
import { tousLesFilms } from './utils/data.js'

export async function fetchMeilleurFilm(titreFilm) {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/titles/?title=${titreFilm}`)

        if (!response.ok) {
            throw new Error(`Erreur : ${response.status}`)
        }
        const data = await(response.json())
        let meilleurFilm = data.results[0]

        show.afficherMeilleurFilm(meilleurFilm)

        tousLesFilms = tousLesFilms.push(meilleurFilm)
        console.log(tousLesFilms)

    }catch(error) {
        console.log(error.message)
    }
    
}

export async function fetchMeilleursFilms(sectionId, noteMin) {
    let meilleursFilms = []
    let page = 1

    try{
        while (meilleursFilms.length < 6 && page < 3) {
            const response = await fetch(`http://localhost:8000/api/v1/titles/?imdb_score_min=${noteMin}&min_year=2012&page=${page}`)
            if(!response.ok) {
                throw new Error(`Erreur : ${response.status}`)
            }

            const data = await response.json()
    
            meilleursFilms = meilleursFilms.concat(data.results)
            page++
        }

        show.afficherMeilleursFilms(meilleursFilms.slice(0, 6), sectionId)
        tousLesFilms = tousLesFilms.push(meilleursFilms)

        }catch (error) {
            console.log(error.message)
        }
    
}

export async function fetchCategoryFilms(category, sectionId) {
    let categoryFilms = []
    let page = 1
    try {
        while (categoryFilms.length < 6 && page < 3) {
            const response = await fetch(`http://localhost:8000/api/v1/titles/?genre_contains=${category}&min_year=2010&page=${page}`)
            if(!response.ok) {
                throw new Error(`Erreur : ${response.status}`)
            }
            
            const data = await response.json()
            categoryFilms = categoryFilms.concat(data.results)
            page ++ 
         
        }

        show.afficherCategoryFilms(categoryFilms.slice(0, 6), sectionId)
        tousLesFilms = tousLesFilms.push(categoryFilms)

        }catch (error) {
            console.log(error.message)
        }

    }

export async function fetchFilmsSelection() {
    let filmsSelection = []
    let page = 1
    let choix = show.recupSelection()

    
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
        show.afficherFilmsSelection(filmsSelection)
        tousLesFilms = tousLesFilms.push(filmsSelection)

    } catch (error) {
        console.log(error.message)
    }
    
}

export async function fetchFilmPopUp(titreFilm) {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/titles/?title=${encodeURIComponent(titreFilm)}`);
        if (!response.ok) throw new Error(`Erreur ${response.status}`);

        const data = await response.json();
        if (data.results.length > 0) {
            popup.afficherPopUp(data.results[0]); // Affiche le premier résultat
            tousLesFilms.push(data.results[0]); // Ajoute au cache local
        }
    } catch (error) {
        console.error("Échec du fetch :", error);
    }
}