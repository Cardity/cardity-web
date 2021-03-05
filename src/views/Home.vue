<template>
    <v-container class="home">
        <Header />
        <v-row>
            <JoinGame />
            <v-spacer/>
            <CreateGame />
        </v-row>
        <GameInstruction />
        <Footer />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CAH from "./../services/cah";

import Header from './../components/Header.vue';
import CreateGame from './../components/CreateGame.vue';
import Footer from './../components/Footer.vue';
import GameInstruction from './../components/GameInstruction.vue';
import JoinGame from './../components/JoinGame.vue';

@Component({
    components: {
        Header,
        JoinGame,
        CreateGame,
        GameInstruction,
        Footer
    }
})
export default class Home extends Vue {
    created() {
        CAH.getClient();
    }
}
</script>

<style lang="scss">
@import '@/styles/global';

.home {
    margin: 0 auto;
    .contentBox {
        padding: 10px;
        border: 1px solid;
        @include theme('background-color', $contentBackground);
        @include theme('border-color', $contentBorder);
        @include theme('color', $contentColor);

        h2.boxTitle {
            @include theme('color', $boxTitleColor);
            margin: 0;
            margin-bottom: 20px;
        }
    }

    .spacer {
        flex-grow: 0 !important;
        width: 20px;
    }
}
</style>
