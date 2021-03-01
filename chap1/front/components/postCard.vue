<template>
<v-app>
	<v-container :style="{ padding:'10px 10px', marginBottom:'20px' }">
		<v-card>
			<v-image />
			<v-card-text>
				<div>
					<h3>{{ post.User.nickname }}</h3>
					<div>{{ post.content }}</div>
				</div>
			</v-card-text>
			<v-card-action>
				<v-btn text color="orange"><v-icon>mdi-twitter-retweet</v-icon></v-btn>
				<v-btn text color="orange"><v-icon>mdi-heart-outline</v-icon></v-btn>
				<v-btn text color="orange"><v-icon>mdi-comment-outline</v-icon></v-btn>
				<v-btn text color="orange"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
			</v-card-action>
		</v-card>
	</v-container>
</v-app>
</template>

<script>
export default {
	props:{
		post:{
			type: Object,
			required: true
		}
	}
}
</script>

<style>

</style>