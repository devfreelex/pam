export default {
    addItem(state, payload) {
      if(payload.name && payload.email) state.users.push(payload);
  
      return state;
    },
    clearItem(state, payload) {
      state.users = state.users.filter( user => {
        console.log(parseInt(user._id) !== parseInt(payload.id))
        if(parseInt(user._id) !== parseInt(payload.id)) return user
      })
  
      return state
    }
  };