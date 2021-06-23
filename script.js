
function searchAnime(event) {
    
    let query = document.getElementById('searchInput').value

    fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`, )
    .then((response) => {
        return response.json()
    }).then((data) => {
        data.results.map((element) => {
            console.log(element)
            addAnimeToCard(element)
        })
        //addAnimeToCard
        //console.log(data.results)
    }).catch((err) => {
        console.warn(err.message)
    })
}
/*
function updateDom(data){

    const searchResults = document.getElementById('output')
    const animeCategories = data.results
        .reduce((acc,anime) => {
            const {type} = anime
            if(acc[type] == undefined) acc[type] = []
            acc[type].push(anime)
            return acc
        }, {})
    
    searchResults.innerHTML = Object.keys(animeCategories).map(key => {
        const animesHTML = animeCategories[key]
        .sort((a,b) => a.episodes-b.episodes)
        .map(anime => console.log(anime))
    })
        
    //showSearchMovie(anime)
}


*/
function onLoad(){
    document.getElementById('searchButton')
    .addEventListener('click', searchAnime)
}

function addAnimeToData(anime) {
    let imageElem = document.getElementById('image')
    imageElem.setAttribute('src',anime.image_url)
    let titleElem = document.getElementById('title')
    titleElem.innerHTML = anime.title
}

function addAnimeToCard(anime) {
    const searchList = document.getElementById('searchList')
    
    let row = document.createElement('row')
    let card = document.createElement('div')

    let img = document.createElement('img')
    img.setAttribute('src',anime.image_url)
    card.appendChild(img) 
    let titleAnime = document.createElement('h5')
    titleAnime.innerHTML = `${anime.title}`
    
    
    card.appendChild(titleAnime)
    searchList.appendChild(card)

}


