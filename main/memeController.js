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
    let img = setImg(id)
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
    let image = new Image()
    image.src = img.url
    image.width = '100%'
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
}

function writeText(meme, txt, y, currLine) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${meme.lines[currLine].color}`
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
    console.log(diff)
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

function onLoadMemes() { // finish later
    // let memes = loadMemes()
    // let images = getGImg()
    // let memeStr = ''
    // console.log(memes)
    // let elGallery = document.querySelector('.gallery')
    // let elEditor = document.querySelector('.editor')
    // elGallery.classList.add('hidden')
    // elEditor.classList.add('hidden')

    // memes.forEach((meme) => {
    //     let memeImg = images.filter(image => meme.selectedImgId === image.id)
    //     console.log(memeImg)
    // })
}