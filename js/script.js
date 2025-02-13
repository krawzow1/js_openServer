document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items'); // исправлено


    function hideTabContent() {
        tabsContent.forEach( i => {
            i.style.display = 'none'
        })
        
        tabs.forEach( i => {
            i.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(el = 0) {
        // tabs[el].hidden = false
        tabsContent[el].style.display = 'block'
        tabs[el].classList.add('tabheader__item_active')
    }
    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click', (event) => {
        const target = event.target
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((el, i) => {
                if (target == el) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })


    // Timer

    const deadline = '2025-01-15'

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / 1000 * 60 * 60) % 24),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60)

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(time) {
        if (time>=0 && time <10) {
            return `0${time}`
        } else if (time<0) {
            return 0
        }
        else {
            return time
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock,1000)        

        updateClock()
        function updateClock() {
            const t = getTimeRemaining(endtime)

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval)
            } 
        }

    }

    setClock('.timer', deadline)
    // console.log(getTimeRemaining(deadline))


    //Modal

    const open = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal')
    
    function openModal() {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimerId)
        window.removeEventListener('scroll', showModalBtScroll)
    }

    open.forEach(item => {
        item.addEventListener('click', () => {
            openModal()
        });
    });

    function closeModal() {
        modal.style.display = 'none'
        document.body.style.overflow = 'auto'
    }

    // Закрытие модального окна при клике вне его области
    modal.addEventListener("click", function(event) {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal()
        }
    });

    // Закрытие модального окна по нажатию клавиши Esc
    window.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && modal.style.display == 'block') {
            closeModal()
            
        }
    });

    const modalTimerId = setTimeout(openModal,30000)

    function showModalBtScroll() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        // Если пользователь достиг конца страницы, показываем модальное окно
        if (scrollPosition >= pageHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalBtScroll)
        }
    }

    // Проверка, достиг ли пользователь конца страницы
    window.addEventListener("scroll",showModalBtScroll);
    


    //Классы для карточек--------------------------------->
    class MenuCard {
        constructor(src,alt,title,descr,price, parentSelector, ...classes) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.classes = classes
            this.parent = document.querySelector(parentSelector)
            this.transfer = 100
            this.changeToRub()
        }

        changeToRub() {
            this.price = this.price * this.transfer
        }

        render() {
            const element = document.createElement('div')
            if (this.classes.length == 0) {
                this.element = 'menu__item'
                element.classList.add(this.element)
            } else {
                this.classes.forEach(className => element.classList.add(className))
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>

            `
            this.parent.append(element)
        }
    }


    const getResource = async (url) => {
        const res = await fetch(url)
        
        if (!res.ok) {
            throw new Error(`fetch ошибка ${url}, status ${res.status}`)
        }

        return await res.json()
    }

    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
    //     })
    // })
    
    //подключена библиотека axios в index.html
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
            })
        })

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     14,
    //     ".menu .container",
    //     'menu__item',
    //     'www'

    // ).render()

    // new MenuCard(
    //    "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     20,
    //     ".menu .container"

    // ).render()

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     15,
    //     ".menu .container"

    // ).render()

    
    //Forms
    const forms = document.querySelectorAll('form')

    const message = {
        loading: 'img/form/005 spinner.svg',
        success: 'Скоро свяжемся',
        failure: 'Ошибка...'
    }

    
    forms.forEach(item => {
        bindpostData(item)
    })

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'},
            body: data 
        })

        return await res.json()
    }

    function bindpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const statusMessage = document.createElement('img')
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
                display: block; // исправлено
                margin: 0 auto;
            `
            // form.append(statusMessage)
            form.insertAdjacentElement('afterend', statusMessage)


            const formData = new FormData(form)
            
            //преобр данные в объект
            // const object = {}
            // formData.forEach(function(value,key){
            //     object[key] = value
            // })

            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            // //переводим объект в JSON формат

            // fetch('server.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-type': 'application/json'},
            //     body: JSON.stringify(object) 
            // })
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data)
                showThanksModal(message.success)
                
                statusMessage.remove()
            }).catch(() => {
                showThanksModal(message.failure)
            }).finally(() => {
                form.reset()
            })

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response)
            //         showThanksModal(message.success)
            //         form.reset()
            //         statusMessage.remove()
            //     } else {
            //         showThanksModal(message.failure)
            //     }
            // })
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')

        prevModalDialog.style.display = 'none'
        openModal()

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
        `

        document.querySelector('.modal').append(thanksModal)
        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.style.display = 'block'
            closeModal()
        }, 2000)
    }


    //slider
    
    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width

    let slideIndex = 1
    let offset = 0

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = `${slides.length}`
        current.textContent = `${slideIndex}`

    }

    slidesField.style.width = 100 * slides.length + '%'
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow = 'hidden'
    slides.forEach(slide => {
        slide.style.width = width
    })

    slider.style.position = 'relative'

    const indicators = document.createElement('ol'),
        dots = []
    indicators.classList.add('carousel-indicators')

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `

    slider.append(indicators)

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li')
        dot.setAttribute('data-slide-to', i+1)
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;`

            if (i==0) {
                dot.style.opacity = 1
            }
            indicators.append(dot)
            dots.push(dot)
    }

    function noDigits(n) {
        return +n.replace(/\D/g, '')
    }

    next.addEventListener('click', () => {
        if (offset == noDigits(width) * (slides.length - 1)) {
            offset = 0
        } else {
            offset += noDigits(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == slides.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }

        if (slides.length < 10 ) {
            current.textContent = `0${slideIndex}`
        } else {
             current.textContent = `${slideIndex}`
        }

        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = 1
    })

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = noDigits(width) * (slides.length - 1)
        } else {
            offset -= noDigits(width) 
        }

        slidesField.style.transform = `translateX(-${offset}px)`


        if (slideIndex == 1) {
            slideIndex = slides.length
        } else {
            slideIndex--
        }

        if (slides.length < 10 ) {
            current.textContent = `0${slideIndex}`
        } else {
             current.textContent = `${slideIndex}`
        }

        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = 1

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to')
                
                slideIndex = slideTo
                offset = noDigits(width) * (slideTo - 1)
                slidesField.style.transform = `translateX(-${offset}px)`



                if (slides.length < 10 ) {
                    current.textContent = `0${slideIndex}`
                } else {
                     current.textContent = `${slideIndex}`
                }

                dots.forEach(dot => dot.style.opacity = '.5')
                dots[slideIndex - 1].style.opacity = 1
            })
        })
    })




    // Простой слайдер
    // showSlides(slideIndex)

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`
    // } else {
    //     total.textContent = `${slides.length}`
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length
    //     }

    //     slides.forEach(item => item.style.display = 'none')

    //     slides[slideIndex - 1].style.display = 'block'

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`
    //     } else {
    //         current.textContent = `${slideIndex}`
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n)
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1)
    // })
    // next.addEventListener('click', () => {
    //     plusSlides(1)
    // })
    


    // Работа с localStorage
    // localStorage.setItem('count', 1)
    // console.log(localStorage.getItem('count'))

    // const textInput = document.querySelector('#weight')
    // const localSave = localStorage.getItem('userTextInput')

    // if (localSave) {
    //     textInput.value = localSave
    // }

    // textInput.addEventListener('input', () => {
    //     localStorage.setItem('userTextInput', textInput.value)
    // })
    // console.log(document.querySelector('.calculating__choose-item'))
    


    //Калькулятор
    const result = document.querySelector('.calculating__result span')
    let sex, height, weight, age, ratio;
    
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female'
        localStorage.setItem('sex', sex)
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375
        localStorage.setItem('ratio', ratio)
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector)

        elements.forEach(element => {
            element.classList.remove(activeClass)
            if (element.getAttribute('id') === localStorage.getItem('sex')) {
                element.classList.add(activeClass)
            }
            if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeClass)
            }
        })

    }

    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')
    initLocalSettings('#gender div', 'calculating__choose-item_active')

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '___'
            return
        }
        
        if (sex === 'female') {
            result.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio)
        } else {
            result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio)
        }
    }

    calcTotal()

    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector)

        elements.forEach(element => {
            element.addEventListener('click', (event) => {
                if (event.target.dataset.ratio) {
                    ratio = +event.target.dataset.ratio
                    localStorage.setItem('ratio', ratio)
                }
                else {
                    sex = event.target.getAttribute('id')
                    localStorage.setItem('sex', sex)
                }
    
                elements.forEach(element => {
                    element.classList.remove(activeClass)
                })
                
                event.target.classList.add(activeClass)
    
                calcTotal()
            })
        }) 
    }
    
    getStaticInfo('#gender div', 'calculating__choose-item_active')
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active')

    function getDynamicInfo(parentSelector) {
        const input = document.querySelector(parentSelector)
        

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'
            } else {
                input.style.border = 'none'
            }

            switch (input.getAttribute('id')) { 
                case 'height':
                    height = +input.value
                    break
                case 'weight':
                    weight = +input.value
                    break
                case 'age':
                    age = +input.value
                    break
            }
            calcTotal()
        })
        

       
    }
    
    getDynamicInfo('#height')
    getDynamicInfo('#weight')
    getDynamicInfo('#age')  
})