function modal() {
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
}

module.exports = modal