function tabs() {
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
}

module.exports = tabs