<template>
	<v-list>
		<v-col	v-for="f in followingLists" :key="f.id" cols="12" md="4" :style="{ display:'inline-block' }">
			<v-list-item>
				<v-list-item-avatar color="blue" class="white--text headline"><span>{{ f.nickname[0] }}</span></v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>{{ f.nickname }}</v-list-item-title>
				</v-list-item-content>
				<v-list-item-action>
					<v-icon color="red" :style="{ marginLeft:'10px' }" @click="onFollowingRemove(f.id)">mdi-minus-circle-outline</v-icon>
				</v-list-item-action>
			</v-list-item>
		</v-col>
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
			this.$store.dispatch('user/onFollowingRemove', {userId})
		}
	}
}
</script>

<style>

</style>