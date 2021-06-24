var searchList = document.getElementById('searchOutput')
var favList = document.getElementById('favOutput')
var animeDetail = document.getElementById('animeDetail')
function hideAll() {
    searchList.style.display ='none'
    favList.style.display = 'none'

}

function searchAnime(event) {
    
    let query = document.getElementById('searchInput').value

    fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`, )
    .then((response) => {
        return response.json()
    }).then((data) => {
        data.results.map((element) => {
            console.log(element)
            addAnimeToCard(element)
            searchList.style.display ='block'
            favList.style.display = 'none'
            animeDetail.style.display = 'none'
        })
    }).catch((err) => {
        console.warn(err.message)
    })
}

function onLoad(){
    
    document.getElementById('searchButton')
    .addEventListener('click', (event) => {
        const searchList = document.getElementById('searchList')
        searchList.innerHTML = ''
        searchList.style.display = 'block'
        
        searchAnime()
    })
    favList.style.display = 'none'
     

}

function addAnimeToCard(anime) {
    
    const searchList = document.getElementById('searchList')
    
    let row = document.createElement('row')
    let card = document.createElement('div')
    card.classList.add('card','my-3','col-3','mx-2')
    card.style.width = '270px'
    card.style.textAlign ='center'
    card.style.padding = '10px'
    let img = document.createElement('img')
    img.setAttribute('src',anime.image_url)
    img.height = 300
    img.addEventListener('dblclick',(event) => {
        let confirmMsg = confirm(`ท่านต้องการเพิ่มอนิเมะเรื่อง ${anime.title} เป็นรายการโปรดหรือไม่`)
        if (confirmMsg){
            addAnimeToDB(anime) 
            searchList.style.display ='none'
            favList.style.display = 'block'
        }

    })

    card.appendChild(img) 
    let titleAnime = document.createElement('h5')
    titleAnime.innerHTML = `${anime.title}`
    titleAnime.style.marginTop = '15px'
    
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
    const favList = document.getElementById('favList')
    favList.innerHTML = ''
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110340`, {
        method: 'GET'
    }).then((response) => {
        return response.json()
    }).then((data) => {
        data.map((element) => {
            console.log(element)
            
            addFavToCard(element)
            
        })
        
        
    })
}

//ปุ่มกดไปที่หน้า fav
document.getElementById('favLink').addEventListener('click',(event) => {
    
    searchList.style.display = 'none'
    animeDetail.style.display = 'none'
    favListAnime()
    
    favList.style.display = 'block'
    
})

//เอาค่ารายการที่ชอบมาใส่
function addFavToCard(anime) {
    
    const favList = document.getElementById('favList')
    
    let card = document.createElement('div')
    card.classList.add('card','m-2')
    card.style.width = '270px'
    card.style.textAlign ='center'
    card.style.padding = '10px'
    let img = document.createElement('img')
    
    img.setAttribute('src',anime.image_url)
    img.height = 300
    card.appendChild(img) 
    

    let titleAnime = document.createElement('h5')
    titleAnime.innerHTML = `${anime.title}`
    titleAnime.classList.add('text-dark', 'my-3')
    card.appendChild(titleAnime)

    let row = document.createElement('row')
    let btnDetail = document.createElement('button')
    btnDetail.classList.add('btn')
	btnDetail.classList.add('btn-primary' , 'mx-2')
    btnDetail.style.width = '130px'
    btnDetail.innerText = 'Detail'
    btnDetail.addEventListener('click', function() {
        favList.style.display = 'none'
        animeDetail.style.display = 'block'
        showAnimeDetail(anime.id)
        console.log(anime.id)
    })
    row.appendChild(btnDetail)


    let btnDelete = document.createElement('button')
    btnDelete.classList.add('btn')
	btnDelete.classList.add('btn-danger' , 'mx-2')
    btnDelete.innerText = 'Delete'
    btnDelete.style.width = '75px'
    btnDelete.addEventListener('click', function() {
        let confirmMsg = confirm(`ท่านต้องการลบอนิเมะเรื่อง ${anime.title}หรือไม่`)
        if (confirmMsg) {
            deleteFavAnime(anime.id)
            console.log(anime.id) //ไอดีออกแล้ว
        }
       
    })

    row.appendChild(btnDelete)

    card.appendChild(row)
    favList.appendChild(card)
}



function showAnimeDetail(id) {
    fetch (`https://se104-project-backend.du.r.appspot.com/movie/632110340/${id}`, {
    }).then((response) => {
        if (response.status === 200){
        return response.json()
        }else {
			throw Error(response.statusText)
		}
    }).then((data) => {
        const animeDetail = document.getElementById('animeDetail')
        animeDetail.innerHTML = ''
        addAnimeDetailToCard(data)
        favList.style.display = 'none'
        
        
        
    }).catch((err) => {
        console.warn(err.message)
})

}

function addAnimeDetailToCard(anime) {
    console.log(anime.image_url)
    const animeDetail = document.getElementById('animeDetail')
    let cell = document.createElement('div')
    
   
    
    cell.classList.add('text-dark','row','mx-5','d-flex','justify-content-center','mt-5')
    let cell2 = document.createElement('div')
    cell2.classList.add('col-2')

    let img = document.createElement('img')
    img.setAttribute('src',anime.image_url)
    cell2.appendChild(img)
    cell.appendChild(cell2)

    let cell3 = document.createElement('div')
    cell3.classList.add('col-6','mx-4','bg-white')
    let title = document.createElement('h5')
    title.innerHTML = `Title : ${anime.title}`
    title.classList.add('m-4','pb-3')
    title.style.textAlign = 'center'
    title.style.fontWeight = 'boider'
    title.style.borderBottom = '1px solid gray'

    let detail = document.createElement('p')
    detail.innerHTML = `Type : ${anime.type}`

    let detail2 = document.createElement('p')
    detail2.innerHTML = `Synopsis : ${anime.synopsis}`

    let detail3 = document.createElement('p')
    detail3.innerHTML = `Episodes : ${anime.episodes}`

    let detail4 = document.createElement('p')
    detail4.innerHTML = `Rated : ${anime.rated}`
    
    cell3.appendChild(title)
    
    cell3.appendChild(detail)
    cell3.appendChild(detail2)
    cell3.appendChild(detail3)
    cell3.appendChild(detail4)
    
    cell.appendChild(cell3)
    
    
    animeDetail.appendChild(cell)
    
    //ค่อยว่ากัน
}

//ลบรายการที่ชอบออก
function deleteFavAnime(id) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=632110340&&movieId=${id}`, {
		method: 'DELETE'
	}).then((response) => {
		if (response.status === 200){
			return response.json()
		}else {
			throw Error(response.statusText)
		}
	}).then(data => {
		alert(`student
         name ${data.title} is now deleted`)
         const favList = document.getElementById('favList')
         favList.innerHTML = ''
		favListAnime()
	}).catch((error) => {
		alert(error)('your input student is not in database')
	})
}


