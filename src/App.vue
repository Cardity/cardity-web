<template>
    <v-app id="app">
        <router-view />
    </v-app>
</template>

<style lang="scss">
@import '@/styles/global';

body {
    @include theme('background-color', $backgroundColor);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
}
</style>
