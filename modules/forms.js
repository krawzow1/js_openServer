function forms() {
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
}

module.exports = forms