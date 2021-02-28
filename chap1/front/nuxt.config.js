export default {
	build: {
        extend(config, ctx) {} // blah blah
    },
    server: {
        host: "0.0.0.0",
		port: 8000
    },
	head: {
		title:'Vuewitter'
	},
	modules: [
		'@nuxtjs/axios'
	],
	buildModules:[
		 '@nuxtjs/vuetify'
	]
}   