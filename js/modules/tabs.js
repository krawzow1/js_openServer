function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    
    const tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabsContentSelector),
            tabsParent = document.querySelector(tabsParentSelector); // исправлено


    function hideTabContent() {
        tabsContent.forEach( i => {
            i.style.display = 'none'
        })
        
        tabs.forEach( i => {
            i.classList.remove(activeClass)
        })
    }

    function showTabContent(el = 0) {
        // tabs[el].hidden = false
        tabsContent[el].style.display = 'block'
        tabs[el].classList.add(activeClass)
    }
    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click', (event) => {
        const target = event.target
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((el, i) => {
                if (target == el) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })
}

export default tabs