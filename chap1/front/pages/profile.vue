<template>
<div>
	<h1>
		{{ msg }}
	</h1>
</div>
</template>

<script>
export default {
	layout:'admin',
	data(){
		return{
			msg:'Nuxt.js! This is profile'
		}
	},
	head(){
		return{
			title:'profile'
		}
	}
}
</script>

<style>

</style>