const init = (context) => {
    setTimeout(() => {
        const click = context.element.querySelectorAll('[click]')
        click.forEach((element, index) => {
            let elementx = click[index]
            elementx.addEventListener('click', (e) => {
                context[e.target.getAttribute('click')](e)
            })
        })

        const mouseover = context.element.querySelectorAll('[mouseover]')
        mouseover.forEach(element => {
            element.addEventListener('mouseover', (e) => {
                context[e.target.getAttribute('mouseover')](e)
            })
        })

        const mouseout = context.element.querySelectorAll('[mouseout]')
        mouseout.forEach(element => {
            element.addEventListener('mouseout', (e) => {
                context[e.target.getAttribute('mouseout')](e)
            })
        })

        const keydown = context.element.querySelectorAll('[keydown]')
        keydown.forEach(element => {
            element.addEventListener('keydown', (e) => {
                context[e.target.getAttribute('keydown')](e)
            })
        })

        const keyup = context.element.querySelectorAll('[keyup]')
        keyup.forEach(element => {
            element.addEventListener('keyup', (e) => {
                context[e.target.getAttribute('keyup')](e)
            })
        })

        const submit = context.element.querySelectorAll('[submit]')
        submit.forEach(element => {
            element.addEventListener('submit', (e) => {
                context[e.target.getAttribute('submit')](e)
            })
        })

    }, 100)
}

export default {
    init
}