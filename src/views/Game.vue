<template>
    <v-container class="game" fluid>
        <v-row>
            <v-col>
                <v-row>
                    <v-col class="p-4 cardWrapper" cols="2">
                        <div class="card blackDeck">
                            <div>
                                X Karten
                            </div>
                            <div class="mt-4" v-if="game.phase == 2">
                                {{ roundSeconds }} Sekunden
                            </div>
                        </div>
                    </v-col>
                    <v-col class="p-4">
                        <div style="height: 188px; background: #000; color: #FFF; border-radius: 10px; padding: 15px; display: table; width: 100%;" class="text-body-1">
                            <div style="vertical-align: middle; display: table-cell;" v-html="getQuestionCard()"></div>
                        </div>
                        <div
                            class="mt-5"
                            style="border-radius: 10px; height: 68px; display: table; padding: 15px; width: 100%; background: #FFF; color: #000; border: 1px solid black;"
                        >
                            <div style="vertical-align: middle; display: table-cell;">
                                <span v-if="game.phase == 1">
                                    Bitte warte, während die Karten gezogen werden.
                                </span>
                                <span v-else-if="game.phase == 2 && player.isZcar">
                                    Bitte warte, während die Spieler ihre Karten auswählen.
                                </span>
                                <span v-else-if="game.phase == 2 && !player.isZcar">
                                    Wähle {{ game.getWords() }} Karte/n und drücke auf folgenden Button:
                                    <v-btn
                                        :disabled="selectedCards.length != game.getWords() || selected"
                                        color="success"
                                        depressed
                                        @click="confirmCardSelection"
                                    >
                                        Auswahl bestätigen
                                    </v-btn>
                                </span>
                                <span v-else-if="game.phase == 3 && player.isZcar">
                                    Wähle aus den folgenden Karten, welche dir am besten gefallen und drücke auf den folgenden Button:
                                    <v-btn
                                        :disabled="!selectedCardGroup || cardGroupSelected"
                                        color="success"
                                        depressed
                                        @click="confirmCardGroupSelection"
                                    >
                                        Auswahl bestätigen
                                    </v-btn>
                                </span>
                                <span v-else-if="game.phase == 3 && !player.isZcar">
                                    Bitte warte, während der Kartenzar die besten Karten auswählt.
                                </span>
                                <span v-else-if="game.phase == 4">
                                    Der Spieler {{ wonText }} hat gewonnen. Bitte warte, bis die nächste Runde beginnt.
                                </span>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <v-row v-if="!player.isZcar && game.phase == 2">
                    <template v-for="(wordCard, index) in player.wordCards">
                        <v-col class="p-4 cardWrapper" cols="2" :key="wordCard" :data-index="index" @click="selectCard">
                            <div :data-index="index" class="card" :class="{ selectedCard: isSelected(index) }">
                                {{ wordCard }}
                            </div>
                        </v-col>
                    </template>
                </v-row>
                <v-row v-if="game.phase == 3 || game.phase == 4">
                    <template v-for="(wordCard, index) in game.selectedCards">
                        <v-col class="p-4 cardWrapper" cols="2" :key="wordCard" :data-index="index" @click="selectCardGroup">
                            <div :data-index="index" class="card" :class="{ selectedCard: selectedCardGroup == index }" v-html="wordCard"></div>
                        </v-col>
                    </template>
                </v-row>
                <v-snackbar
                    v-model="snackbar"
                    :timeout="timeout"
                >
                    Der Spieler {{ wonText }} hat diese Runde gewonnen.
                </v-snackbar>
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
import Player from "../services/game/player";

@Component({
    components: {
        PlayerList,
        Chat
    }
})
export default class Game extends Vue {
    protected game = CAH.getGame();
    protected player: Player = CAH.getPlayer();
    protected selectedCards: number[] = [];
    protected selected: boolean = false;
    protected selectedCardGroup: string = "";
    protected cardGroupSelected: boolean = false;

    protected phase2Interval: NodeJS.Timeout | null = null;
    protected roundSeconds: number = CAH.getGame().secondsPerRound;
    protected wonText: string = "";
    protected snackbar: boolean = false;

    data() {
        return {
            snackbar: false,
            game: CAH.getGame(),
            player: CAH.getPlayer(),
            selectedCards: [],
            selected: false,
            roundSeconds: CAH.getGame().secondsPerRound,
            selectedCardGroup: "",
            cardGroupSelected: false,
            timeout: 5000,
            wonText: ""
        }
    }

    created() {
        if (!this.game.gameID) {
            this.$router.push("/");
        }

        CAH.getClient().changeGameListener.push(this.gameChanged.bind(this));
        CAH.getClient().playerChangedCallback = this.playerChanged.bind(this);
        CAH.getClient().playerWonCallback = this.playerWon.bind(this);
    }

    selectCard(ev: any) {
        let index: number = ev.target.dataset.index;
        if (this.selectedCards.includes(index)) {
            let i = this.selectedCards.indexOf(index);
            if (i > -1) {
                this.selectedCards.splice(i, 1);
            }
        } else {
            this.selectedCards.push(index);
        }
    }

    selectCardGroup(ev: any) {
        if (!CAH.getPlayer().isZcar || this.game.phase != 3) {
            return;
        }

        let index: string = ev.target.dataset.index;
        if (index == this.selectedCardGroup) {
            this.selectedCardGroup = "";
        } else {
            this.selectedCardGroup = index;
        }
    }

    confirmCardSelection(ev: MouseEvent) {
        this.selected = true;

        CAH.getClient().send("SELECT_CARDS", {
            selectedCards: this.selectedCards
        });
    }

    confirmCardGroupSelection(ev: MouseEvent) {
        this.cardGroupSelected = true;

        CAH.getClient().send("SELECT_CARD_GROUP", {
            selectedCardGroup: this.selectedCardGroup
        });
    }

    gameChanged(data: { [key: string]: any }) {
        this.game = CAH.getGame();
        if (this.game.phase == 2) {
            this.roundSeconds = CAH.getGame().secondsPerRound
            this.phase2Interval = setInterval(this.phase2Timer.bind(this), 1000);
        } else {
            if (this.phase2Interval != null) {
                clearInterval(this.phase2Interval);
            }
        }

        if (this.game.phase == 1) {
            this.selectedCards = [];
            this.selected = false;
            this.selectedCardGroup = "";
            this.cardGroupSelected = false;
        }
    }

    playerChanged(data: { [key: string]: any }) {
        this.player = CAH.getPlayer();
    }

    playerWon(data: { [key: string]: any }) {
        this.wonText = data.name;
        this.snackbar = true;
        this.selectedCardGroup = data.key;
    }

    isSelected(index: number): boolean {
        for (let i in this.selectedCards) {
            if (this.selectedCards[i] == index) {
                return true;
            }
        }
        return false;
    }

    getQuestionCard() {
        let questionCard = this.game.questionCard;
        if (this.selectedCards.length > this.game.getWords()) {
            return questionCard;
        }
        for (let index in this.selectedCards) {
            let number = this.selectedCards[index];
            questionCard = questionCard.replace("___", "<span style='color: green'>" + this.player.wordCards[number] + "</span>");
        }
        return questionCard;
    }

    phase2Timer() {
        if (this.roundSeconds > 0) {
            this.roundSeconds--;
        }
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
        cursor: pointer;
    }
    .selectedCard {
        border: 1px solid #0A0;
        background-color: #EEE;
    }
    .blackDeck {
        background-color: #000;
        color: #FFF;
        text-align: center;
    }
}

.sidebarRight {
    max-width: 300px;
}
</style>
