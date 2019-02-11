import Component from '../../lib/component.js'
import {bindElement} from '../../directives/bind.js'

export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: document.querySelector('register-component')
        })
        this.store = store
    }


    hideRegister (e) { 
        e.preventDefault()        
         const { form } = bindElement(this)
         form.classList.toggle('register--hidden')
    }

    render(state, actions, mutations) {

        return /*html*/`
                <h2 class="component__title"> 
                    <span class="component__title__tag">Cadastro</span>
                    <button class="component__toggle" click="hideRegister">Ocultar</button>
                </h2>
                <form action="" class="register__form" data-bind="form">
                    <label for="" class="register__form__label grid grid-3">
                        <span class="register__form__title">Título</span>
                        <input type="text" class="register__form--input">
                    </label>
                    <label for="" class="register__form--label grid grid-3">
                        <span class="register__form__title">Título</span>
                        <input type="text" class="register__form--input">
                    </label>
                    <div class="register__form__label grid grid-3">
                        <button class="register__button button--disabled">Salvar</button>
                    </div>
                </form>
          `
    }    

}