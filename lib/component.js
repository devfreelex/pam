import Store from './store.js'
import defaultDirectives from './default.js'
export default class Component {
    constructor(props = {}) {
        this.setComponentElement(props)
        this.setRender(props)
        this.setStateSubscriber(props)
        this.setDirectives()
    }

    setRender(props) {
        const { state, actions, mutations } = props.store
        if (typeof this.render === 'function') {
            this.element.innerHTML = this.render(state, actions, mutations)
            return this
        }
        throw new Error('this.render is not a function and it must be.')
    }

    setDirectives() { 
        defaultDirectives.init(this)
    }

    setComponentElement(props) {
        if (props.hasOwnProperty('element') && props.element !== '') {
            this.element = document.querySelector(props.element)
        }
    }

    setStateSubscriber(props) {
        if (props.store instanceof Store) {
            props.store.events.subscribe('stateChange', () => {
                const { state, actions, mutations } = props.store
                this.element.innerHTML = this.render(state, actions, mutations)
                this.setDirectives()
            })
        }
    }

}