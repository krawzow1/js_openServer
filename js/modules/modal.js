// Выносим showModalBtScroll за пределы функции modal
let isModalShown = false; // Флаг для отслеживания показа модального окна

function showModalBtScroll(modalSelector, modalTimerId) {
    if (isModalShown) return; // Если модальное окно уже было показано, выходим

    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 1) {
        openModal(modalSelector, modalTimerId);
        isModalShown = true; // Устанавливаем флаг, что модальное окно было показано
        // window.removeEventListener('scroll', showModalBtScroll);
    }
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
    isModalShown = true; // Устанавливаем флаг, что модальное окно было показано
    // window.removeEventListener('scroll', showModalBtScroll); // Теперь showModalBtScroll доступна
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}



function modal(triggerSelector, modalSelector, modalTimerId) {
    const open = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    open.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    // Закрытие модального окна при клике вне его области
    modal.addEventListener("click", function(event) {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    // Закрытие модального окна по нажатию клавиши Esc
    window.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && modal.style.display == 'block') {
            closeModal(modalSelector);
        }
    });

    // Проверка, достиг ли пользователь конца страницы
    window.addEventListener("scroll", () => showModalBtScroll(modalSelector, modalTimerId));
}

export default modal;
export { openModal, closeModal };