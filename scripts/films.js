const meilleursFilm = fetch("http://localhost:8000/api/v1/titles/?imdb_score_min=9")

meilleursFilm
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur : ${response.status}`)
        }
        return response.json()
    
    })
    .then(data => {
        console.log(JSON.stringify(data, null, 2))
    })
    .catch(error => {
        console.log(error.message)
    })

