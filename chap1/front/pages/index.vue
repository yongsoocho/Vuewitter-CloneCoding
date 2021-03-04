<template>
  <v-container>
    <post-form v-if="me" />
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
		me(){
			return this.$store.state.user.me;
		},
		mainPost(){
			return this.$store.state.post.mainPost;
		},
		hasMorePost(){
			return this.$store.state.post.hasMorePost;
		}
	},
	fetch({ store }){
		store.dispatch('post/loadPost');
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