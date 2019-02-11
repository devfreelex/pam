import Component from '../../lib/component.js'
import {bindElement} from '../../directives/bind.js'

export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: document.querySelector('register-component')
        })
        this.store = store
        this.isInvalidName
        this.isInvalidEmail
    }


    hideRegister (e) { 
        e.preventDefault()        
         const { form } = bindElement(this)
         form.classList.toggle('register--hidden')
    }

    nameValidate (e) {
        const { name, btnSave } = bindElement(this)
        const {value} = e.target
        const minNameLength = 3
        this.isInvalidName = name.value.length < minNameLength
        
        if(this.isInvalidName === true) {
            name.classList.remove('input--valid')
            name.classList.add('input--invalid')
            btnSave.setAttribute('disabled', true)
            return
        }

        name.classList.remove('input--invalid')
        name.classList.add('input--valid')  
        if(this.isInvalidEmail === false && this.isInvalidName === false) {
            btnSave.removeAttribute('disabled')  
        }
    }

    emailValidate (e) {
        const { email, btnSave } = bindElement(this)
        const {value} = e.target
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        this.isInvalidEmail = reg.test(email.value) !== true 

        if(this.isInvalidEmail === true) {
            email.classList.remove('input--valid')
            email.classList.add('input--invalid')
            btnSave.setAttribute('disabled', true)
            return
        }

        email.classList.remove('input--invalid')
        email.classList.add('input--valid')
        if(this.isInvalidEmail === false && this.isInvalidName === false) {
            btnSave.removeAttribute('disabled')  
        }
        
    }

    save (e) { 
        e.preventDefault()
        const { name, email } = bindElement(this)
        this.store.dispatch('addItem', {name: name.value, email: email.value});
    }

    render(state, actions, mutations) {

        return /*html*/`
                <h2 class="component__title"> 
                    <span class="component__title__tag">Cadastro</span>
                    <button class="component__toggle" click="hideRegister">Ocultar</button>
                </h2>
                <form action="" class="register__form" data-bind="form">
                    <label for="" class="register__form__label grid grid-3">
                        <span class="register__form__title">Nome</span>
                        <input type="text" class="register__form--input" keyup="nameValidate" data-bind="name">
                    </label>
                    <label for="" class="register__form--label grid grid-3">
                        <span class="register__form__title">E-mail</span>
                        <input type="text" class="register__form--input" keyup="emailValidate" data-bind="email">
                    </label>
                    <div class="register__form__label grid grid-3">
                        <button class="register__button button--disabled" click="save" data-bind="btnSave" disabled>Salvar</button>
                    </div>
                </form>
          `
    }    

}