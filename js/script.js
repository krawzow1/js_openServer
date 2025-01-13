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
        close = document.querySelector('[data-close]'),
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
    close.addEventListener('click',closeModal)

    // Закрытие модального окна при клике вне его области
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal()
        }
    });

    // Закрытие модального окна по нажатию клавиши Esc
    window.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && modal.style.display == 'block') {
            closeModal()
            
        }
    });

    const modalTimerId = setTimeout(openModal,3000)

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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        14,
        ".menu .container",
        'menu__item',
        'www'

    ).render()

    new MenuCard(
       "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        20,
        ".menu .container"

    ).render()

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        15,
        ".menu .container"

    ).render()

    
    //Forms
    const forms = document.querySelectorAll('form')

    const message = {
        loading: 'Загрузка',
        success: 'Скоро свяжемся',
        failure: 'Ошибка...'
    }

    
    forms.forEach(item => {
        postData(item)
    })


    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            statusMessage.textContent = message.loading
            form.append(statusMessage)

            const request = new XMLHttpRequest()
            request.open('POST', 'server.php')

            // request.setRequestHeader('Content-type', 'multipart/form-data')
            const formData = new FormData(form)

            request.send(formData)

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response)
                    statusMessage.textContent = message.success
                    form.reset()
                    setTimeout(() => {
                        statusMessage.remove()
                    },2000)
                } else {
                    statusMessage.textContent = message.failure
                }
            })
        })
    }
})