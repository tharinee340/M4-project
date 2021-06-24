
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
    }).catch((err) => {
        console.warn(err.message)
    })
}

function onLoad(){
    document.getElementById('searchButton')
    .addEventListener('click', searchAnime)

}

function addAnimeToCard(anime) {
    
    const searchList = document.getElementById('searchList')
    
    let row = document.createElement('row')
    let card = document.createElement('div')
    

    let img = document.createElement('img')
    img.setAttribute('src',anime.image_url)
    img.addEventListener('dblclick',(event) => {
        let confirmMsg = confirm(`ท่านต้องการเพิ่มอนิเมะเรื่อง ${anime.title} เป็นรายการโปรดหรือไม่`)
        if (confirmMsg){
            addAnimeToDB(anime) 
        }

    })

    card.appendChild(img) 
    let titleAnime = document.createElement('h5')
    titleAnime.innerHTML = `${anime.title}`
    
    card.appendChild(titleAnime)
    searchList.appendChild(card)
    

}

function addFavAnimeToDB() {
    let imageElem = document.getElementById('image')
    imageElem.setAttribute('src',anime.image_url)
    let titleElem = document.getElementById('title')
    titleElem.innerHTML = anime.title
}

function addAnimeToDB(anime) {

    var id = 1
    let fav = `{ 
        "url" : "${anime.url}",
        "image_url" : "${anime.image_url}",
        "title" : "${anime.title}",
        "synopsis" : "${anime.synopsis}",
        "type" : "${anime.type}",
        "episodes" : "${anime.episodes}",
        "score" : "${anime.score}",
        "rated" : "${anime.rated}",
        "id" : "${id}"
    }`
    fetch('https://se104-project-backend.du.r.appspot.com/movies', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: `{"id":"632110340","movie":${fav}}`
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        alert('Add favorite success')
        id++
    }).catch(error => {
        alert('Error cannot at favorite')
    })
}

