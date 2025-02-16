const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'},
        body: data 
    })

    return await res.json()
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

export {postData}
export {getResource}