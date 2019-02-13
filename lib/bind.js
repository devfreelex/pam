
export const bindElement = (context) => {
    const dataBind = {}
    const elements = context.element.querySelectorAll('[data-bind]')
    elements.forEach( element => {
        const bindProperty = element.getAttribute('data-bind')
        dataBind[bindProperty] = element
        dataBind[bindProperty]['value'] = element.value
    })

    return dataBind
}


