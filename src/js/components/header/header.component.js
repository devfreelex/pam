import Component from '../../lib/component.js'
import {bindElement} from '../../directives/bind.js'

export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: document.querySelector('header-component')
        })
        this.store = store
    }


    save (e) { 
        e.preventDefault()
        const { item } = bindElement(this)

        if (item.value.length) {
            this.store.dispatch('addItem', item.value);
            item.value = '';
            item.focus();
        }
    }

    render(state, actions, mutations) {
        if(!state || !state.users) return
        return /*html*/`
            <div class="header">
                <h1 class="header__logo"> Amigo Secreto</h1>
                <p class="header__resume">
                    Cadastrados: <span class="header__tag">${state.users.length}</span> 
                </p>
            </div>
          `
    }    

}