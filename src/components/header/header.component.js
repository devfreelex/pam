import Component from '../../../lib/component.js'

export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: 'header-component'
        })
        this.store = store
    }

    render(state, actions, mutations) {
        if(!state || !state.users) return
        return /*html*/`
            <div class="header">
                <h1 class="header__logo"> Cadastro de usuários</h1>
                <p class="header__resume">
                    Cadastrados: <span class="header__tag">${state.users.length}</span> 
                </p>
            </div>
          `
    }    

}