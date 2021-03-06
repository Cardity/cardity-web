<template>
    <v-container class="waiting">
        <Header />
        <v-row>
            <PlayerList />
            <v-spacer class="flex-grow-0" />
            <v-col>
                <Settings />
                <Chat />
            </v-col>
        </v-row>
        <Footer />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueRouter from "vue-router";
import Chat from './../components/Chat.vue';
import PlayerList from './../components/PlayerList.vue';
import Settings from './../components/Settings.vue';
import Header from './../components/Header.vue';
import Footer from './../components/Footer.vue';

import CAH from "../services/cah";
import Game from "../services/game/game";

@Component({
    components: {
        Header,
        Footer,
        PlayerList,
        Settings,
        Chat
    }
})
export default class Waiting extends Vue {
    protected game: Game = CAH.getGame();

    created() {
        if (!this.game.gameID) {
            // TODO: uncomment
            this.$router.push("/");
        }
    }
}
</script>

<style lang="scss">
@import '@/styles/global';

.waiting {
    margin: 0 auto;

    .spacer {
        width: 20px;
    }
}
</style>
