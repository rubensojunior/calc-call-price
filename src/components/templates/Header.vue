<template>
    <header class="header">
        <h1 class="title">
            <router-link to="/">{{ title }}</router-link>
        </h1>
    </header>
</template>

<script>
export default {
    props: {
        title: String,
    }
}
</script>

<style>
    .header{
        grid-area: header;
        background-color: #ff4000;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title{
        font-size: 1.2rem;
        color: white;
        font-weight: 300;
        flex-grow: 1;
        text-align: center;
    }

    .title a{
        color: white;
        text-decoration: none;
    }

    .title a:hover{
        color: white;
        text-decoration: none;
    }
</style>
