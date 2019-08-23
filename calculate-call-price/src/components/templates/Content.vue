<template>
    <div class="content">
        <Home />
    </div>
</template>

<script>
import Home from '../home/Home.vue'

export default {
    components: {
		Home
	}
}
</script>

<style>
    .content {
        grid-area: content;
        background-color: #efefef;
        padding: 20px;
    }
</style>
