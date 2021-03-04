<template>
	<v-list>
		<v-col	v-for="f in followerLists" :key="f.id" cols="12" md="4" :style="{ display:'inline-block' }">
			<v-list-item>
				<v-list-item-avatar color="blue" class="white--text headline"><span>{{ f.nickname[0] }}</span></v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>{{ f.nickname }}</v-list-item-title>
				</v-list-item-content>
				<v-list-item-action>
					<v-icon color="red" :style="{ marginLeft:'10px' }" @click="onFollowerRemove(f.id)">mdi-minus-circle-outline</v-icon>
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