'use strict'

function makeId(idx) {
    return idx + 1
}

function makeLorem(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function getRandomColor(){
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}


function setParam(key, value){
    let params = new URLSearchParams(window.location.search);
    params.delete(key)
    params.append(key, value)
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function deletParam(key){
    let params = new URLSearchParams(window.location.search);
    params.delete(key)
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function getValueFromParam(key){
    let params = new URLSearchParams(window.location.search);
    return params.get(key)
}
