<template>
<div>
	<post-form v-if="me"></post-form>
	<div>
		<post-card></post-card>
		<post-card></post-card>
		<post-card></post-card>
		<post-card></post-card>
	</div>
</div>
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
		}
	}
}
</script>

<style>

</style>