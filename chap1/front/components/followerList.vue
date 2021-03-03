<template>
	<v-list>
		<v-list-item v-for="f in followerLists" :key="f.id">
			<v-list-item-avatar color="blue" class="white--text"><span>{{ f.nickname[0] }}</span></v-list-item-avatar>
			<span>{{ f.nickname }}</span>
			<v-icon :style="{ marginLeft:'10px' }" @click="onFollowerRemove(f.id)">mdi-minus-circle-outline</v-icon>
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
		followerLists(){
			return this.$store.state.user.followerLists
		}
	},
	methods:{
		onFollowerRemove(id){
			this.$store.dispatch('user/onFollowerRemove', {id})
		}
	}
}
</script>

<style>

</style>