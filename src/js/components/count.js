import Component from '../lib/component.js';

export default class Count extends Component {
  constructor(store) {
    super({
      store,
      element: document.querySelector('.js-count')
    });
    this.store = store
  }

  render(state, actions, mutations) {
    if(!state) return
      let suffix = state.items.length !== 1 ? 's' : '';
      let emoji = state.items.length > 0 ? '&#x1f64c;' : '&#x1f622;';

      return /*html*/`
      <small>You've done</small>
      ${state.items.length}
      <small>thing${suffix} today ${emoji}</small>
    `;
  }
}