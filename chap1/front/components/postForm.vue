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
				<input ref="imageInput" type="file" multiple hidden @change="onChangeImage"/>
				<v-btn color="white" class="black--text" @click="onClickImageUpload" type="button">image</v-btn>
				<div>
					<div v-for="(p, i) in imagePaths" :key="p" :style="{ display: inline-block }">
						<img :src=`https://vuewitterexpress.run.goorm.io:3085/${p}` alt="p"/>
						<div>
							<button @click="upRemoveImages(i)" type="button">
								DELETE
							</button>
						</div>
					</div>
				</div>
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
		onClickImageUpload() {
			this.$refs.imageInput.click();
		},
		onChangeImage(e) {
			const imageFormData = new FormData();
			[].forEach.call(e.target.files, (f) => {
				imageFormData.append('image', f)
			});
			this.$store.dispatch('post/uploadImages', imageFormData);
		},
		upRemoveImages(i) {
			this.$store.commit('post/removeImagePaths', i);
		}
	},
	computed:{
		me() {
			return this.$store.state.user.me;
		},
		mainPost() {
			return this.$store.state.post.mainPost;
		},
		imagePaths() {
			return this.$store.state.post.imagePaths;
		}
	}
}
</script>

<style>

</style>