<template>
<div>
	<post-images :images="post.Images || []" />
			<v-card-title>
				<h3><NuxtLink :to="'/user/'+post.User.id">{{ post.User.nickname }}</NuxtLink></h3>
				<v-btn v-if="canFollow" @click="onFollow"></v-btn>
				<v-btn v-if="canUnFollow" @click="onUnFollow"></v-btn>
			</v-card-title>
			<v-card-text>
				<div>
					<div>{{ post.content }}</div>
				</div>
			</v-card-text>
</div>
</template>

<script>
	import postImages from "./postImages";
	
export default {
	components:{
		postImages
	},
	props:{
		post:{
			type: Object
		}
	},
	computed: {
		me() {
			return this.$store.state.user.me;
		},
		canFollow() {
			return 	this.me && this.post.User.id !== this.me.id && !this.me.Followings.find(v => v.id === this.User.id);
		},
		canUnFollow() {
			return 	this.me && this.post.User.id !== this.me.id && this.me.Followings.find(v => v.id === this.User.id);
		}
	},
	methods:{
		onFollow() {
			this.$store.dispatch('user/follow', {
				userId: this.post.User.id
			})
		},
		onUnFollow() {
			this.$store.dispatch('user/unfollow', {
				userId: this.post.User.id
			})
		}
	}
}
</script>

<style scoped>
	a{
		text-decoration: none;
		color:inherit;
	}

</style>