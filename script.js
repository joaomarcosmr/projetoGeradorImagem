const textSearch = document.getElementById('textSearch')
const form = document.getElementById('search')
const results = document.getElementById('results')
const btnPage = document.getElementById('btnPage')
let imgAll = document.querySelectorAll('.imgGenerated')
const id = 'fX8QP3hnCgcbxCHLYnDNroKXCibk7DHei6scc1BjFHo'
const btn = 'btnSearch'

let error = []
let page = 1

async function imagesGenerator(){
    try{
        let searchText = textSearch.value
        if(!searchText == ''){
            loading()
            const res = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${searchText}&client_id=${id}`)
            const data = await res.json()
            if(data.results[0] == undefined){
                error.push('Nenhum resultado encontrado desse tema')
            }
            if(error.length > 0) {
                btnPage.style.display = 'none';
                showError()
                error = []
            }
            return data.results
        }
    }catch(e){
        console.log(e)
    }
}

function createImages(data){
    stopLoading()
    for(i=0; i < data.length; i++){
        let imgNew = document.createElement('img')
        imgNew.classList.add('imgGenerated')
        imgNew.src = data[i].urls.small
        results.appendChild(imgNew)
    }
    if(results.childNodes.length > 9){
        btnPage.style.display = 'inline';
    }
}

function deleteImages() {
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
}

function loading(){
    let spin = document.createElement('div')
    spin.setAttribute('id', 'loading')
    let text = document.createElement('p')
    text.innerHTML = 'Carregando...'
    spin.appendChild(text)
    spin.classList.add('spinning')
    results.appendChild(spin)
}

function stopLoading(){
    let load = document.getElementById('loading')
    load.parentNode.removeChild(load);
}

function showError(){
    let er = document.createElement('div')
    let text = document.createElement('p')
    text.innerHTML = error
    er.id = 'error'
    er.appendChild(text)
    results.appendChild(er)
}

form.addEventListener('click', async (e) => {
    if(e.target.classList.contains(btn)){
        e.preventDefault()
        deleteImages()
        const data = await imagesGenerator()
        createImages(data)
    }
})

document.addEventListener('click', async (e) => {
    if(e.target.id == 'btnPage'){
        page++;
        const res = await imagesGenerator()
        createImages(res)
    }
})