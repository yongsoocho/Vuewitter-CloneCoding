<template>
	<v-form ref="form" v-model="valid" :style="{position:'relative'}" @submit.prevent="onSubmitForm">
		<v-textarea
					v-model="content"
					filled
					label="comment"
					:hide-details="hideDetails"
					:success="success"
					:success-messages="successMessages"
					@input="onChangeTextarea"
					/>
		<v-btn color="teal accent-4" dark type="submit" absolute top right>comment</v-btn>
	</v-form>
</template>

<script>
export default {
	props:{
		postId: {
			type: String,
			required: true
		}
	},
	data(){
		return{
			valid:false,
			content:'',
			success:false,
			successMessages:'',
			hideDetails:false
		}
	},
	computed:{
		me(){
			return this.$store.state.user.me;
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
			if(this.$refs.form.validate()) {
				this.$store.dispatch('post/addComment', {
					id:	Date.now(),
					postId: this.postId,
					content: this.content,
					User:{
						nickname: this.me.nickname
					}
				})
				.then(() => {
					this.content = '';
					this.success = true;
					this.successMessages = 'comment is uploaded';
					this.hideDetails = false;
				})
				.catch((error) => {
					
				});
			}
		}
	}
}
</script>

<style>

</style>