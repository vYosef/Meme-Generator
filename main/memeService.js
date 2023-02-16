'use strict'

let gCurrImgId

let gCurrLine = 0

let gSavedMemes = []

let gCurrSavedMemeId

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
            color: 'black',
            strokeColor: 'black' 
        }, 
        { 
            txt: '', 
            size: 30, 
            align: 'left', 
            color: 'black',
            strokeColor: 'black' 
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
                color: 'black',
                strokeColor: 'black'
            }, 
            { 
                txt: '', 
                size: 30, 
                align: 'left', 
                color: 'black',
                strokeColor: 'black' 
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

function setMeme(meme) {
    gMeme = meme
}

function setSavedMemeId(id) {
    gCurrSavedMemeId = id
    // console.log(gCurrSavedMemeId)
}

function setId(id) {
    gCurrImgId = id
}

function getCurrLine() {
    return gCurrLine
}

function switchLine() {
    if (gCurrLine === 1) gCurrLine -= 1
    else gCurrLine += 1
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
    if(gCurrSavedMemeId) deletePrevMeme(key)
    gSavedMemes.push({
        id: gCurrSavedMemeId || makeId(),
        meme: gMeme,
        img: gElCanvas.toDataURL()
    })
    saveToStorage(key, gSavedMemes)
}

function deletePrevMeme(key) {
    
    let prevMeme = gSavedMemes.find(meme => meme.id === gCurrSavedMemeId)
    gSavedMemes.splice(gSavedMemes.indexOf(prevMeme), 1)
    saveToStorage(key, gSavedMemes)
}

function loadMemes() {
    let memes = loadFromStorage('memes')
    return memes
}

function randomizeId(id) {
    gCurrImgId = id
}

function randomizeMeme(id) {
    console.log(id)
    gMeme = { 
        selectedImgId: id, 
        selectedLineIdx: 0, 
        lines: [ 
            { 
                txt: getRandomText(), 
                size: getRandomIntInclusive(15, 50), 
                align: 'left', 
                color: getRandomColor(),
                strokeColor: getRandomColor()
            }, 
            { 
                txt: getRandomText(), 
                size: getRandomIntInclusive(15, 50), 
                align: 'left', 
                color: getRandomColor(),
                strokeColor: getRandomColor()
            }, 
        ] 
    }
}

function getRandomText() {
    let opts = [
        '',
        'im dumb',
        'i like fallafel',
        'nice, right?',
        'one does not simply',
        'broken code, everywhere...',
        'you are funny',
        'kiss',
        'trump card',
        'aliens!',
        'weird things',
        'glasses',
        'creepy',
        'make changes to the code',
        'im tired',
        'tell me more',
    ]
    let randTxt = opts[getRandomIntInclusive(0, opts.length - 1)] 
    return randTxt
}

function callResetMeme() {
    resetMeme()
}

