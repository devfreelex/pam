# **PAM JS**

 PAM is a set of simple programming patterns combined to promote the construction of reactive web applications.

 PAM deals directly with the application interface by promoting simple es6 + code, making it easy to create components, directives, validators, data filters and any other type of component, always using vanilla javascript.

 The idea behind PAM is that it can help us write simple, clear code with no hidden black magic that enforces standards like OO, MV *, Observable, PUB / SUB and always using the minimum code possible.

With the advancements of the JavaScript language (ECMA SCRIPT), many of the dependencies required to provide browser compatibility and resource support are no longer so necessary. Therefore, PAM is written 100% using ES6 +.

> Now be careful if you develop a system to put into production, because the micro-library is still in the first stage of development and may contain unidentified bugs.

## Introdution

To get started with PAM, you need to know the basics of OO (OBJECT ORIENTATION). So you still have not got it, study a little more about it and come back here later.

Below we have the basic structure of an app built with PAM.

```
lib
src
|---assets
|   |--css
|      |--global.css
|      |--reset.css
|
|---components
|   |--your componts
|
|---directives
|   |--your directives
|
|---services
|   |--your services
|
|---helpers
|   |--your helpers
|
|---validators
|   |--your validators
|
|---store
|   |--index
|   |--state
|   |--actions
|   |--mutations
|
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
import Component from '../../../lib/component.js'
import { bindElement } from '../../../lib/bind.js'
import { event } from '../../../lib/event.js'
export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: document.querySelector('register-component')
        })
        this.store = store
        this.isInvalidName
        this.isInvalidEmail
        this.bindForm = 0
        this.update()
        this.showRegister()
    }

    update() {
        event.subscribe('editUser', data => {
            const { users } = this.store.state
            const { name, email } = bindElement(this)
            const user = users.find(user => {
                if (user._id === parseInt(data.userId)) {
                    return user
                }
            })
            email.value = user.email
            name.value = user.name
            this.user = user
        })
    }

    save(e) {
        e.preventDefault()

        const { name, email } = bindElement(this)
        if (!this.hasUser()) {
            this.store.dispatch('addItem', { name: name.value, email: email.value, _id: this.idGenerator() });
            name.value = ''
            email.value = ''
            return
        }
        name.value = this.user.name
        email.value = this.user.email
        this.store.dispatch('updateItem', this.user);
        delete this.user
    }

    toggleRegister(e) {
        e.preventDefault()
        const toggleClass = 'register--hidden'
        const { form } = bindElement(this)
        if (this.bindForm < 1) {
            this.bindForm = this.bindForm + 1
            form.classList.toggle(toggleClass)
        }
        setTimeout(() => {
            this.bindForm = 0
        }, 100)

    }

    showRegister () {
        event.subscribe('editUser', () => {
            const showClass = 'register--hidden'
            const { form } = bindElement(this)
            if (this.bindForm < 1) { 
                this.bindForm = this.bindForm + 1
                if(form.classList.contains(showClass)) {
                    form.classList.remove(showClass)
                }
            }
            setTimeout(() => {
                this.bindForm = 0
            }, 100)
        })
    }
    
    setData (prop, value) {
        if(this.user && this._id !== '') {
            this.user[prop] = value
        }
    }

    nameValidate(e) {
        const { name, btnSave } = bindElement(this)
        const { value } = e.target
        const minNameLength = 3
        const inputValid = 'input--valid'
        const inputInvalid = 'input--invalid'
        this.isInvalidName = name.value.length < minNameLength

        if (this.isInvalidName === true) {
            name.classList.remove(inputValid)
            name.classList.add(inputInvalid)
            btnSave.setAttribute('disabled', true)
            this.setData('name', name.value)
            return
        }

        name.classList.remove(inputInvalid)
        name.classList.add(inputValid)
        this.setData('name', name.value)
        if (this.isInvalidEmail === false && this.isInvalidName === false) {
            btnSave.removeAttribute('disabled')
        }
    }

    emailValidate(e) {
        const { email, btnSave } = bindElement(this)
        const { value } = e.target
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        this.isInvalidEmail = reg.test(email.value) !== true

        if (this.isInvalidEmail === true) {
            email.classList.remove('input--valid')
            email.classList.add('input--invalid')
            btnSave.setAttribute('disabled', true)
            this.setData('email', email.value)
            return
        }

        email.classList.remove('input--invalid')
        email.classList.add('input--valid')
        this.setData('email', email.value)
        if (this.isInvalidEmail === false && this.isInvalidName === false) {
            btnSave.removeAttribute('disabled')
        }

    }

    idGenerator() {
        const min = Math.ceil(1);
        const max = Math.floor(60000);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    hasUser() {
        return this.user && this.user.name !== '' && this.user.email !== ''
    }

    render(state, actions, mutations) {

        return /*html*/`
                <h2 class="component__title"> 
                    <span class="component__title__tag">Cadastro</span>
                    <button class="component__toggle" click="toggleRegister">Novo</button>
                </h2>
                <form action="" class="register__form register--hidden" data-bind="form">
                    <label for="" class="register__form__label grid grid-3">
                        <span class="register__form__title">Nome</span>
                        <input type="text" class="register__form--input" keyup="nameValidate" data-bind="name">
                    </label>
                    <label for="" class="register__form--label grid grid-3">
                        <span class="register__form__title">E-mail</span>
                        <input type="email" class="register__form--input" keyup="emailValidate" data-bind="email">
                    </label>
                    <div class="register__form__label grid grid-3">
                        <button class="register__button button--disabled" click="save" data-bind="btnSave" disabled>Salvar</button>
                    </div>
                </form>
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
import actions from './actions.js';
import mutations from './mutations.js';
import state from './state.js';
import Store from '../../lib/store.js';

