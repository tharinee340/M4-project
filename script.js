
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
    favList.style.display = 'none'
    

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

//เพิ่มหนังที่ชอบ
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

//เรียกหนังที่ชอบมาแสดง
function favListAnime(anime) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110340`, {
        method: 'GET'
    }).then((response) => {
        return response.json()
    }).then((data) => {
        data.map((element) => {
            console.log(element)
            addFavToCard(element)
        })
        alert('Add student successfully')
        
    })
}

document.getElementById('favLink').addEventListener('click',(event) => {
    favListAnime()
    favList.style.display = 'block'
})

//เอาค่ารายการที่ชอบมาใส่
function addFavToCard(anime) {
    
    const favList = document.getElementById('favList')
    let card = document.createElement('div')
    let img = document.createElement('img')
    
    img.setAttribute('src',anime.image_url)
    card.appendChild(img) 
    

    let titleAnime = document.createElement('h5')
    titleAnime.innerHTML = `${anime.title}`
    titleAnime.classList.add('text-white')
    card.appendChild(titleAnime)

    let row = document.createElement('row')
    let btnDetail = document.createElement('button')
    btnDetail.classList.add('btn')
	btnDetail.classList.add('btn-primary')
    btnDetail.innerText = 'Detail'
    row.appendChild(btnDetail)


    let btnDelete = document.createElement('button')
    btnDelete.classList.add('btn')
	btnDelete.classList.add('btn-danger')
    btnDelete.innerText = 'Delete'
    btnDelete.addEventListener('click', function() {
        let confirmMsg = confirm(`ท่านต้องการลบอนิเมะเรื่อง ${anime.title}หรือไม่`)
        if (confirmMsg) {
            deleteFavAnime(anime.mal_id)
        }
       
    })

    row.appendChild(btnDelete)

    card.appendChild(row)
    favList.appendChild(card)
}


var searchList = document.getElementById('searchList')
var favList = document.getElementById('favList')
function hideAll() {
    searchList.style.display ='none'
    favList.style.display = 'none'

}


