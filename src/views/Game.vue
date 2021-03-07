<template>
    <v-container class="game" fluid>
        <v-row>
            <v-col>
                <v-row>
                    <v-col class="p-4 cardWrapper" cols="2">
                        <div class="card blackDeck">
                            Hallo ;)
                        </div>
                    </v-col>
                    <v-col class="p-4">
                        <div style="height: 200px; background: #000; color: #FFF; border-radius: 10px; padding: 15px; display: table; width: 100%;" class="text-body-1">
                            <div style="vertical-align: middle; display: table-cell;">
                                {{ questionCard }}
                            </div>
                        </div>
                        <v-alert
                            color="blue-grey"
                            dark
                            class="mt-5"
                            style="border-radius: 10px"
                        >
                            Test
                        </v-alert>
                    </v-col>
                </v-row>
                <v-row>
                    <template v-for="(wordCard, index) in wordCards">
                    <v-col class="p-4 cardWrapper" cols="2" :key="wordCard" :data-index="index">
                        <div class="card">
                            {{ wordCard }}
                        </div>
                    </v-col>
                    </template>
                </v-row>
            </v-col>
            <v-spacer class="flex-grow-0" />
            <v-col class="sidebarRight">
                <v-row class="mb-4">
                    <PlayerList />
                </v-row>
                <Chat />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from './../components/Header.vue';
import PlayerList from './../components/PlayerList.vue';
import Chat from './../components/Chat.vue';
import CAH from "../services/cah";

@Component({
    components: {
        PlayerList,
        Chat
    }
})
export default class Game extends Vue {
    protected game = CAH.getGame();
    protected wordCards: string[] = [];
    protected questionCard: string = "";

    data() {
        return {
            game: CAH.getGame(),
            wordCards: CAH.getPlayer().wordCards,
            questionCard: ""
        }
    }

    created() {
        if (!this.game.gameID) {
            this.$router.push("/");
        }

        this.wordCards = CAH.getPlayer().wordCards;
        this.questionCard = CAH.getGame().questionCard;
    }
}
</script>

<style lang="scss" scoped>
.game {
    .spacer {
        width: 20px;
    }
}

.cardWrapper {
    // max-width: 170px;
    min-height: 300px;
    display: table;

    .card {
        padding: 15px;
        border-radius: 10px;
        vertical-align: middle;
        display: table-cell;
        border: 1px solid #000;
    }
    .blackDeck {
        background-color: #000;
        color: #FFF;
    }
}

.sidebarRight {
    max-width: 300px;
}
</style>
