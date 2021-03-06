<template>
    <v-container class="waiting">
        <Header />
        <v-row>
            <v-col class="contentBox">
                <h2 class="text-h6">Spieler <v-chip small>{{ items.length }}</v-chip></h2>

                <v-list flat>
                    <v-list-item-group>
                        <template v-for="(item, index) in items">
                            <v-list-item :key="item.key">
                                <v-list-item-icon>
                                    <v-avatar color="primary" size="48">
                                        <span class="white--text headline">{{ item.name.substr(0, 2).toUpperCase() }}</span>
                                    </v-avatar>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.name" class="text-body-1"></v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-icon>mdi-account-remove</v-icon>
                                </v-list-item-action>
                            </v-list-item>

                            <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
                        </template>
                    </v-list-item-group>
                </v-list>
            </v-col>
            <v-spacer class="flex-grow-0" />
            <v-col>
                <v-row class="mb-5">
                    <v-col class="contentBox">
                        <h2 class="text-h6">Einstellungen</h2>

                        <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                            Raum-Code
                        </div>
                        <div class="text-body-2">
                            XXXXXX
                        </div>

                        <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                            Maximale Spieleranzahl
                        </div>
                        <div class="text-body-2">
                            10
                        </div>

                        <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                            Sekunden pro Runden
                        </div>
                        <div class="text-body-2">
                            90
                        </div>

                        <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                            Kartendecks
                        </div>
                        <div class="text-body-2">
                            <ul>
                                <li>Basisdeck</li>
                            </ul>
                        </div>

                        <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                            Hausregeln
                        </div>
                        <div class="text-body-2">
                            Standard
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="contentBox">
                        <h2 class="text-h6">Chat</h2>

                        <div class="chat mb-4 mt-4">
                            <div class="d-flex mt-3">
                                <v-avatar color="primary" size="48">
                                    <span class="white--text headline">LA</span>
                                </v-avatar>
                                <div class="chatMessage ml-3 pa-3">
                                    Test
                                </div>
                            </div>
                            <div class="d-flex mt-3">
                                <v-avatar color="primary" size="48">
                                    <span class="white--text headline">LA</span>
                                </v-avatar>
                                <div class="chatMessage ml-3 pa-3">
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                                </div>
                            </div>
                        </div>

                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                                v-model="message"
                                label="Nachricht"
                                append-outer-icon="mdi-send"
                                @click:append-outer="sendMessage"
                                @keydown="messageKeydown"
                                filled
                                clearable>
                            </v-text-field>
                        </v-form>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
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


interface PlayerList {
    key: string;
    name: string;
    isHost: boolean;
}

@Component({
    components: {
        Header,
        Footer
    }
})
export default class Waiting extends Vue {
    protected game: Game = CAH.getGame();
    protected items: PlayerList[] = [];
    protected message: string = "";

    data() {
        return {
            valid: false,
            message: "",
            items: [
                { key: "ewt1", name: "Hanashi", isHost: true },
                { key: "ewt2", name: "Nathalie", isHost: false },
                { key: "ewt3", name: "Test", isHost: false },
            ]
        }
    }

    created() {
        if (!this.game.gameID) {
            // TODO: uncomment
            // this.$router.push("/");
        }
        this.items.push({
            key: "asdsafafas",
            name: "Looser",
            isHost: false
        })
    }

    sendMessage() {
        console.log(this.message);
    }

    messageKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.sendMessage();
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

.chat {
    height: 300px;
    overflow-y: scroll;
    padding-right: 20px;

    .chatMessage {
        position: relative;
        border-radius: .4em;
        background: #EEEEEE;

        &:after {
            content: '';
            position: absolute;
            left: 0;
            top: 20px;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-right-color: #EEEEEE;
            border-left: 0;
            border-bottom: 0;
            margin-top: -10px;
            margin-left: -10px;
        }
    }
}
</style>
