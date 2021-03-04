<template>
    <div id="app">
        <router-view/>
        <!-- <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div> -->
    </div>
</template>

<style lang="scss">
@import '@/styles/global';

body {
    @include theme('background-color', $backgroundColor);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
}
</style>
