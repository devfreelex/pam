import Component from '../lib/component.js';

export default class Status extends Component {
  constructor(store) {
    super({
      store,
      element: document.querySelector('.js-status')
    });
    this.store = store
  }

  render(state, actions, mutations) { 
    if(!status) return
    let suffix = state.items.length !== 1 ? 's' : '';
    return `${state.items.length} item${suffix}`;
  }
}