export default new Store({
  actions,
  mutations,
  state
})
```

Note that after instantiating the Store class, we pass into it the dependencies of state.js, mutations.js, and actions.js

To finalize the data store, we need to import the index.js file containing the data store from the main.js file.

The main.js file looks like this:

```
import App from '../lib/app.js'
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

Note that headerComponent and userComponent were imported and entered into the instance construction of the App class. However, the files containing these components do not yet exist. We need to create them inside the component folder.

First create 2 folders, header and user within the components directory.

Inside the header folder create the file header.component.js and in the user folder the file user.component.js.

These files look like this:

**header.component.js**

```
import Component from '../../../lib/component.js'

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
import Component from '../../../lib/component.js'
import { event } from '../../../lib/event.js';

export default class Form extends Component {
    constructor(store) {
        super({
            store,
            element: document.querySelector('user-component')
        })
        this.store = store
    }

    edit (e) {
        e.preventDefault()
        const {userId} = e.target.dataset
        event.publish('editUser', { userId })
    }

    remove (e) {
        e.preventDefault()
        const {userId} = e.target.dataset
        this.store.dispatch('clearItem', { id: userId })
    }

    render(state, actions, mutations) {
        if(!state || !state.users) return ''
        return /*html*/`
            <h2 class="component__title"> 
                <span class="component__title__tag">Cadastrados</span>
            </h2>
            ${state.users.map( user => {
                return /*html*/`
                    <div class="user__box grid grid-4">
                        <div class="user__container">
                            <div class="user__img">&#x1F9D1</div>
                            <div class="user__info">
                                <div class="user__name">${user.name}</div>
                                <div class="user__email">${user.email}</div>
                            </div>
                            <div class="user__controls">
                                <button class="user__button user--edit" data-user-id="${user._id}" click="edit">Editar</button>
                                <button class="user__button user--remove" data-user-id="${user._id}" click="remove">Remover</button>
                            </div>
                        </div>
                    </div>                  
                `
            }).join('')}
        `
    }
}
```

Finally, we can include main.js inside index.html through the script tag using the type property that tells the browser that what is being imported is an es6 + module and that it may possibly import other modules.

That way, the application will work properly since the browser will intelligently load all the modules.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="./src/assets/css/reset.css">
    <link rel="stylesheet" href="./src/assets/css/global.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
</head>
<body>
    <header-component class="header"></header-component>
    <register-component class="register"></register-component>
    <user-component class="user"></user-component>
    <script type="module" src="./src/main.js"></script>
</body>
</html>
```

# How everything works!?

Coming soon...