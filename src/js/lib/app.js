export default class App {
    constructor(config) {
        this.store = this.setStore(config)
        this.components = {}
        this.init(config)
    }

    init(config) {
        if(this.hasComponents(config)) { 
            this.setComponents(config)
            this.initComponents()
        }
    }

    hasComponents (config) {
        if(!config || !config.components) return false
        return Object.keys(config.components).length
    }

    setStore(config) {
        return config.store || {}
    }

    initComponents() {
        if(Array.isArray(this.components)) {
            this.components.forEach( component => {
                component.render()
            })
        }
    }

    setComponents (config) { 
        const { components } = config
        const keys = Object.keys(components)
        this.components = keys.map( comonentName => { 
            return new components[comonentName](config.store || {})
        }) || {}
    }
}