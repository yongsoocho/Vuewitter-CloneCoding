<template>
  <v-container>
	<v-card :style="{ marginBottom: '20px' }">
		<v-container>
			{{other.nickname}}
			<v-row>
				<v-col cols="4">{{other.Followings.length}} Followings</v-col>
				<v-col cols="4">{{other.Followers.length}} Followers</v-col>
				<v-col cols="4">{{other.Posts.length}} Postings</v-col>
			</v-row>
		</v-container>
	</v-card>
    <div>
      <post-card v-for="p in mainPost" :key="p.id" :post="p" />
    </div>
  </v-container>
</template>

<script>
	import postCard from "../components/postCard";
	import postForm from "../components/postForm";
	
export default {
	data(){
		return{
			msg:'Nuxt.js!'
		}
	},
	components:{
		postCard,
		postForm
	},
	computed:{
		other(){
			return this.$store.state.user.other;
		},
		mainPost(){
			return this.$store.state.post.mainPost;
		},
		hasMorePost(){
			return this.$store.state.post.hasMorePost;
		}
	},
	fetch({ store }, params){ //cannot this in fetch, others can be this.$route.params
		store.dispatch('user/loadOther', {
			userId: params.id
		});
		return store.dispatch('post/loadUserPosts', {
			userId: params.id
		});
	},
	methods:{
		onScroll() {
			if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
				if(this.hasMorePost) {
					this.$store.dispatch('post/loadPost');
				}
			}
		}
	},
	mounted() {
		window.addEventListener('scroll', this.onScroll);
	},
	beforeDestroy() {
		window.addEventListener('scroll', this.onScroll);
	}
	
}
</script>

<style>

</style>