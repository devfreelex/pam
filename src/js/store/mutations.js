export default {
    addItem(state, payload) {
      state.users.push(payload);
  
      return state;
    },
    clearItem(state, payload) {
      state.users.splice(payload.index, 1);
  
      return state;
    }
  };