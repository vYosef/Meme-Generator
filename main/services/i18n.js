var gTrans = {
    Gallery: {
        en: 'Gallery',
        he: 'גלריה'
    },
    Memes: {
        en: 'Memes',
        he: 'ממים'
    },
    About: {
        en: 'About',
        he: 'מידע'
    },
    ImageGallery: {
        en: 'Image Gallery',
        he: 'גלריית תמונות'
    },
    imFlexible: {
        en: 'im flexible',
        he: 'אני גמיש'
    },
    imageSort: {
        en: 'image sort:',
        he: 'מיין תמונות:'
    },
    memeEditor: {
        en: 'Meme Editor',
        he: 'עריכת ממים'
    },
    enterText: {
        en: 'enter text:',
        he: 'טקסט:'
    },
    changeFont: {
        en: 'change font family:',
        he: 'סוג טקסט:'
    },
    currLine: {
        en: 'current line:',
        he: 'קו:'
    },
    textColor: {
        en: 'change text color',
        he: 'שנה את צבע הטקסט'
    },
    textOutline: {
        en: 'change text outline',
        he: 'שנה את צבע גבול הטקסט'
    },
    fontGrow: {
        en: 'increase font',
        he: 'הגדל גופן'
    },
    fontShrink: {
        en: 'decrease font',
        he: 'הקטן גופן'
    },
    switchLine: {
        en: 'switch line',
        he: 'החלף קו'
    },
    save: {
        en: 'save',
        he: 'שמור'
    },
    upload: {
        en: 'upload to facebook',
        he: 'העלאה לפייסבוק'
    },
    download: {
        en: 'Download',
        he: 'הורדה'
    },
    savedMemesTiltle: {
        en: 'Your Memes:',
        he: 'הממים שלך:'
    },
    footer: {
        en: 'created by Yosef Balter:',
        he: 'נכתב ע"י יוסף בלטר'
    },
}

var gCurrLang = 'en'

function getTrans(transKey) {
    // DONE: if key is unknown return 'UNKNOWN'
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'
    // DONE: get from gTrans
    let translation = transMap[gCurrLang]
    // DONE: If translation not found - use english
    if (!translation) translation = transMap.en
    return translation
}

function doTrans() {
    // DONE: 
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)
        if (el.placeholder) el.placeholder = translation
        else el.innerText = translation

        // const prop = el.placeholder ? 'placeholder': 'innerText'
        // el[prop] = translation


        // for each el:
        // get the data-trans and use getTrans to replace the innerText 
        // ITP: support placeholder    
    })
}

function setLang(lang) {
    gCurrLang = lang
}

function formatNumSimple(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}

function formatDate(time) {

    const options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }

    return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

// Kilometers to Miles
function kmToMiles(km) {
    return km / 1.609
}

// Kilograms to Pounds:
function kgToLbs(kg) {
    return kg * 2.20462262185
}


function getPastRelativeFrom(ts) {
    const diff = Date.now() - new Date(ts)
    const seconds = diff / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24

    const formatter = new Intl.RelativeTimeFormat('en-US', {
        numeric: 'auto'
    })
    if (seconds <= 60) return formatter.format(-seconds, 'seconds')
    if (minutes <= 60) return formatter.format(-minutes, 'minutes')
    if (hours <= 24) return formatter.format(-hours, 'hours')
    return formatter.format(-days, 'days')
}
