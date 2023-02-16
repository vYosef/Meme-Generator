'use strict'


let gComponent = 0

function onInit() {
    setMemeCanvas()
    let images= getGImg()
    renderGallery(images)
}

function renderGallery(images) {
    let imageContainer = document.querySelector('.image-container')

    let imgStr = ''
    images.forEach(img => imgStr = imgStr + `<img class="gallery-item" 
                    src="${img.url}" alt="puppies" data-id="${img.id}" onclick="onImgSelect(this.dataset.id)">`)

    imageContainer.innerHTML = imgStr
}

function onImgSelect(id) {
    gCurrImgId = +id
    let img = setImg()
    gComponent = 1
    toggleComponents()
    renderMeme(img)
    showCurLine()
}

function showGallery() {
    gComponent = 0
    setSavedMemeId(undefined)
    resetMeme()
    resetInput()
    resetColors()
    resetLine()
    toggleComponents()
}

function resetColors() {
    console.log('hi')
    let colorInput = document.querySelector('.color-picker')
    let strokeColorInput = document.querySelector('.stroke-picker')
    colorInput.value = "#000000"
    strokeColorInput = "#000000"
}

function toggleComponents() {
    let elGallery = document.querySelector('.gallery')
    let elEditor = document.querySelector('.editor')
    let elSAvedMemes = document.querySelector('.saved-memes')
    if (gComponent === 0) {
        elGallery.classList.remove('hidden')
        elEditor.classList.add('hidden')
        elEditor.classList.remove('flex')
        elSAvedMemes.classList.add('hidden')
        elSAvedMemes.classList.remove('grid')
        return
    } 
    if (gComponent === 1) {
        elGallery.classList.add('hidden')
        elEditor.classList.remove('hidden')
        elEditor.classList.add('flex')
        elSAvedMemes.classList.add('hidden')
        elSAvedMemes.classList.remove('grid')
        return
    }
    if (gComponent === 2) {
        elGallery.classList.add('hidden')
        elEditor.classList.add('hidden')
        elEditor.classList.remove('flex')
        elSAvedMemes.classList.remove('hidden')
        elSAvedMemes.classList.add('grid')
        return
    }
} 

function onSortImages(txt) {
    let images = getGImg()
    if (!txt) {
        renderGallery(images)
        return
    }
    let sortedImages = []

    images.forEach((img) => {
        if (img.keywords.some(word => word.includes(txt))) {
            sortedImages.push(img)
        }
    })
    renderGallery(sortedImages)
}
