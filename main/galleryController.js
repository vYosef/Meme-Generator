'use strict'


let gComponent = 0

function onInit() {
    setMemeCanvas()
    let images= getGImg()
    renderGallery(images)
    renderSearchWords()
}

function renderGallery(images) {
    let imageContainer = document.querySelector('.image-container')

    let imgStr = ''
    images.forEach(img => imgStr = imgStr + `<img class="gallery-item" 
                    src="${img.url}" alt="puppies" data-id="${img.id}" onclick="onImgSelect(this, this.dataset.id)">`)

    imageContainer.innerHTML = imgStr
}

function renderSearchWords() {
    let searchWords = getSearchWords()
    let elWordContainer = document.querySelector('.search-word-container')
    let wordStr = ''
    for(const key in searchWords) {
        wordStr += `<div class="keyWord" 
        style="font-size: ${searchWords[key]}px;">
        <p onclick="onKeyWordClick(this.innerText)">${key}</p></div>`
    }
    elWordContainer.innerHTML = wordStr
}

function onKeyWordClick(elWord) {
    let searchWords = getSearchWords()
    let searchWordSize = searchWords[elWord]
    searchWordSize++
    updateSearchWords(elWord, searchWordSize)
    renderSearchWords()
    onSortImages(elWord)
}

function onImgSelect(elImg, id) {
    let imgRatio = elImg.height / elImg.width
    setRatio(imgRatio)
    gCurrImgId = +id
    gComponent = 1
    toggleComponents()
    renderMeme()
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

function onSetLang(lng) {
    setLang(lng)
    if (lng === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()
}
