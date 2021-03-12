<template>
<div>
	<v-container :style="{ padding:'10px 10px', marginBottom:'20px' }">
		<v-card>
			<post-images :images="post.Images || []" />
			<v-card-text>
				<div>
					<h3><NuxtLink :to="'/user/'+post.id">{{ post.User.nickname }}</NuxtLink></h3>
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
					<div :style="{ backgroundColor:'white' }">
						<v-btn dark color="red" @click="onRemovePost" :style="{ marginRight:'5px' }">Delete</v-btn>
						<v-btn dark color="orange" @click="onEditPost">Edit</v-btn>
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
	import postImages from "./postImages";
	
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
				postId: this.post.id,
			})
		},
		onEditPost(){
			
		},
		onToggleComment(){
			if(!this.commentOpened){
				this.$store.dispatch('post/loadComment', {
					postId:this.post.id
				});
			}
			this.commentOpened = !this.commentOpened;
		}
	},
	components:{
		commentForm,
		postImages
	},
	data() {
		return {
			commentOpen: false,
		}
	}
}
</script>

<style scoped>
	a {
		color: inherit;
		text-decoration: none;
	}
</style>