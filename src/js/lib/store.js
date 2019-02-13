import PubSub from './pubsub.js'

export default class Store {
    constructor (params) {
        this.actions = this.setActions(params)
        this.mutations = this.setMutations(params)
        this.state = this.setState(params)
        this.status = {}
        this.events = new PubSub()
    }

    setActions (params) {
        return params.actions || {}
    }

    setMutations (params) {
        return params.mutations || {}
    }

    setState(params) { 
        return new Proxy((params.state || {}), {
            set: (state, key, value) => {

                state[key] = value
                console.log(`stateChange: ${key}: ${value}`)
                this.events.publish('stateChange', this.state)

                if(this.status !== 'mutation') {
                    console.warn(`You should use a mutation to set ${key}`)
                }

                this.status = 'resting'
                return true
            }
        }) || {}
    }

    dispatch(actionKey, payload) { 
        if(!payload) return
        if(typeof this.actions[actionKey] !== 'function') { 
            console.error(`Action ${actionKey} doesn't exist.`)
            return false
        }

        console.groupCollapsed(`ACTION: ${actionKey}`)
        this.status = 'action'
        this.actions[actionKey](this, payload)
        console.groupEnd()

        return true
    }

    commit(mutationKey, payload) {

        if(typeof this.mutations[mutationKey] !== 'function') {
            console.log(`Mutation "${mutationKey}" doesn't exist`)
            return false
        }

        this.status = 'mutation'

        let newState = this.mutations[mutationKey](this.state, payload)
        this.state = Object.assign(this.state, newState)
        return true
    }
}