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