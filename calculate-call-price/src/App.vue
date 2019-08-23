<template>
	<div id="app">
		<Header title="Telzir" />
		<Content />
		<Footer />
	</div>
</template>

<script>
import Header from './components/templates/Header.vue'
import Content from './components/templates/Content.vue'
import Footer from './components/templates/Footer.vue'

export default {
	name: 'app',
	components: {
		Header,
        Content,
		Footer
	}
}
</script>

<style>
	* {
        font-family: 'Poppins', sans-serif;
    }

    body {
        margin: 0
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        height: 100vh;
        display: grid;
        grid-template-rows: 60px 1fr 40px;
        grid-template-columns: 1fr;
        grid-template-areas: 
            "header"
            "content"
            "footer";
    }
</style>
