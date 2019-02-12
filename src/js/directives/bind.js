
export const bindElement = (context) => { console.log('called')
    const dataBind = {}
    const elements = context.element.querySelectorAll('[data-bind]')
    elements.forEach( element => {
        const bindProperty = element.getAttribute('data-bind')
        dataBind[bindProperty] = element
        dataBind[bindProperty]['value'] = element.value
    })

    return dataBind
}

const elementBind =  (context) => {
    const elementBind = {}
    const { elements } = context
    
    elements.forEach( element => {
        elementBind = element.getAttribute('data-bind')
    })

    return {}
}
