<template>
    <v-container class="waiting">
        <Header />
        <Footer />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueRouter from "vue-router";
import Header from './../components/Header.vue';
import Footer from './../components/Footer.vue';

import CAH from "../services/cah";
import Game from "../services/game/game";

@Component({
    components: {
        Header,
        Footer
    }
})
export default class Waiting extends Vue {
    protected game: Game = CAH.getGame();

    created() {
        if (!this.game.gameID) {
            // TODO: uncomment
            // this.$router.push("/");
        }
    }
}
</script>
