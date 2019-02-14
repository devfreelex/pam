import { bindElement } from '../../lib/bind.js'
import { event } from '../../lib/event.js'

export default (context) => {
    const { name, email } = bindElement(context)
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const classValid = 'input--valid'
    const classInvalid = 'input--invalid'

    const isValidInput = () => {
        return Promise.resolve(reg.test(email.value))
    }

    const isValidForm = () => {
        return context && context.isNameValid === true && context.isEmailValid === true
    }

    const setStatusInput = (status) => { 
        if(status === true) {
            email.classList.remove(classInvalid)
            email.classList.add(classValid)
        } else {
            email.classList.remove(classValid)
            email.classList.add(classInvalid)
        }
        
        context['isEmailValid'] = status
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