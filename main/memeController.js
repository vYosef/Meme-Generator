'use strict'

let gElCanvas
let gCtx

let gRatio = 1

function setMemeCanvas() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderMeme() {
    let canvas = document.querySelector('.meme-canvas')
    canvas.height = canvas.width * gRatio
    
    let meme = getMeme()
    let img = setImg()
    let font = getFont()
    let pos =  gElCanvas.height / 16
 
    drawImage(img)

    let lines = meme.lines

    lines.forEach((line, idx) => {
        pos = pos * 2
        if (idx === lines.length - 1) pos = gElCanvas.height / 1.1
        writeText(meme, line.txt, pos, idx, font)
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    let canvasSize = elContainer.offsetHeight < elContainer.offsetWidth ? elContainer.offsetHeight : elContainer.offsetWidth
    gElCanvas.width = canvasSize
    gElCanvas.height = canvasSize  
}

function drawImage(img) {
    gCtx.beginPath()
    let image = new Image()
    image.src = img.url
    image.width = '100%'
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)  
}

function writeText(meme, txt, y, currLine, font) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${meme.lines[currLine].strokeColor}`
    gCtx.fillStyle = `${meme.lines[currLine].color}`
    gCtx.font = `${meme.lines[currLine].size}px ${font}`
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

function onUpdateFont(font) {
    updateFont(font)
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
    onLoadMemes()
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

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format
  
    function onSuccess(uploadedImgUrl) {

      const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
      console.log(encodedUploadedImgUrl)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }

    doUploadImg(imgDataUrl, onSuccess)
  }
  
  function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)
  
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
      
      if (XHR.readyState !== XMLHttpRequest.DONE) return

      if (XHR.status !== 200) return console.error('Error uploading image')
      const { responseText: url } = XHR

      console.log('Got back live url:', url)
      onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
      console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL() 
    elLink.href = data 
    elLink.download = 'my-img' 
}