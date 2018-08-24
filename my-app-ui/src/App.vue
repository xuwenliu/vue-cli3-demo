<template>
    <div id="app">
    
    
        <!-- <router-link to="/">Home</router-link> |
    			<router-link to="/about">About</router-link>|
    			<router-link :to="{name:'about',query:{id:1,name:'bbb'}}">About</router-link> -->
    
        <router-view/>
    </div>
</template>

<style lang="less">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>