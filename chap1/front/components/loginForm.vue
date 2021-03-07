<template>
<v-container v-if="!me">
	<v-card>
		<v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
			<v-container>
				<v-subtitle>Login</v-subtitle>
				<v-text-field
					v-model="email"
					:rules="emailRules"
					label="email"
					type="email"
					required
				/>
				<v-text-field
					v-model="password"
					:rules="passwordRules"
					label="password"
					type="password"
					required
				/>
				<v-btn color="teal accent-4" type="submit" class="white--text">Login</v-btn>
				<v-btn nuxt to="/signup" class="white black--text">Join</v-btn>
			</v-container>
		</v-form>
	</v-card>
</v-container>
<v-container v-else>
	<v-card>
		<v-container>
			<h3>Welcome {{ me.nickname }}</h3>
			<v-btn @click="onLogOut">Logout</v-btn>
		</v-container>
	</v-card>
</v-container>
</template>

<script>
export default {
	data(){
		return{
			valid: false,
			email: '',
			password: '',
			emailRules: [
				v => !!v || 'email is required',
				v => /.+@.+/.test(v) || 'This email is not valid',
			],
			passwordRules: [
				v => !!v || 'password is required'
			]
		}
	},
	methods:{
		onSubmitForm(){
			if(this.$refs.form.validate()){
				this.$store.dispatch('user/logIn', {
					email:this.email,
					nickname:'ygr',
					password:this.password
				})
			}
		},
		onLogOut(){
			this.$store.dispatch('user/logOut');
		}
	},
	computed:{
		me(){
			return this.$store.state.user.me;
		},
	}
}
</script>

<style>

</style>