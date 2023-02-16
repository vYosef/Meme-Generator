'use strict'

let gElCanvas
let gCtx

function setMemeCanvas() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderMeme(id) {
    resizeCanvas()
    let currLine = getCurrLine()
    let meme = getMeme()
    let img = setImg()
    let currtxt = meme.lines[currLine].txt
    let prevTxt = currLine === 0 ? meme.lines[1].txt :meme.lines[0].txt
    let pos = currLine === 0 ? gElCanvas.height / 8 : gElCanvas.height / 1.1
    let prevPos = currLine === 0 ? gElCanvas.height / 1.1 : gElCanvas.height / 8
    let prevLine = currLine === 0 ? 1 : 0

    drawImage(img)

    writeText(meme, currtxt, pos, currLine)
    writeText(meme, prevTxt, prevPos, prevLine)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    let canvasSize = elContainer.offsetHeight < elContainer.offsetWidth ? elContainer.offsetHeight : elContainer.offsetWidth
    gElCanvas.width = canvasSize
    gElCanvas.height = canvasSize  
}

function drawImage(img) {
    let image = new Image()
    image.src = img.url
    image.width = '100%'
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)  
}

function writeText(meme, txt, y, currLine) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${meme.lines[currLine].strokeColor}`
    gCtx.fillStyle = `${meme.lines[currLine].color}`
    gCtx.font = `${meme.lines[currLine].size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt,  gElCanvas.width / 2, y)
    gCtx.strokeText(txt,  gElCanvas.width / 2, y)
}

function showCurLine() {
    let currLine = getCurrLine()
    let elCurrLine = document.querySelector('.curr-line')
    if(currLine === 0) {
        elCurrLine.innerText = 1
        return
    }
    if(currLine === 1) {
        elCurrLine.innerText = 2
        return
    }
}

function onLineType(txt) {
    if (gCurrImgId === undefined) return
    setLineTxt(txt)
    renderMeme(+gCurrImgId)
}

function onChangeTextColor(color) {
    changeTextColor(color)
    renderMeme(gCurrImgId)
}

function onChangeTextOutline(color) {
    changeTextStroke(color)
    renderMeme()
}

function onChangeFont(diff) {
    changeFont(diff)
    renderMeme(gCurrImgId)
}

function resetInput() {
    let input = document.querySelector('.enter-text')
    input.value = ''
    input.textContent = ''
}

function onSwitchLine() {
    switchLine()
    resetInput()
    showCurLine()
}

function onSaveMeme() {
    saveMeme()
    resetMeme()
    renderMeme()
}

function getRandomMeme() {
    gComponent = 1
    toggleComponents()
    let images = getGImg()
    let randId = getRandomIntInclusive(1, images.length - 1)
    randomizeMeme(randId)
    randomizeId(randId)
    renderMeme(randId)
    callResetMeme()
}

function onLoadMemes() { 
    let memes = loadMemes()
    let elSavedMemes = document.querySelector('.saved-memes')
    let savedMemeStr = ''

    gComponent = 2
    toggleComponents()

    memes.forEach((meme) => {
        let id = meme.id
        savedMemeStr += `<img src="${meme.img}"
        data-id="${id}" onclick="onEditMeme(this.dataset.id)">`
    })
    elSavedMemes.innerHTML = savedMemeStr
}

function onEditMeme(id) {
    let memes = loadMemes()
    let meme = memes.filter(meme => meme.id === id)[0]

    setSavedMemeId(id)
    setMeme(meme.meme)
    setId(meme.meme.selectedImgId)

    gComponent = 1
    toggleComponents()

    renderMeme()
}