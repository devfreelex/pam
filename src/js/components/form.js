import Component from '../lib/component.js'
import {bindElement} from '../directives/bind.js'

export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: document.querySelector('.js-form')
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

        return /*html*/`
            <div class="boilerform">
                <!-- Form styles from the https://boilerform.design boilerplate -->
                <label for="new-item-field" class="[ new-item__label ] [ c-label ]">Add a new item</label>
                <input type="text" data-bind="item" class="[ new-item__details ] [ c-input-field ]" id="new-item-field" autocomplete="off" />
                <button click="save" class="[ c-button ] [ new-item__button ]">Save</button>
            </div>
          `
    }    

}