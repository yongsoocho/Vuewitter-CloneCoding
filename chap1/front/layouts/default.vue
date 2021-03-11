<template>
<v-app>
	<nav>
		<v-toolbar dark class="teal accent-4">
			<v-toolbar-title>
				<NuxtLink to="/" class="white--text" :style="{ textDecoration:'none', display: 'flex', alignItems: 'center' }">
					<v-icon :style="{ display: 'flex', alignItems: 'center', margin:'0px 5px' }">mdi-twitter</v-icon>Vuewitter
				</NuxtLink>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-form @submit.prevent="onSearchHashtag">
					<div :style="{ display: 'flex', alignItems: 'center', height: '100%' }">
						<v-text-field 
									  v-model="hashtag"
									  label="검색" 
									  hide-details append-outer-icon="mdi-magnify" 
									  :style="{ display: 'flex', alignItems: 'center' }"
									  />
					</div>
				</v-form>
				<v-btn text nuxt to="/profile" :style="{ display: 'flex', alignItems: 'center' }">
					<div>프로필</div>
				</v-btn>
				<v-btn text nuxt to="/signup" :style="{ display: 'flex', alignItems: 'center' }">
					<div>회원가입</div>
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>
	</nav>
	
	<v-row>
		<v-col xs="12" md="3">
			<login-form></login-form>
		</v-col>
		<v-col xs="12" md="9">
			<nuxt />
		</v-col>
	</v-row>
</v-app>
<!-- <nuxt /> =<router-view></router-view> -->
</template>

<script>
	import loginForm from "../components/loginForm";
	
export default {
	components:{
		loginForm,
	},
	data() {
		return{
			hashtag:'',
		}
	},
	methods:{
		onSearchHashtag() {
			this.$router.push({
				path:`/hashtag/${this.hashtag}`
			});
			this.hashtag='';
		},
	},
	fetch({ store }) { //before mounted, fill store
		store.dispatch('user/loadUser');
	}
}
</script>

<style>

</style>