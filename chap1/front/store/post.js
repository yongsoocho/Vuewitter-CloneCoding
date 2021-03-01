export const state = () => ({
	mainPost: [],
})

export const mutations = {
	addMainPost(state, payload){
		state.mainPost.unshift(payload)
	}
}

export const actions = {
	add({ commit }, payload) {
		commit('post/addMainPost', payload);
	}
}