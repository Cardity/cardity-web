<template>
    <v-row class="mb-5">
        <v-col class="contentBox">
            <h2 class="text-h6">Einstellungen</h2>

            <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                Raum-Code
            </div>
            <div class="text-body-2">
                {{ game.gameID }}
            </div>

            <template v-if="isHost">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                        Maximale Spieleranzahl
                    </div>
                    <v-slider
                        v-model="maxPlayers"
                        :rules="maxPlayersRules"
                        min="3"
                        max="10"
                        thumb-label="always"
                        :thumb-size="24">
                    </v-slider>

                    <v-text-field
                        v-model="secondsPerRound"
                        type="number"
                        label="Sekunden pro Runde"
                        outlined>
                    </v-text-field>

                    <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                        Kartendecks
                    </div>
                    <v-checkbox
                        v-model="cardDecks"
                        :rules="cardDeckRules"
                        label="Basisdeck 1"
                        value="1"
                        hide-details>
                    </v-checkbox>
                    <v-checkbox
                        v-model="cardDecks"
                        :rules="cardDeckRules"
                        label="Basisdeck 2"
                        value="2"
                        hide-details>
                    </v-checkbox>
                    <v-checkbox
                        v-model="cardDecks"
                        :rules="cardDeckRules"
                        label="Erweiterungsdeck 1"
                        value="3"
                        hide-details>
                    </v-checkbox>
                    <v-checkbox
                        v-model="cardDecks"
                        :rules="cardDeckRules"
                        label="Erweiterungsdeck 2"
                        value="4"
                        hide-details>
                    </v-checkbox>

                    <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                        Hausregeln
                    </div>
                    <v-radio-group v-model="houseRules">
                        <v-radio
                            label="Standard"
                            :value="1">
                        </v-radio>
                    </v-radio-group>

                    <div class="submitArea">
                        <v-btn
                            :disabled="!valid"
                            color="success"
                            depressed
                            @click="submit"
                        >
                            Änderungen speichern
                        </v-btn>
                        <v-btn
                            color="blue"
                            depressed
                            @click="startGame"
                            class="ml-2"
                        >
                            Spiel starten
                        </v-btn>
                    </div>
                </v-form>
            </template>
            <template v-else>
                <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                    Maximale Spieleranzahl
                </div>
                <div class="text-body-2">
                    {{ game.maxPlayers }}
                </div>

                <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                    Sekunden pro Runden
                </div>
                <div class="text-body-2">
                    {{ game.secondsPerRound }}
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
            </template>
            <v-overlay :value="overlay">
                <v-progress-circular
                    indeterminate
                    size="64"
                ></v-progress-circular>
            </v-overlay>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CAH from "../services/cah";
import Game from "../services/game/game";

@Component({})
export default class Settings extends Vue {
    overlay: boolean = false;
    isHost: boolean = false;
    game: Game;

    maxPlayers: number = 0;
    secondsPerRound: number = 0;
    cardDecks: string[] = ["1"];
    houseRules: number = 1;
    $refs!: {
        form: HTMLFormElement
    }

    constructor() {
        super();

        this.game = CAH.getGame();
    }

    data() {
        return {
            valid: false,
            overlay: false,
            game: CAH.getGame(),
            isHost: false,
            maxPlayers: CAH.getGame().maxPlayers,
            maxPlayersRules: [
                (value: number) => (value >= 3) || "Es werden mindestens 3 Spieler benötigt.",
                (value: number) => (value <= 10) || "Es können maximal 10 Spieler teilnehmen."
            ],
            secondsPerRound: CAH.getGame().secondsPerRound,
            cardDecks: CAH.getGame().cardDecks,
            cardDeckRules: [
                (value: string[]) => (value.length > 0) || "Es muss mindestens ein Deck ausgewählt werden.",
                (value: string[]) => (!(value.length == 1 && value.includes("4"))) || "Dieses Deck kann nur in Verbindung mit anderen Decks verwendet werden."
            ],
            // TODO: validate
            houseRules: CAH.getGame().houseRules
        }
    }

    created() {
        if (CAH.getPlayer().key == CAH.getGame().hostKey) {
            this.isHost = true;
        }
    }

    submit(ev: Event) {
        if (!this.$refs.form.validate()) {
            return;
        }

        let socket = CAH.getClient();
        let data = {
            maxPlayers: this.maxPlayers,
            secondsPerRound: this.secondsPerRound,
            cardDecks: this.cardDecks,
            houseRules: this.houseRules
        };
        socket.send("GAME_UPDATE", data);
    }

    startGame(ev: Event) {
        if (Object.keys(CAH.getGame().players).length < 3) {
            alert("Um das Spiel zu starten, müssen mindestens 3 Spieler im Warteraum sein.");
            return;
        }

        this.overlay = true;
        CAH.getClient().send("GAME_START", null);
    }
}
</script>
