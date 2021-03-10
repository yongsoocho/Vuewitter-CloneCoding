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
		const index = state.mainPost.findIndex( v => v.id === payload.id );
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
	}
};

export const actions = {
	add({ commit }, payload) {
		this.$axios.post('https://vuewitterexpress.run.goorm.io:3085/post', {
			content:payload.content,
			imagePaths: state.imagePaths
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
		commit('removeMainPost', payload);
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
	loadPost({ commit, state }, payload) {
		if(state.hasMorePost){
			this.$axios.get(`https://vuewitterexpress.run.goorm.io:3085/posts?offset=${state.mainPost.length}*limit=10`,{
				// data
			}, {
				withCredentials:true
			})
			.then((res) => {
				commit('loadPost');
			})
			.catch((error) => {
				console.log(error);
				next(error);
			});
		}
	},
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
	}
};