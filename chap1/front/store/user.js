export const state = () => ({
	me:null,
	followerLists: [],
	followingLists: [],
	hasMoreFollower: true,
	hasMoreFollowing: true
});

const totalFollowers = 8;
const totalFollowings = 10;
const limit = 3;

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
		state.followerLists.push(payload);
	},
	onFollowingAdd(state, payload) {
		state.followingLists.push(payload);
	},
	loadFollower(state) {
		const diff = totalFollowers - state.followerLists.length;
		const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
			id: Math.random().toString(),
			nickname: Math.floor(Math.random()*1000),
		}));
		state.followerLists = state.followerLists.concat(fakeUsers);
		state.hasMoreFollower = fakeUsers.length === limit;
	},
	loadFollowing(state) {
		const diff = totalFollowings - state.followingLists.length;
		const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
			id: Math.random().toString(),
			nickname: Math.floor(Math.random()*1000),
		}));
		state.followingLists = state.followingLists.concat(fakeUsers);
		state.hasMoreFollowing = fakeUsers.length === limit;
	},
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
	},
	loadFollower({ commit, state }, payload) {
		if(state.hasMoreFollower){
			commit('loadFollower');
		}
	},
	loadFollowing({ commit, state }, payload) {
		if(state.hasMoreFollowing){
			commit('loadFollowing');	
		}
	}
};