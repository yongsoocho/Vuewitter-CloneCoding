<template>
<div>
	<v-container>
		<v-card>
			<v-container>
				<v-subheader>Join</v-subheader>
				<v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
					<v-text-field
								  v-model="email"
								  label="email"
								  type="email"
								  required
								  :rules="emailRules"
								  />
					<v-text-field
								  v-model="password"
								  label="password"
								  type="password"
								  required
								  :rules="passwordRules"
								  />
					<v-text-field
								  v-model="passwordCheck"
								  label="password check"
								  type="password"
								  required
								  :rules="passwordCheckRules"
								  />
					<v-text-field
								  v-model="nickname"
								  label="nickname"
								  type="text"
								  required
								  :rules="nicknameRules"
								  />
					<v-checkbox
								v-model="terms"
								required
								label="I agree"
								:rules="[ v => !!v || 'You have to agree ' ]"
								/>
					<v-btn color="teal accent-4" class="white--text" type="submit" :disabled="!valid">submit</v-btn>
				</v-form>
			</v-container>
		</v-card>
	</v-container>
</div>
</template>

<script>
export default {
	data(){
		return{
			valid: false,
			email: '',
			password: '',
			passwordCheck:'',
			nickname:'',
			terms: false,
			emailRules:[
				v => !!v || 'email is required',
				v => /.+@.+/.test(v) || 'This email is not valid',
			],
			nicknameRules:[
				v => !!v || 'nickname is required',
			],
			passwordRules:[
				v => !!v || 'password is required',
			],
			passwordCheckRules:[
				v => !!v || 'password check is required',
				v => v === this.password || 'password check should be same',
			]
		}
	},
	head(){
		return{
			title:'signup'
		}
	},
	methods:{
		onSubmitForm(){
			if(this.$refs.form.validate()){
				alert('sign up request')
			}else{
				alert('retry')
			}
		}
	}
}
</script>

<style>

</style>