<template>
    <v-col class="joinGame contentBox">
        <h2 class="text-h6 mb-4">Spiel beitreten</h2>

        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                v-model="nickname"
                label="Benutzername"
                :rules="nicknameRules"
                outlined
                clearable>
            </v-text-field>

            <v-text-field
                v-model="gameID"
                label="Raum-Code"
                :rules="gameIDRules"
                :error-messages="gameIDError"
                outlined
                clearable>
            </v-text-field>

            <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                label="Raum-Passwort"
                :rules="passwordRules"
                :error-messages="passwordError"
                outlined
                clearable
                @click:append="show1 = !show1">
            </v-text-field>

            <div class="submitArea">
                <v-btn
                    :disabled="!valid"
                    color="success"
                    depressed
                    @click="submit"
                >
                    Raum betreten
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
import Game from "../services/game/game";
import CAH from "../services/cah";

@Component({})
export default class JoinGame extends Vue {
    overlay: boolean = false;
    protected nickname: string = "";
    protected gameID: string = "";
    protected password: string = "";
    protected gameIDError: string = "";
    protected passwordError: string = "";
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
            gameID: "",
            gameIDRules: [
                (value: string) => !!value || "Der Raum-Code darf nicht leer sein.",
            ],
            password: "",
            passwordRules: [
                (value: string) => (!value || value && value.length >= 4) || "Das Passwort muss mindestens 4 Zeichen lang sein.",
                (value: string) => (!value || value && value.length <= 32) || "Das Passwort darf maximal 32 Zeichen lang sein.",
            ],
            gameIDError: "",
            passwordError: ""
        };
    }

    submit(ev: Event) {
        ev.preventDefault();

        if (!this.$refs.form.validate()) {
            return;
        }

        this.overlay = true;
        let socket = CAH.getClient();
        socket.joinGameCallback = this.joinGame.bind(this);

        let data = {
            nickname: this.nickname,
            gameID: this.gameID,
            password: this.password
        };
        socket.send("JOIN_GAME", data);
    }

    joinGame(data: { [key: string]: any }) {
        this.overlay = false;

        if (data["errorField"] != null) {
            if (data["errorField"] == "gameID") {
                this.gameIDError = data["errorMessage"];
            } else if (data["errorField"] == "password") {
                this.passwordError = data["errorMessage"];
            }
            return;
        }

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
