<template>
    <v-col class="createGame contentBox">
        <h2 class="text-h6 mb-4">Spiel erstellen</h2>

        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                v-model="nickname"
                label="Benutzername"
                :rules="nicknameRules"
                outlined
                clearable>
            </v-text-field>

            <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Raum-Passwort"
                :rules="passwordRules"
                outlined
                clearable
                @click:append="show1 = !show1">
            </v-text-field>

            <v-subheader>
                Maximale Spieleranzahl
            </v-subheader>
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

            <v-subheader>
                Kartendecks
            </v-subheader>
            <v-checkbox
                v-model="cardDecks"
                label="Basisdeck 1"
                value="1"
                hide-details>
            </v-checkbox>
            <v-checkbox
                v-model="cardDecks"
                label="Basisdeck 2"
                value="2"
                hide-details>
            </v-checkbox>
            <v-checkbox
                v-model="cardDecks"
                label="Erweiterungsdeck 1"
                value="3"
                hide-details>
            </v-checkbox>
            <v-checkbox
                v-model="cardDecks"
                label="Erweiterungsdeck 2"
                value="4"
                hide-details>
            </v-checkbox>

            <v-subheader>
                Hausregeln
            </v-subheader>
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
                    Raum erstellen
                </v-btn>
            </div>
        </v-form>
        <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
    </v-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueRouter from "vue-router";
import CAH from "../services/cah";
import Game from "../services/game/game";

@Component({})
export default class CreateGame extends Vue {
    overlay: boolean = false;
    nickname: string = "";
    password: string = "";
    maxPlayers: number = 0;
    secondsPerRound: number = 0;
    cardDecks: string[] = ["1"];
    houseRules: number = 1;
    $refs!: {
        form: HTMLFormElement
    }

    data() {
        return {
            valid: false,
            overlay: false,
            show1: false,
            nickname: "",
            nicknameRules: [
                (value: string) => !!value || "Der Nickname darf nicht leer sein.",
                (value: string) => (value && value.length >= 3) || "Der Nickname muss mindestens 3 Zeichen lang sein.",
                (value: string) => (value && value.length <= 16) || "Der Nickname darf maximal 16 Zeichen lang sein."
            ],
            password: "",
            passwordRules: [
                (value: string) => (!value || value && value.length >= 4) || "Das Passwort muss mindestens 4 Zeichen lang sein.",
                (value: string) => (!value || value && value.length <= 32) || "Das Passwort darf maximal 32 Zeichen lang sein.",
            ],
            maxPlayers: 10,
            maxPlayersRules: [
                (value: number) => (value >= 3) || "Es werden mindestens 3 Spieler benötigt.",
                (value: number) => (value <= 10) || "Es können maximal 10 Spieler teilnehmen."
            ],
            secondsPerRound: 90,
            cardDecks: ["1"],
            // TODO: validate
            houseRules: 1
        };
    }

    submit(ev: Event) {
        if (!this.$refs.form.validate()) {
            return;
        }

        this.overlay = true;
        let socket = CAH.getClient();
        socket.createGameCallback = this.gameCreated.bind(this);

        let data = {
            nickname: this.nickname,
            password: this.password,
            maxPlayers: this.maxPlayers,
            secondsPerRound: this.secondsPerRound,
            cardDecks: this.cardDecks,
            houseRules: this.houseRules
        };
        socket.send("CREATE_GAME", data);
    }

    gameCreated(data: { [key: string]: any }) {
        let game: Game = CAH.getGame();
        for (let key in data) {
            switch (key) {
                case "cardDecks": {
                    game.cardDecks = data[key];
                    break;
                }
                case "gameID": {
                    game.gameID = data[key];
                    break;
                }
                case "hostKey": {
                    game.hostKey = data[key];
                    break;
                }
                case "houseRules": {
                    game.houseRules = data[key];
                    break;
                }
                case "maxPlayers": {
                    game.maxPlayers = data[key];
                    break;
                }
                case "players": {
                    game.players = data[key];
                    break;
                }
                case "secondsPerRound": {
                    game.secondsPerRound = data[key];
                    break;
                }
            }
        }

        this.$router.push("/waiting");
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/global';
</style>
