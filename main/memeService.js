'use strict'

let gCurrImgId

let gCurrLine = 0

let gSavedMemes = []

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
    {
        id: 3, 
        url: 'images/3.jpg', 
        keywords: ['puppy', 'baby']
    },
    {
        id: 4, 
        url: 'images/4.jpg', 
        keywords: ['cat', 'sleep']
    },
    {
        id: 5, 
        url: 'images/5.jpg', 
        keywords: ['puppy', 'victory']
    },
    {
        id: 6, 
        url: 'images/6.jpg', 
        keywords: ['aliens', 'weird']
    },
    {
        id: 7, 
        url: 'images/7.jpg', 
        keywords: ['baby', 'surprise']
    },
    {
        id: 8, 
        url: 'images/8.jpg', 
        keywords: ['purple', 'hat']
    },
    {
        id: 9, 
        url: 'images/9.jpg', 
        keywords: ['baby', 'scheming']
    },
    {
        id: 10, 
        url: 'images/10.jpg', 
        keywords: ['obama', 'laugh']
    },
    {
        id: 11, 
        url: 'images/11.jpg', 
        keywords: ['boxers', 'hug']
    },
    {
        id: 12, 
        url: 'images/12.jpg', 
        keywords: ['point', 'fingers']
    },
    {
        id: 13, 
        url: 'images/13.jpg', 
        keywords: ['glass', 'smug']
    },
    {
        id: 14, 
        url: 'images/14.jpg', 
        keywords: ['matrix', 'glasses']
    },
    {
        id: 15, 
        url: 'images/15.jpg', 
        keywords: ['sean bean', 'mordor']
    },
    {
        id: 16, 
        url: 'images/16.jpg', 
        keywords: ['startrek', 'amused']
    },
    {
        id: 17, 
        url: 'images/17.jpg', 
        keywords: ['putin', 'speech']
    },
    {
        id: 18, 
        url: 'images/18.jpg', 
        keywords: ['toy', 'story']
    },
];

let gMeme = { 
    selectedImgId: 2, 
    selectedLineIdx: 0, 
    lines: [ 
        { 
            txt: '', 
            size: 30, 
            align: 'left', 
            color: 'black' 
        }, 
        { 
            txt: '', 
            size: 30, 
            align: 'left', 
            color: 'black' 
        }, 
    ] 
}

function resetMeme() {
    gMeme = { 
        selectedImgId: 2, 
        selectedLineIdx: 0, 
        lines: [ 
            { 
                txt: '', 
                size: 30, 
                align: 'left', 
                color: 'black' 
            }, 
            { 
                txt: '', 
                size: 30, 
                align: 'left', 
                color: 'black' 
            }, 
        ] 
    }
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

function getCurrLine() {
    return gCurrLine
}

function switchLine(diff) {
    if (gCurrLine === 1) gCurrLine -= 1
    else gCurrLine += 1
    return gCurrLine
}

function getCurrLine() {
    return gCurrLine
}

function setLineTxt(txt) {
    gMeme.selectedImgId = gCurrImgId
    gMeme.lines[gCurrLine].txt = txt
    // console.log(gMeme)
}

function changeTextColor(color) {
    gMeme.lines[gCurrLine].color = color
}

function changeFont(diff) {
    gMeme.lines[gCurrLine].size += diff  
}

function saveMeme() {
    let key = 'memes'
    gSavedMemes.push(gMeme)
    saveToStorage(key, gSavedMemes)
}

function loadMemes() {
    let memes = loadFromStorage('memes')
    return memes
}
