<template>
	<div v-if="images.length === 0"></div>
	<div v-else-if="images.length === 1">
		<v-img
			:src="`https://vuewitterexpress.run.goorm.io:3085/${images[0].src}`"
			contain
			aspect-ratio="2"
			@click="zoomImages"
			   /> <!-- contain 비율유지 딱맞게 / cover 도 있음 -->
		<image-zoom v-if="imageZoomed" :close-modal="closeModal" :images="images" />
	</div>
	<div v-else-if="images.length === 2" :style="{ display: flex }">
		<v-img
			:src="`https://vuewitterexpress.run.goorm.io:3085/${images[0].src}`"
			contain
			aspect-ratio="2"
			:style="{ flex:1 }"
			@click="zoomImages"
			   />
		<v-img
			:src="`https://vuewitterexpress.run.goorm.io:3085/${images[1].src}`"
			contain
			aspect-ratio="2"
			:style="{ flex:1 }"
			@click="zoomImages"
			   />
		<image-zoom v-if="imageZoomed" :close-modal="closeModal" :images="images" />
	</div>
	<div v-else-if="images.length > 2" :style="{ display: flex }">
		<v-img
			:src="`https://vuewitterexpress.run.goorm.io:3085/${images[0].src}`"
			contain
			aspect-ratio="2"
			:style="{ flex:1 }"
			@click="zoomImages"
			   />
		<div :style="{ flex: 1, alignItems:center, justifyContent:center, display:flex }" @click="zoomImages">
			<v-icon>mdi-dots-horizontal</v-icon>
		</div>
		<image-zoom v-if="imageZoomed" :close-modal="closeModal" :images="images" />
	</div>
</template>

<script>
	import imageZoom from "../components/imageZoom";
	
export default {
	props:{
		images:{
			type:Array,
			required:true
		},
		closeModal:{
			type:Function,
			required:true
		}
	},
	components: { imageZoom },
	data() {
		return {
			imageZoomed: false
		}
	},
	methods:{
		closeModal() {
			this.imageZoomed = false
		},
		zoomImages() {
			this.imageZoomed = true
		}
	}
}
</script>

<style>

</style>