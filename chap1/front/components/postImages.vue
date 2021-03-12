<template>
	<div v-if="images.length === 0"></div>
	<div v-else-if="images.length === 1">
		<v-img
			:src="`https://vuewitterexpress.run.goorm.io:3085/${images[0].src}`"
			contain
			aspect-ratio="2"
			   /> <!-- contain 비율유지 딱맞게 / cover 도 있음 --> 
	</div>
	<div v-else-if="images.length === 2" :style="{ display: flex }">
		<v-img
			:src="`https://vuewitterexpress.run.goorm.io:3085/${images[0].src}`"
			contain
			aspect-ratio="2"
			:style="{ flex:1 }"
			   />
		<v-img
			:src="`https://vuewitterexpress.run.goorm.io:3085/${images[1].src}`"
			contain
			aspect-ratio="2"
			:style="{ flex:1 }"
			   />
	</div>
	<div v-else-if="images.length > 2" :style="{ display: flex }">
		<v-img
			:src="`https://vuewitterexpress.run.goorm.io:3085/${images[0].src}`"
			contain
			aspect-ratio="2"
			:style="{ flex:1 }"
			   />
		<div :style="{ flex: 1, alignItems:center, justifyContent:center, display:flex }">
			<v-icon>mdi-dots-horizontal</v-icon>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		images:{
			type:Array,
			required:true
		}
	}
}
</script>

<style>

</style>