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
	],
	axios:{
		browserBaseURL:'https://vuewitterexpress.run.goorm.io:3085/post', //클라에서 보낼때
		baseURL:'https://vuewitterexpress.run.goorm.io:3085/post', //서버에서 보낼때
		https: false
	},
	server: {
		port: 3080
	}
}   