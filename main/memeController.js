'use strict'

let gElCanvas
let gCtx

function setMemeCanvas() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderMeme(id) {
    let currLine = getCurrLine()
    let meme = getMeme()
    let img = setImg()
    // console.log(img)
    let currtxt = meme.lines[currLine].txt
    let prevTxt = currLine === 0 ? meme.lines[1].txt :meme.lines[0].txt
    let pos = currLine === 0 ? gElCanvas.height / 8 : gElCanvas.height / 1.1
    let prevPos = currLine === 0 ? gElCanvas.height / 1.1 : gElCanvas.height / 8
    let prevLine = currLine === 0 ? 1 : 0

    drawImage(img)

    writeText(meme, currtxt, pos, currLine)
    writeText(meme, prevTxt, prevPos, prevLine)
}

function drawImage(img) {
    // console.log(img)
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

function onLineType(txt) {
    if (gCurrImgId === undefined) return
    // console.log(gMeme)
    setLineTxt(txt)
    renderMeme(+gCurrImgId)
}

function onChangeTextColor(color) {
    // console.log(color)
    changeTextColor(color)
    // console.log(meme)
    
    renderMeme(gCurrImgId)
}

function onChangeFont(diff) {
    // console.log(diff)
    changeFont(diff)
    renderMeme(gCurrImgId)
}

function resetInput() {
    let input = document.querySelector('input')
    let currLine = getCurrLine()
    let meme = getMeme()
    input.value = meme.lines[currLine].txt
    // input.value = ''
}

function onSwitchLine() {
    switchLine()
    resetInput()
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

function onLoadMemes() { // finish later
    let memes = loadMemes()
    // console.log(memes)
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