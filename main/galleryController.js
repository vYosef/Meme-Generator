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
    // console.log(gCurrImgId)
    let img = setImg(gCurrImgId)
    renderMeme(img)
    // resetInputs()
}