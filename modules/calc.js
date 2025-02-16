function calc() {
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
}

module.exports = calc