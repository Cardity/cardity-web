<template>
    <v-col class="createGame contentBox">
        <h2 class="boxTitle">Spiel erstellen</h2>

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
                label="Sekunden pro Runden"
                outlined>
            </v-text-field>

            <v-subheader
                class="subHeaderDl">
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

            <div class="submitArea">
                <v-btn
                    :disabled="!valid"
                    color="success"
                    depressed
                    @click="validate"
                >
                    Raum erstellen
                </v-btn>
            </div>
        </v-form>
    </v-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueRouter from "vue-router";

@Component({})
export default class CreateGame extends Vue {
    nickname: string = "";
    password: string = "";
    maxPlayers: number = 0;
    secondsPerRound: number = 0;
    cardDecks: string[] = [];

    $refs!: {
        form: HTMLFormElement
    }

    data() {
        return {
            valid: true,
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
            cardDecks: []
        };
    }

    validate(ev: Event) {
        if (!this.$refs.form.validate()) {
            return;
        }
        
        console.log(this.nickname);
        console.log(this.maxPlayers);
        console.log(this.cardDecks);


        // TODO: router
        // this.$router.push("/about");
    }
}
</script>

<style lang="scss" scoped>
.subHeaderDl {
    height: 0px;
}

.createGame {
    .submitArea {
        margin-top: 20px;
        text-align: center;
    }
}
</style>
