import Store from './store.js'
import defaultDirectives from './default.js'
export default class Component {
    constructor(props = {}) {
        this.setComponentElement(props)
        .then(data => this.setRender(data))        
        .then(data => this.setDirectives(data))
        .then(data =>  this.setStateSubscriber(data, props))
    }

    throw (message) {
        throw new Error(message)
    }

    setRender(data) {
        const { state, actions, mutations } = data.props.store
        if(!data || !data.status) this.throw('this.render is not a function or rootElement is not valid.')
        if (typeof this.render === 'function') {
            this.element.innerHTML = this.render(state, actions, mutations)
            return true
        }
        this.throw('this.render is not a function or rootElement is not valid.')
    }

    setDirectives(statusRender) {
        if(statusRender) {
            defaultDirectives.init(this) 
            return true
        }
        this.throw(`Error html directives. statusRender:${statusRender}`)
    }

    setComponentElement(props) {
        if (props.hasOwnProperty('element') && props.element !== '') { 
            this.element = document.querySelector(props.element)
            return new Promise((resolve, reject) => {
                if(this.element && this.element !== '') {
                    resolve({status: true, props})
                    return
                }
                reject({status: false, props})
            })
        }
        
    }

    setStateSubscriber(statusDirectives, props) { 
        if(!statusDirectives) {
            this.throw(`Error in data store. Uninitialized html directives. StatusDirectives:${statusDirectives}`)
        }

        if (props.store instanceof Store) {
            props.store.events.subscribe('stateChange', () => {
                const { state, actions, mutations } = props.store
                this.element.innerHTML = this.render(state, actions, mutations)
                this.setDirectives(true)
            })
        }
    }

}