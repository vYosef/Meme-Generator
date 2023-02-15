'use strict'

let gCurrImgId

let gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

let gImgs = [
    {
        id: 1, 
        url: 'images/1.jpg', 
        keywords: ['trump', 'president']
    },
    {
        id: 2, 
        url: 'images/2.jpg', 
        keywords: ['puppy', 'dog']
    },
];

let gMeme = { 
    selectedImgId: 2, 
    selectedLineIdx: 0, 
    lines: [ 
        { 
            txt: '', 
            size: 20, 
            align: 'left', 
            color: 'red' 
        } 
    ] 
}

function getMeme() {
    return gMeme
}

function getGImg() {
    return gImgs
}

function setImg() {

    let img = gImgs.filter(img => img.id === gCurrImgId)
    return img[0]
}

function setLineTxt(txt) {
    gMeme.selectedImgId = gCurrImgId
    gMeme.lines[0].txt = txt
    // console.log(gMeme)
}