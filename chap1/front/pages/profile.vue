<template>
<div>
	<v-container>
		<v-card :style="{ marginBottom:'20px' }">
			<v-container>
				<v-subheader>My profile</v-subheader>
				<v-form v-model="valid" @submit.prevent="onChangeNickname">
					<v-text-field
								  label="nickname"
								  v-model="nickname"
								  :rules="nicknameRules"
								  required
								  />
					<v-btn color="teal accent-4" type="submit" class="white--text">Edit</v-btn>
				</v-form>
			</v-container>
		</v-card>
		<v-card :style="{ marginBottom:'20px' }">
			<v-container>
				<v-subheader>Following</v-subheader>
				<following-list />
				<v-btn v-if="hasMoreFollowing" dark color="blue" :style="{ width:'100%' }" @click="loadMoreFollowing">More</v-btn>
			</v-container>
		</v-card>
		<v-card :style="{ marginBottom:'20px' }">
			<v-container>
				<v-subheader>Follower</v-subheader>
				<follower-list />
				<v-btn v-if="hasMoreFollower" dark color="blue" :style="{ width:'100%' }" @click="loadMoreFollower">More</v-btn>
			</v-container>
		</v-card>
	</v-container>
</div>
</template>

<script>
	import followingList from "../components/followingList";
	import followerList from "../components/followerList";
	
export default {
	data(){
		return{
			valid:false,
			nickname:'',
			nicknameRules:[
				v => !!v || 'please input your new nickname'
			]
		}
	},
	head(){
		return{
			title:'profile'
		}
	},
	components:{
		followingList,
		followerList
	},
	methods:{
		onChangeNickname(){
			this.$store.dispatch('user/changeNickname', {
				nickname: this.nickname
			})
		},
		loadMoreFollowing(){
			this.$store.dispatch('user/loadFollowing');
		},
		loadMoreFollower(){
			this.$store.dispatch('user/loadFollower');
		},
	},
	middleware: 'authenticated',
	computed:{
		hasMoreFollowing() {
			return this.$store.state.user.hasMoreFollowing;
		},
		hasMoreFollower() {
			return this.$store.state.user.hasMoreFollower;
		}
	},
	fetch({ store }){
		store.dispatch('user/loadFollower', { offset: 0 });
		return store.dispatch('user/loadFollowing', { offset: 0 });
	}
}
</script>

<style>

</style>