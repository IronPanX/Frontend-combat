function test () {
    const element = document.createElement('div')
    
    element.innerHTML = '什dddd么鬼'
    
    return element;
}

document.body.appendChild(test())
