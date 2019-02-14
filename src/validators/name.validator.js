import { bindElement } from '../../lib/bind.js'
import { event } from '../../lib/event.js'

export default (context) => {
    const { name, email } = bindElement(context)
    const minLength = 3
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const classValid = 'input--valid'
    const classInvalid = 'input--invalid'

    const isValidInput = () => {
        return Promise.resolve(name.value.length >= minLength)
    }

    const isValidForm = () => {
        return context && context.isNameValid === true && context.isEmailValid === true
    }

    const setStatusInput = (status) => { 
        if(status === true) {
            name.classList.remove(classInvalid)
            name.classList.add(classValid)
        } else {
            name.classList.remove(classValid)
            name.classList.add(classInvalid)
        }
        
        context['isNameValid'] = status
    }

    const setStatusForm = (status) => {
        context['isFormValid'] = status
        event.publish('onFormChange', {status})
    }

    return {
        isValidInput, 
        setStatusInput,
        isValidForm,
        setStatusForm
    }
}