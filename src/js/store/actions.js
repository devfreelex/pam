export default {
    addItem(context, payload) {
      context.commit('addItem', payload);
    },
    clearItem(context, payload) { console.log('action', payload)
      context.commit('clearItem', payload);
    }
  };