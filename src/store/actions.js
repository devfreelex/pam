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