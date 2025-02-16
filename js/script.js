document.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = require('../modules/tabs'),
            timer = require('../modules/timer'),
            modal = require('../modules/modal'),
            cards = require('../modules/cards'),
            calc = require('../modules/calc'),
            slider = require('../modules/slider'),
            forms = require('../modules/forms')
    tabs()
    timer()
    modal()
    cards()
    calc()
    slider()
    forms()
    
})