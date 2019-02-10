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

    render(state, actions, mutations) {

        setTimeout(()=> {
            this.events()
        },1000)

        return /*html*/`
            <div class="boilerform">
                <!-- Form styles from the https://boilerform.design boilerplate -->
                <label for="new-item-field" class="[ new-item__label ] [ c-label ]">Add a new item</label>
                <input type="text" class="[ new-item__details ] [ c-input-field ]" id="new-item-field" autocomplete="off" />
                <button class="[ c-button ] [ new-item__button ]">Save</button>
            </div>
          `
    }    

}