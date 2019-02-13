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