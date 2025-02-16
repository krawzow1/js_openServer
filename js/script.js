import tabs from './modules/tabs'
import timer from './modules/timer'
import modal from './modules/modal'
import cards from './modules/cards'
import calc from './modules/calc'
import slider from './modules/slider'
import forms from './modules/forms'
import {openModal} from './modules/modal'
document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId),6000)

    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active')
    timer('.timer','2025-03-20')
    modal('[data-modal]','.modal', modalTimerId)
    cards()
    calc()
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    })
    forms('form', modalTimerId)

    
})