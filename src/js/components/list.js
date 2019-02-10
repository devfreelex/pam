import Component from '../lib/component.js'

export default class List extends Component {
    constructor(store) {
        super({
            store,
            element: document.querySelector('.js-items')
        })
        this.store = store
    }

    event() {
        setTimeout(() => {
            this.element.querySelectorAll('button').forEach((button, index) => {
                button.addEventListener('click', () => {
                    this.store.dispatch('clearItem', { index })
                })
            })
        }, 1000)
    }

    render(state, actions, mutations) {
        if(!state) return
        if (state.items.length === 0) {
            return  /*html*/`<p class="no-items">You've done nothing yet &#x1f622;</p>`;
        }

        return /*html*/`
            ${this.event()}
            <ul class="app__items">
            ${state.items.map(item => {
                    return /*html*/`<li>${item}<button aria-label="Delete this item">×</button></li>`
                }).join('')}
            </ul>
        `


    }

}