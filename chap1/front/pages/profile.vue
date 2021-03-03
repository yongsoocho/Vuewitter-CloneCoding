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
			</v-container>
		</v-card>
		<v-card :style="{ marginBottom:'20px' }">
			<v-container>
				<v-subheader>Follower</v-subheader>
				<follower-list />
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
		}
	}
}
</script>

<style>

</style>