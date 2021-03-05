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

    .spacer {
        flex-grow: 0 !important;
        width: 20px;
    }
}
</style>
