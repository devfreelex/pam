import Component from '../../lib/component.js'
import { bindElement } from '../../directives/bind.js'

export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: document.querySelector('user-component')
        })
        this.store = store
    }

    edit (e) {
        e.preventDefault()
        console.log('edit-->', e.target)
    }

    remove (e) {
        e.preventDefault()
        const {userId} = e.target.dataset
        this.store.dispatch('clearItem', { id: userId })
    }


    save(e) {
        e.preventDefault()
        const { item } = bindElement(this)

        if (item.value.length) {
            this.store.dispatch('addItem', item.value);
            item.value = '';
            item.focus();
        }
    }

    render(state, actions, mutations) {
        if(!state || !state.users) return ''
        return /*html*/`
            <h2 class="component__title"> 
                <span class="component__title__tag">Cadastrados</span>
            </h2>
            ${state.users.map( user => {
                return /*html*/`
                    <div class="user__box grid grid-4">
                        <div class="user__container">
                            <div class="user__img">&#x1F9D1</div>
                            <div class="user__info">
                                <div class="user__name">${user.name}</div>
                                <div class="user__email">${user.email}</div>
                            </div>
                            <div class="user__controls">
                                <button class="user__button user--edit" data-user-id="${user._id}" click="edit">Editar</button>
                                <button class="user__button user--remove" data-user-id="${user._id}" click="remove">Remover</button>
                            </div>
                        </div>
                    </div>                  
                `
            }).join('')}
                                                                        
        `
    }

}