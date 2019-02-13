import Component from '../../../lib/component.js'
import { bindElement } from '../../../lib/bind.js'
import { event } from '../../../lib/event.js'
export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: document.querySelector('register-component')
        })
        this.store = store
        this.isInvalidName
        this.isInvalidEmail
        this.bindForm = 0
        this.update()
        this.showRegister()
    }

    update() {
        event.subscribe('editUser', data => {
            const { users } = this.store.state
            const { name, email } = bindElement(this)
            const user = users.find(user => {
                if (user._id === parseInt(data.userId)) {
                    return user
                }
            })
            email.value = user.email
            name.value = user.name
            this.user = user
        })
    }

    save(e) {
        e.preventDefault()

        const { name, email } = bindElement(this)
        if (!this.hasUser()) {
            this.store.dispatch('addItem', { name: name.value, email: email.value, _id: this.idGenerator() });
            name.value = ''
            email.value = ''
            return
        }
        name.value = this.user.name
        email.value = this.user.email
        this.store.dispatch('updateItem', this.user);
        delete this.user
    }

    toggleRegister(e) {
        e.preventDefault()
        const toggleClass = 'register--hidden'
        const { form } = bindElement(this)
        if (this.bindForm < 1) {
            this.bindForm = this.bindForm + 1
            form.classList.toggle(toggleClass)
        }
        setTimeout(() => {
            this.bindForm = 0
        }, 100)

    }

    showRegister () {
        event.subscribe('editUser', () => {
            const showClass = 'register--hidden'
            const { form } = bindElement(this)
            if (this.bindForm < 1) { 
                this.bindForm = this.bindForm + 1
                if(form.classList.contains(showClass)) {
                    form.classList.remove(showClass)
                }
            }
            setTimeout(() => {
                this.bindForm = 0
            }, 100)
        })
    }
    
    setData (prop, value) {
        if(this.user && this._id !== '') {
            this.user[prop] = value
        }
    }

    nameValidate(e) {
        const { name, btnSave } = bindElement(this)
        const { value } = e.target
        const minNameLength = 3
        const inputValid = 'input--valid'
        const inputInvalid = 'input--invalid'
        this.isInvalidName = name.value.length < minNameLength

        if (this.isInvalidName === true) {
            name.classList.remove(inputValid)
            name.classList.add(inputInvalid)
            btnSave.setAttribute('disabled', true)
            this.setData('name', name.value)
            return
        }

        name.classList.remove(inputInvalid)
        name.classList.add(inputValid)
        this.setData('name', name.value)
        if (this.isInvalidEmail === false && this.isInvalidName === false) {
            btnSave.removeAttribute('disabled')
        }
    }

    emailValidate(e) {
        const { email, btnSave } = bindElement(this)
        const { value } = e.target
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        this.isInvalidEmail = reg.test(email.value) !== true

        if (this.isInvalidEmail === true) {
            email.classList.remove('input--valid')
            email.classList.add('input--invalid')
            btnSave.setAttribute('disabled', true)
            this.setData('email', email.value)
            return
        }

        email.classList.remove('input--invalid')
        email.classList.add('input--valid')
        this.setData('email', email.value)
        if (this.isInvalidEmail === false && this.isInvalidName === false) {
            btnSave.removeAttribute('disabled')
        }

    }

    idGenerator() {
        const min = Math.ceil(1);
        const max = Math.floor(60000);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    hasUser() {
        return this.user && this.user.name !== '' && this.user.email !== ''
    }

    render(state, actions, mutations) {

        return /*html*/`
                <h2 class="component__title"> 
                    <span class="component__title__tag">Cadastro</span>
                    <button class="component__toggle" click="toggleRegister">Novo</button>
                </h2>
                <form action="" class="register__form register--hidden" data-bind="form">
                    <label for="" class="register__form__label grid grid-3">
                        <span class="register__form__title">Nome</span>
                        <input type="text" class="register__form--input" keyup="nameValidate" data-bind="name">
                    </label>
                    <label for="" class="register__form--label grid grid-3">
                        <span class="register__form__title">E-mail</span>
                        <input type="email" class="register__form--input" keyup="emailValidate" data-bind="email">
                    </label>
                    <div class="register__form__label grid grid-3">
                        <button class="register__button button--disabled" click="save" data-bind="btnSave" disabled>Salvar</button>
                    </div>
                </form>
          `
    }

}