'use strict'


let gComponent = 0

function onInit() {
    setMemeCanvas()
    // gElCanvas = document.querySelector('.meme-canvas')
    // console.log(gElCanvas)
    // gCtx = gElCanvas.getContext('2d')
    let images= getGImg()
    renderGallery(images)
    // renderMeme()
}
// 
function renderGallery(images) {
    
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
    let img = setImg()
    gComponent = 1
    toggleComponents()
    renderMeme(img)
}

function showGallery() {
    gComponent = 0
    setSavedMemeId(undefined)
    toggleComponents()
}

function toggleComponents() {
    let elGallery = document.querySelector('.gallery')
    let elEditor = document.querySelector('.editor')
    let elSAvedMemes = document.querySelector('.saved-memes')
    if (gComponent === 0) {
        elGallery.classList.remove('hidden')
        elEditor.classList.add('hidden')
        elSAvedMemes.classList.add('hidden')
        return
    } 
    if (gComponent === 1) {
        elGallery.classList.add('hidden')
        elEditor.classList.remove('hidden')
        elSAvedMemes.classList.add('hidden')
    }
    if (gComponent === 2) {
        elGallery.classList.add('hidden')
        elEditor.classList.add('hidden')
        elSAvedMemes.classList.remove('hidden')
    }
    // if (!elGallery.classList.contains('hidden') && calledFromHeader) return
    // if (elGallery.classList.contains('hidden') && elEditor.classList.contains('hidden')) {
    //     elEditor.classList.toggle('hidden')
    // }
    // elGallery.classList.toggle('hidden')
    // elEditor.classList.toggle('hidden')
    // elEditor.classList.toggle('flex')
} 

function onSortImages(txt) {
    // console.log(txt)
    let images = getGImg()
    if (!txt) {
        renderGallery(images)
        return
    }
    let sortedImages = []
    // console.log(images)
    images.forEach((img) => {
        if (img.keywords.some(word => word.includes(txt))) {
            sortedImages.push(img)
        }
    })
    renderGallery(sortedImages)
}
