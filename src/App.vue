<template>
    <v-app id="app">
        <router-view />
    </v-app>
</template>

<style lang="scss">
@import '@/styles/global';

body {
    @include theme('background-color', $backgroundColor);
    font-family: Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif;
    font-size: 14px;
}
</style>
