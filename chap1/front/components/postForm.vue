<template>
<v-container :style="{ marginBottom:'20px' }">
	<v-card>
		<v-container>
			<v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
				<v-textarea
							outlined
							auto-grow
							clearable
							v-model="content"
							label="What's going on?"
							:hide-details="hideDetails"
							:success-messages="successMessages"
							:success="success"
							:rules="[ v => !!v || 'please input content' ]"
							@input="onChangeTextarea"
							>
	
				</v-textarea>
				<v-btn color="teal accent-4" type="submit" class="white--text">twit</v-btn>
				<v-btn color="white" class="black--text">image</v-btn>
			</v-form>
		</v-container>
	</v-card>
</v-container>
</template>

<script>
export default {
	data(){
		return{
			valid:false,
			hideDetails: false,
			successMessages: '',
			success: false,
			content: ''
		}
	},
	methods:{
		onChangeTextarea(value){
			if(value.length){
				this.hideDetails = true;
				this.success = false;
				this.successMessages = '';
			}
		},
		onSubmitForm(){
			if(this.$refs.form.validate()){
				this.$store.dispatch('post/add', {
					content: this.content,
					User:{
						nickname:this.$store.state.user.me.nickname
					},
					Comments:[],
					Images:[],
					id: Date.now(),
					createdAt: Date.now()
				})
				.then(() => {
					this.content = '';
					this.hideDetails = false;
					this.success = true;
					this.successMessages = 'upload is success!';
				})
				.catch((error) => {
					
				})
			}
		},
		computed:{
			me() {
				return this.$store.state.user.me;
			},
			mainPost() {
				return this.$store.state.post.mainPost;
			}
		}
	}
}
</script>

<style>

</style>