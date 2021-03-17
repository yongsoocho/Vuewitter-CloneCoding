import Vue from "vue";
import throttle from "lodash.throttle";

export const state = () => ({
	mainPost: [],
	hasMorePost:true,
	imagePaths: [],
});

const totalPosts = 51;
const limit = 10;

export const mutations = {
	addMainPost(state, payload){
		state.mainPost.unshift(payload);
	},
	removeMainPost(state, payload){
		const index = state.mainPost.findIndex( v => v.id === payload.postId );
		state.mainPost.splice(index, 1);
	},
	addComment(state, payload) {
		const index = state.mainPost.findIndex( v => v.id === payload.postId );
		state.mainPost[index].Comments.unshift(payload);
	},
	loadPost(state, payload) {
		state.mainPost = state.mainPost.concat(payload);
		state.hasMorePost = payload.length === limit;
	},
	concatImagePaths(state, payload) {
		state.imagePaths = state.imagePaths.concat(payload);
	},
	removeImagePaths(state, payload) {
		state.imagePaths.splice(payload, 1);
	},
	loadComment(state, payload) {
		const index = state.mainPost.findIndex( v => v.id === payload.postId );
		state.mainPost[index].Comments = payload;
	},
	unlikePost(state, payload) {
		const index = state.mainPost.findIndex(v => v.id === payload.postId);
		const userIndex = state.mainPost[index].Likers.findIndex(v => v.id === payload.userId);
		state.mainPost[index].Likers.splice(userIndex, 1);
	},
	likePost(state, payload) {
		const index = state.mainPost.findIndex(v => v.id === payload.postId);
		state.mainPost[index].Likers.push({
			id: payload.userId
		})
	}
};

export const actions = {
	add({ commit, state }, payload) {
		this.$axios.post('https://vuewitterexpress.run.goorm.io:3085/post', {
			content:payload.content,
			image: state.imagePaths
		}, {
			withCredentials: true,
		})
		.then((res) => {
			commit('addMainPost', res.data);
		})
		.catch(() => {
			
		});
	},
	remove({ commit }, payload) {
		this.$axios.delete(`https://vuewitterexpress.run.goorm.io:3085/post/${payload.postId}`, { // none data index If delete rest
			withCredentials:true
		})
		.then(() => {
			commit('removeMainPost', payload);
		})
		.catch((error) => {
			console.log(error);
			next(error);
		})
	},
	addComment({ commit }, payload) {
		this.$axios.post(`https://vuewitterexpress.run.goorm.io:3085/post/${payload.postId}/comment`, {
			content:payload.content
		}, {
			withCredentials:true
		})
		.then((res) => {
			commit('addComment', res.data);
		})
		.catch(() => {
			
		});
	},
	loadPost: throttle(async function({ commit, state }, payload) {
		if(state.hasMorePost){
			try{
				const lastPost = state[state.mainPost.length - 1]
				const res = await this.$axios.get(`https://vuewitterexpress.run.goorm.io:3085/posts?lastId=${lastPost && lastPost.id}*limit=10`)
				commit('loadPostP', res.data);
			}catch(err){
				console.error(err);
			}
		}
	}, 3000),
	loaduserPost: throttle(async function({ commit, state }, payload) {
		if(state.hasMorePost){
			try{
				const lastPost = state[state.mainPost.length - 1]
				const res = await this.$axios.get(`/user/${payload.userId}/posts?lastId=${lastPost && lastPost.id}*limit=10`)
				commit('loadPostP', res.data);
			}catch(err){
				console.error(err);
			}
		}
	}, 3000),
	uploadImages({ commit }, payload) {
		this.$axios.post('https://vuewitterexpress.run.goorm.io:3085/post/images', payload, {
			withCredentials: true
		})
		.then(() => {
			commit('concatImagePaths', res.data);
		})
		.catch(() => {
			
		})
	},
	loadComment({ commit }, payload) {
		this.$axios.get('https://vuewitterexpress.run.goorm.io:3085/post/${payload.postId}/comment')
		.then((res) => {
			commit('loadComment', res.data);
		})
		.catch(() => {
			
		});
	},
	retweet({ commit }, payload){
		this.$axios.post(`/post/${payload.postId}/retweet`, {}, {
			withCredentials: true // logged In check
		})
		.then((res) => {
			commit('addMainPost', res.data)
		})
		.catch((err) => {
			console.error(err);
		})
	},
	likePost({ commit }, payload){
		this.$axios.post(`/post/${payload.postId}/like`, {}, {
			withCredentials: true // logged In check
		})
		.then((res) => {
			commit('likePost', {
				userId: res.data.userId,
				postId: payload.postId
			})
		})
		.catch((err) => {
			console.error(err);
		})
	},
	unlikePost({ commit }, payload){
		this.$axios.delete(`/post/${payload.postId}/like`, {
			withCredentials: true // logged In check
		})
		.then((res) => {
			commit('unlikePost', {
				userId: res.data.userId,
				postId: payload.postId
			});
		})
		.catch((err) => {
			console.error(err);
		})
	}
};