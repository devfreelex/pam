import Store from '../store/store.js'
import defaultDirectives from './default.js'
export default class Component {
    constructor(props = {}) {
        this.setRender(props)
        this.setStateSubscriber(props)
        this.setComponentElement(props)
        this.setDirectives()
    }

    setRender(props) {
        const { state, actions, mutations } = props.store
        if (typeof this.render === 'function') {
            props.element.innerHTML = this.render(state, actions, mutations)
            return this
        }
        throw new Error('this.render is not a function and it must be.')
    }

    setDirectives() { 
        defaultDirectives.init(this)
    }

    setComponentElement(props) {
        if (props.hasOwnProperty('element')) {
            this.element = props.element
            return
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