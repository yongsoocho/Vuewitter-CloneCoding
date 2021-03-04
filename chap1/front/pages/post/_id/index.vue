<template>
<div>
	<v-container v-if="post">
		<post-card :post="post"></post-card>
	</v-container>
	<v-container v-else>
		<h1>
			해당 게시글이 존재하지 않습니다
		</h1>
	</v-container>
</div>
</template>

<script>
	import postCard from "~/components/postCard";
	
export default {
	components:{
		postCard,
	},
	computed:{
		post() {
			return this.$store.state.post.mainPost.find(v => v.id === parseInt(this.$route.params.id, 10))
		}
	},
	fetch(){
		
	},
	asyncData(){
		
	}
}
</script>

<style scoped>

</style>