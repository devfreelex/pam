# **PAM JS**

 PAM is a set of simple programming patterns combined to promote the construction of reactive web applications.

 PAM deals directly with the application interface by promoting simple es6 + code, making it easy to create components, directives, validators, data filters and any other type of component, always using vanilla javascript.

 The idea behind PAM is that it can help us write simple, clear code with no hidden black magic that enforces standards like OO, MV *, Observable, PUB / SUB and always using the minimum code possible.

With the advancements of the JavaScript language (ECMA SCRIPT), many of the dependencies required to provide browser compatibility and resource support are no longer so necessary. Therefore, PAM is written 100% using ES6 +.

> Now be careful if you develop a system to put into production, because the micro-library is still in the first stage of development and may contain unidentified bugs.

## Introdution
---

To get started with PAM, you need to know the basics of OO (OBJECT ORIENTATION). So you still have not got it, study a little more about it and come back here later.

Below we have the basic structure of an app built with PAM.

```
src
|---assets
|-----global.css
|-----reset.css
|
|---core
|---components
|-----your componts
|
|---directives
|-----your directives
|
|---services
|-----your services
|
|---helpers
|-----your helpers
|
|---validators
|-----your validators
|
|---store
|-----index
|-----state
|-----actions
|-----mutations
main.js
index.html
```
### **Get Started**
---
To begin, inside the main.js file in the project root, we will create an instance of App that will be our main application module.

Through the App class we are then defining which are the main dependencies (components, routes and data store) of the application and initializing it.

Below is the code required to initialize the application.

```
  const app = new App({
      store,
      router,
      components:{
        headerComponent,
        registerComponent,
        userComponent
      }
  })
```

Now that we know how to start the application, we need to provide the modules on which App depends to run the application. So the next step is to create the components on which App depends.

To do this, inside the components folder, we can create a folder register and inside it a file register.component.js

```
import Component from '../../lib/component.js'

export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: document.querySelector('header-component')
        })
        this.store = store
    }

    render(state, actions, mutations) {
        if(!state || !state.users) return
        return /*html*/`
            <div class="header">
                <h1 class="header__logo"> Cadastro de usuários</h1>
                <p class="header__resume">
                    Cadastrados: <span class="header__tag">${state.users.length}</span> 
                </p>
            </div>
          `
    }    

}
```

Notice that we are importing the class Component, responsible for creating an object with the basic features that a component needs to have.

Next we export a new class that, when informed as dependency for App, will be instantiated automatically.

See also, that the FORM component depends on a store instance to render components as soon as the state changes. So the next step is to create the store from which App and Component depends.

Within the src directory in the store folder create the index.js, state.js, actions.js, mutations.js, and store.js files.

The files will look like this:

**state.js**
``` 
export default {
    users: [
      {name: 'Rodrigo', email: 'rodrigo@email.com', _id:14558},
    ]
  };
```

**actions.js**
```
export default {
	updateItem(context, payload) {
		context.commit('updateItem', payload);
	},
	addItem(context, payload) {
		context.commit('addItem', payload);
	},
	clearItem(context, payload) {
		context.commit('clearItem', payload);
	}
};
```

**mutations.js**

```
export default {
	addItem(state, payload) {
		if (payload.name && payload.email) state.users.push(payload);
		return state;
	},
	updateItem(state, payload) {
		const { users } = state
		const listUsers = users.filter( user => {
			if(user._id === payload._id) {
				user.name = payload.name
				user.email = payload.email
			}
			return user
		})
		return state;
	},
	clearItem(state, payload) {
		state.users = state.users.filter(user => {
			if (parseInt(user._id) !== parseInt(payload.id)) return user
		})
		return state
	}
};
```
**index.js**
```
import Store from '../lib/store.js';
import actions from './actions.js';
import mutations from './mutations.js';
import state from './state.js';

export default new Store({
  actions,
  mutations,
  state
});
```

Note that after instantiating the Store class, we pass into it the dependencies of state.js, mutations.js, and actions.js

To finalize the data store, we need to import the index.js file containing the data store from the main.js file.

The main.js file looks like this:

```
import App from './lib/app.js'
import store from './store/index.js'; 

import headerComponent from './components/header/header.component.js';
import registerComponent from './components/register/register.component.js';
import userComponent from './components/user/user.component.js';


  const app = new App({
      store,
      components:{
        headerComponent,
        registerComponent,
        userComponent
      }
  })

```

Observe que headerComponent e userComponent foram importados e insridos na construção da instancia da classe App. Porém, os arquivos contendo esses componentes não existem ainda. Precisamos criá-los dentro da pasta componente.

Primeiro crie 2 pastas, header e user dentro do diretório components.

Dentro da pasta header crie o arquivo header.component.js e 
na pasta user o arquivo user.component.js.

Esses arquivos ficarão assim:

**header.component.js**

```
import Component from '../../lib/component.js'

export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: document.querySelector('header-component')
        })
        this.store = store
    }

    render(state, actions, mutations) {
        if(!state || !state.users) return
        return /*html*/`
            <div class="header">
                <h1 class="header__logo"> Cadastro de usuários</h1>
                <p class="header__resume">
                    Cadastrados: <span class="header__tag">${state.users.length}</span> 
                </p>
            </div>
          `
    }    

}

```

**user.component.js**

```
import Component from '../../lib/component.js'

export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: document.querySelector('header-component')
        })
        this.store = store
    }

    render(state, actions, mutations) {
        if(!state || !state.users) return
        return /*html*/`
            <div class="header">
                <h1 class="header__logo"> Cadastro de usuários</h1>
                <p class="header__resume">
                    Cadastrados: <span class="header__tag">${state.users.length}</span> 
                </p>
            </div>
          `
    }    

}
```