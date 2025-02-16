function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector)
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
    if (modalTimerId){
        clearInterval(modalTimerId)
        
    }
    window.removeEventListener('scroll', showModalBtScroll)
    
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector)
    modal.style.display = 'none'
    document.body.style.overflow = 'auto'
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const open = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector)

    open.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId))
    })

    // Закрытие модального окна при клике вне его области
    modal.addEventListener("click", function(event) {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector)
        }
    });

    // Закрытие модального окна по нажатию клавиши Esc
    window.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && modal.style.display == 'block') {
            closeModal(modalSelector)
            
        }
    });

    

    function showModalBtScroll() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        // Если пользователь достиг конца страницы, показываем модальное окно
        if (scrollPosition >= pageHeight -1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalBtScroll)
        }
    }

    // Проверка, достиг ли пользователь конца страницы
    window.addEventListener("scroll",showModalBtScroll);
}

export default modal
export {openModal, closeModal}