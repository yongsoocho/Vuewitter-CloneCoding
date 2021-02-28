<template>
<div>
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
	
export default {
	data(){
		return{
			msg:'Nuxt.js!'
		}
	},
	components:{
		postCard,
	}
}
</script>

<style>

</style>