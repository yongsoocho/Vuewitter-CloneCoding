export const state = () => ({
	me:null,
	followerLists: [],
	followingLists: [],
	hasMoreFollower: true,
	hasMoreFollowing: true,
	other: null
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
		let index = state.me.Followings.findIndex(v => v.id === payload.userId);
		state.me.Followings.splice(index, 1);
		index = state.followingLists.findIndex(v => v.id === payload.userId);
		state.followingLists.splice(index, 1);
	},
	onFollowerRemove(state, payload) {
		let index = state.me.Followers.findIndex(v => v.id === payload.userId);
		state.me.Followers.splice(index, 1);
		index = state.followerLists.findIndex(v => v.id === payload.userId);
		state.followerLists.splice(index, 1);
	},
	onFollowerAdd(state, payload) {
		state.followerLists.push(payload);
	},
	onFollowingAdd(state, payload) {
		state.followingLists.push(payload);
	},
	loadFollower(state, payload) {
		if(payload.offset === 0){
			state.followerLists = payload.data;
		}else{
			state.followerLists = state.followerLists.concat(payload.data);
		}
		state.hasMoreFollower = payload.data.length === limit;
	},
	loadFollowing(state, payload) {
		if(payload.offset === 0){
			state.followingLists = payload.data;
		}else{
			state.followingLists = state.followingLists.concat(payload.data);
		}
		state.hasMoreFollowing = payload.data.length === limit;
	},
	follow(state, payload) {
		state.me.Followings.push({ id: payload.userId })
	},
	unfollow(state, payload) {
		let index = state.me.Followings.findIndex(v => v.id === payload.userId);
		state.me.Followings.splice(index, 1);
		index = state.followingLists.findIndex(v => v.id === payload.userId);
		state.followingLists.splice(index, 1);
	},
	setOther(state, payload) {
		state.other = payload;
	}
};

export const actions = {
	loadUser({ commit }) {
		this.$axios.get('https://vuewitterexpress.run.goorm.io:3085/user', {
			withCredentials:true
		})
		.then((res) => {
			commit('setMe', res.data);
		})
		.catch((err) => {
			
		})
	},
	signUp({ commit, state }, payload) {
		this.$axios.post('https://vuewitterexpress.run.goorm.io:3085/user', {
			email: payload.email,
			nickname: payload.nickname,
			password: payload.password
		})
		.then((res) => {
			console.log(res.data);
			commit('setMe', payload);
		})
	},
	logIn({ commit }, payload) {
		this.$axios.post('https://vuewitterexpress.run.goorm.io:3085/user/login', {
			email: payload.email,
			password: payload.password
		}, {
			withCredentials: true
		}).then((res)=>{
			console.log(res.data);
			commit('setMe', payload);
		}).catch((error)=>{
			console.error(error);
		})
	},
	logOut({ commit }, payload) {
		this.$axios.post('https://vuewitterexpress.run.goorm.io:3085/user/logout', {}, {
			withCredentials:true
		})
		.then((res) => {
			commit('setMe', null);
		})
		.catch((err) => {
			console.log(err);
		})
	},
	changeNickname({ commit }, payload) {
		this.$axios.patch('/user/nickname', { nickname: payload.nickname }, {
			withCredentials:true
		})
		.then(() => {
			commit('changeNickname', payload);
		})
		.catch((err) => {
			console.error(err);
			next(err);
		});
	},
	onFollowerRemove({ commit }, payload) {
		return this.$axios.delete(`/user/${payload.userId}/follower`, {
			withCredentials:true
		})
		.then(() => {
			commit('onFollowerRemove', {
				userId: payload.userId
			});
		})
		.catch((err) => {
			console.error(err);
		});
	},
	onFollowerAdd({ commit }, payload) {
		commit('onFollowerAdd', payload);
	},
	onFollowingAdd({ commit }, payload) {
		commit('onFollowingAdd', payload);
	},
	loadFollower({ commit, state }, payload) {
		if(!(payload && payload.offset === 0) && !state.hasMoreFollower){
			return;
		}
		let offset = state.followerLists.length;
		if(payload && payload.offset === 0){
			offset = 0;
		}
		return this.$axios.get(`/user/${state.me.userId}/follower?limit=3&offset=${offset}`)
		.then(() => {
			commit('loadFollower', {
				data: res.data,
				offset: offset,
			})
		})
		.catch((err) => {
			console.error(err)
		});
	},
	loadFollowing({ commit, state }, payload) {
		if(!(payload && payload.offset === 0) && !state.hasMoreFollowing){
			return;
		}
		let offset = state.followingLists.length;
		if(payload && payload.offset === 0){
			offset = 0;
		}
		return this.$axios.get(`/user/${state.me.userId}/follower?limit=3&offset=${offset}`)
		.then(() => {
			commit('loadFollowing', {
				data: res.data,
				offset: offset,
			})
		})
		.catch((err) => {
			console.error(err)
		});
	},
	follow({ commit, state }, payload) {
		this.$axios.post(`/user/${state.me.userId}/follow`, {}, {
			withCredentials: true
		})
		.then(() => {
			commit('follow', {
				userId: payload.userId
			});
		})
		.catch((err) => {
			console.error(err);
			next(err);
		})
	},
	unFollow({ commit, state }, payload) {
		this.$axios.delete(`/user/${payload.userId}/follow`, {
			withCredentials: true
		})
		.then(() => {
			commit('unfollow', {
				userId: payload.userId
			});
		})
		.catch((err) => {
			console.error(err);
			next(err);
		})
	},
	async loadOther({ commit }, payload){
		try{
			const res = await this.$axios.get(`/user/${payload.userId}`, {
				withCredentials: true
			});
			commit('setOther', res.data)
		}catch(err){
			console.error(err);
		}
	}
};