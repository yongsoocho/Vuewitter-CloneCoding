export const state = () => ({
	mainPost: [
		{
			content: 123,
			User:{
				nickname:123
			},
			Comments:[],
			Images:[],
			id: 1,
			createdAt: Date.now()
		},
	],
	hasMorePost:true,
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
		const diff = totalPosts - state.mainPost.length;
		const fakePosts = Array(diff > limit ? limit : diff).fill().map(v => ({
			id:Math.random().toString(),
			User:{
				id:1,
				nickname:'ygr'
			},
			content:`Hello infinite scrolling ${Math.random()}`,
			Comments:[],
			Images:[]
		}));
		state.mainPost = state.mainPost.concat(fakePosts);
		state.hasMorePost = fakePosts.length === limit;
	}
};

export const actions = {
	add({ commit }, payload) {
		commit('addMainPost', payload);
	},
	remove({ commit }, payload) {
		commit('removeMainPost', payload);
	},
	addComment({ commit }, payload) {
		commit('addComment', payload);
	},
	loadPost({ commit, state }, payload) {
		if(state.hasMorePost){
			commit('loadPost');
		}
	}
};