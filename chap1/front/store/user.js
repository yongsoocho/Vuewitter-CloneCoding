export const state = () => ({
	me:null,
	followerLists: [
		{nickname:'pgh',id:1}, 
		{nickname:'kms',id:2}, 
		{nickname:'lgm',id:3}, 
		{nickname:'lgh',id:4},
		{nickname:'hic',id:5}, 
		{nickname:'zsg',id:6},
	],
	followingLists: [
		{nickname:'zsg',id:6},
		{nickname:'hic',id:5}, 
		{nickname:'lgh',id:4},
		{nickname:'lgm',id:3}, 
		{nickname:'kms',id:2}, 
		{nickname:'pgh',id:1}, 
	],
});

export const mutations = {
	setMe(state, payload) {
		state.me = payload;
	},
	changeNickname(state, payload) {
		state.me.nickname = payload.nickname;
	},
	onFollowingRemove(state, payload) {
		const index = state.followingLists.findIndex(v => v.id === payload.id);
		state.followingLists.splice(index, 1);
	},
	onFollowerRemove(state, payload) {
		const index = state.followerLists.findIndex(v => v.id === payload.id);
		state.followerLists.splice(index, 1);
	},
	onFollowerAdd(state, payload) {
		state.followerLists.push(payload)
	},
	onFollowingAdd(state, payload) {
		state.followingLists.push(payload)
	}
};

export const actions = {
	signUp({ commit, state }, payload) {
		commit('setMe', payload);
	},
	logIn({ commit }, payload) {
		commit('setMe', payload);
	},
	logOut({ commit }, payload) {
		commit('setMe', null);
	},
	changeNickname({ commit }, payload) {
		commit('changeNickname', payload);
	},
	onFollowingRemove({ commit }, payload) {
		commit('onFollowingRemove', payload);
	},
	onFollowerRemove({ commit }, payload) {
		commit('onFollowerRemove', payload);
	},
	onFollowerAdd({ commit }, payload) {
		commit('onFollowerAdd', payload);
	},
	onFollowingAdd({ commit }, payload) {
		commit('onFollowingAdd', payload);
	}
};