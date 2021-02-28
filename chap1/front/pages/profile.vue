<template>
<div>
	<v-container>
		<v-card :style="{ marginBottom:'20px' }">
			<v-container>
				<v-subheader>My profile</v-subheader>
				<v-form>
					<v-text-field
								  label="nickname"
								  required
								  />
					<v-btn color="teal accent-4" type="submit" class="white--text">Edit</v-btn>
				</v-form>
			</v-container>
		</v-card>
		<v-card :style="{ marginBottom:'20px' }">
			<v-container>
				<v-subheader>Following</v-subheader>
				<follow-list />
			</v-container>
		</v-card>
		<v-card :style="{ marginBottom:'20px' }">
			<v-container>
				<v-subheader>Follower</v-subheader>
				<follow-list />
			</v-container>
		</v-card>
	</v-container>
</div>
</template>

<script>
	import followList from "../components/followList";
	
export default {
	data(){
		return{
			msg:'Nuxt.js! This is profile'
		}
	},
	head(){
		return{
			title:'profile'
		}
	},
	components:{
		followList,
	}
}
</script>

<style>

</style>