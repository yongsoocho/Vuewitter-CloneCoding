<template>
	<v-list>
		<v-list-item v-for="f in followingLists" :key="f.id">
			<v-list-item-avatar color="blue" class="white--text"><span>{{ f.nickname[0] }}</span></v-list-item-avatar>
			<span>{{ f.nickname }}</span>
			<v-icon color="red" :style="{ marginLeft:'10px' }" @click="onFollowingRemove(f.id)">mdi-minus-circle-outline</v-icon>
		</v-list-item>
	</v-list>
</template>

<script>
export default {
	data() {
		return{
			
		}
	},
	computed:{
		followingLists(){
			return this.$store.state.user.followingLists
		}
	},
	methods:{
		onFollowingRemove(id){
			this.$store.dispatch('user/onFollowingRemove', {id})
		}
	}
}
</script>

<style>

</style>