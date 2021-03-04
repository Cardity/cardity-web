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
                outlined
                clearable
                @click:append="show1 = !show1">
            </v-text-field>

            <v-subheader>
                Maximale Spieleranzahl
            </v-subheader>
            <v-slider
                v-model="maxPlayers"
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

@Component({})
export default class CreateGame extends Vue {
    nickname: string = '';
    password: string = '';
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
            nickname: '',
            nicknameRules: [
                (value: string) => !!value || "test",
                (value: string) => (value && value.length > 10) || 'Name must be less than 10 characters'
            ],
            password: '',
            maxPlayers: 10,
            secondsPerRound: 90,
            cardDecks: []
        };
    }

    validate(ev: any) {
        console.log(ev);
        console.log(this.nickname);
        console.log(this.cardDecks);
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
