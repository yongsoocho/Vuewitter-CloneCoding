export const state = () => ({
	
})

export const mutations = {
	
}

export const actions = {
	nuxtServerInit({ commit, dispatch, state }, { req }) {
		return dispatch('user/loadUser'); //promise = dispatch 는 return 웬만하면 붙이자!
	}
}