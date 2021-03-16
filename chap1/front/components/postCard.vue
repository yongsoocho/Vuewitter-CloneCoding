<template>
<div>
	<v-container :style="{ padding:'10px 10px', marginBottom:'20px' }">
		<v-card>
			<div v-if="post.RetweetId && post.Retweet">
				<v-subheader>{{post.User.nickname}}</v-subheader>
				<v-card style="margin: 0px 20px">
					<post-content :post="post.Retweet" />
				</v-card>
			</div>
			<post-content v-else :post="post" />
			<v-card-action>
				<v-btn text color="orange" @click="onRetweet"><v-icon>mdi-twitter-retweet</v-icon></v-btn>
				<v-btn text color="orange" @click="onClickHeart"><v-icon>{{heartIcon}}</v-icon></v-btn>
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
	import postContent from "./postContent";
	
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
		},
		onClickHeart(){
			if(!this.me){
				return alert('Logged In please');
			}
			if(this.liked){
				return this.$store.dispatch('post/unlikePost', {
					postId: this.post.id
				})
			}
			return this.$store.dispatch('post/likePost', {
				postId: this.post.id
			})
		},
		onRetweet() {
			if(!this.me) {
				return alert('need logged in');
			}
			this.$store.dispatch('post/retweet', {
				postId: this.post.id
			});
		}
	},
	components:{
		commentForm,
		postImages,
		postContent
	},
	data() {
		return {
			commentOpen: false,
		}
	},
	computed:{
		me() {
			return this.$store.user.me;
		},
		heartIcon() {
			return liked ? 'mdi-heart' : 'mdi-heart-outline'
		},
		liked() {
			const me = this.$store.state.user.me;
			const liked = (this.post.Likers || []).find(v => v.id === (me && me.id));
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