'use strict'


function onInit() {
    setMemeCanvas()
    // gElCanvas = document.querySelector('.meme-canvas')
    // console.log(gElCanvas)
    // gCtx = gElCanvas.getContext('2d')
    renderGallery()
    // renderMeme()
}
// 
function renderGallery() {
    let images= getGImg()
    // console.log(images)
    let imageContainer = document.querySelector('.image-container')
    // console.log(imageContainer)
    let imgStr = ''
    images.forEach(img => imgStr = imgStr + `<img class="gallery-item" 
                    src="${img.url}" alt="puppies" data-id="${img.id}" onclick="onImgSelect(this.dataset.id)">`)
    // console.log(imgStr)
    imageContainer.innerHTML = imgStr
}

function onImgSelect(id) {
    gCurrImgId = +id
    let img = setImg(gCurrImgId)
    toggleComponents(false)
    renderMeme(img)
}

function showGallery() {
    toggleComponents(true)
}

function toggleComponents(calledFromHeader) {
    let elGallery = document.querySelector('.gallery')
    let elEditor = document.querySelector('.editor')
    if (!elGallery.classList.contains('hidden') && calledFromHeader) return
    if (elGallery.classList.contains('hidden') && elEditor.classList.contains('hidden')) {
        elEditor.classList.toggle('hidden')
    }
    elGallery.classList.toggle('hidden')
    elEditor.classList.toggle('hidden')
    elEditor.classList.toggle('flex')
} 

function getRandomMeme() {
    console.log('hi')
}

