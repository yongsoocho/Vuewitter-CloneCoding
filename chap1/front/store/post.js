export const state = () => ({
	mainPost: [],
})

export const mutations = {
	addMainPost(state, payload){
		state.mainPost.unshift(payload)
	},
	removeMainPost(state, payload){
		const index = state.mainPost.findIndex( v => v.id === payload.id );
		state.mainPost.splice(index, 1);
	}
}

export const actions = {
	add({ commit }, payload) {
		commit('addMainPost', payload);
	},
	remove({ commit }, payload) {
		commit('removeMainPost', payload);
	}
}