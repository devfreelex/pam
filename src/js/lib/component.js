import Store from '../store/store.js'

export default class Component {
    constructor(props = {}) {
        this.setRender(props)
        this.setStateSubscriber(props)
        this.setComponentElement(props)
    }

    setRender(props) {
        const { state, actions, mutations } = props.store
        if (typeof this.render === 'function') {
            this.templateRender = this.render.bind(this, state, actions, mutations)
            props.element.innerHTML = this.templateRender()
            return this
        }
        throw new Error('this.render is not a function and it must be.')
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
            })
        }
    }

    hasRootElement() {}

}