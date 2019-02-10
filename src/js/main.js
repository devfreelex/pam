import App from './lib/app.js'
import store from './store/index.js'; 

import Count from './components/count.js';
import List from './components/list.js';
import Status from './components/status.js';
import Form from './components/form.js'

  const app = new App({
      store,
      components:{
        Count,
        List,
        Status,
        Form
      }
  })