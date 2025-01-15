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
})