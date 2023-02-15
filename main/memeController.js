'use strict'

let gElCanvas
let gCtx

function setMemeCanvas() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderMeme(gCurrImgId) {
    let meme = getMeme()
    let img = setImg(gCurrImgId)
    let txt = meme.lines[0].txt

    let image = new Image()
    image.src = img.url
    image.width = '100%'
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
    
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'black'
    gCtx.font = `${meme.lines[0].size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, 200, 20)
    gCtx.strokeText(txt, 200, 20)
}

function onLineType(txt) {
    if (gCurrImgId === undefined) return
    // console.log(txt)
    setLineTxt(txt)
    renderMeme(+gCurrImgId)
}


function resetInputs() {
    let inputs = document.querySelectorAll('input')
    console.log(inputs)
    inputs.forEach(input => input.value = '')
}
