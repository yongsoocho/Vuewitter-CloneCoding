<template>
<div>
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
				<v-btn text color="orange" @click="onToggleComment"><v-icon>mdi-comment-outline</v-icon></v-btn>
				<v-menu offset-y>
					<template v-slot:activator="{ on }">
						<v-btn text color="orange" v-on="on"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
					</template>
					<div>
						<v-btn dark color="red" @click="onRemovePost">Delete</v-btn>
						<v-btn text color="orange" @click="onEditPost">Edit</v-btn>
					</div>
				</v-menu>
			</v-card-action>
		</v-card>
		<template v-if="commentOpen">
			<comment-form :post-id="post.id"></comment-form>
			<v-list>
				<v-list-item v-for="c in post.Comments" :key="c.id">
					<v-list-item-avatar color="teal"><span>{{ c.User.nickname[0] }}</span></v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>{{ c.User.nickname }}</v-list-item-title>
						<v-list-item-subtitle>{{ c.content }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</template>
	</v-container>
</div>
</template>

<script>
	import commentForm from "./commentForm";
	
export default {
	props:{
		post:{
			type: Object,
			required: true
		}
	},
	methods:{
		onRemovePost(){
			this.$store.dispatch('post/remove', {
				id: this.post.id
			})
		},
		onEditPost(){
			
		},
		onToggleComment(){
			this.commentOpen = !this.commentOpen;
		}
	},
	components:{
		commentForm,
	},
	data() {
		return {
			commentOpen: false,
		}
	}
}
</script>

<style>

</style>