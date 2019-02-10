import Component from '../lib/component.js'

export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: document.querySelector('.js-form')
        })
        this.store = store
    }

    events () { 
        const formElement = document.querySelector('.js-form');
        const inputElement = document.querySelector('#new-item-field');

        formElement.addEventListener('submit', evt => {
            evt.preventDefault();

            let value = inputElement.value.trim();

            if (value.length) {
                this.store.dispatch('addItem', value);
                inputElement.value = '';
                inputElement.focus();
            }

        });
    }

    alertar (e) {
        console.log(e.target.value)
    }

    render(state, actions, mutations) {
        if(this.element) {
            console.log(this.element)
            this.events()
        }

        setTimeout(() => {
            var elementx = this.element.querySelectorAll('[click]')
            elementx.forEach(element => {
                element.addEventListener('click', (e) => {
                    this[e.target.getAttribute('click')](e)
                })

            })
        }, 2000)

        return /*html*/`
            <div class="boilerform">
                <p class="teste">xxx</p>
                <!-- Form styles from the https://boilerform.design boilerplate -->
                <label for="new-item-field" class="[ new-item__label ] [ c-label ]">Add a new item</label>
                <input type="text" value="teste" click="alertar" class="[ new-item__details ] [ c-input-field ]" id="new-item-field" autocomplete="off" />
                <button class="[ c-button ] [ new-item__button ]">Save</button>
            </div>
          `
    }    

}