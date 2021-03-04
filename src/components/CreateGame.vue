<template>
    <v-col class="createGame contentBox">
        <h2 class="boxTitle">Spiel erstellen</h2>

        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="getFormValues" id="createGameForm">
            <v-text-field
                name="nickname"
                label="Benutzername"
                :rules="nicknameRules"
                outlined
                clearable>
            </v-text-field>

            <v-text-field
                name="password"
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
                name="maxPlayers"
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
                name="cardDecks1"
                label="Basisdeck 1"
                value="1"
                hide-details>
            </v-checkbox>
            <v-checkbox
                v-model="cardDecks"
                name="cardDecks2"
                label="Basisdeck 2"
                value="2"
                hide-details>
            </v-checkbox>
            <v-checkbox
                v-model="cardDecks"
                name="cardDecks3"
                label="Erweiterungsdeck 1"
                value="3"
                hide-details>
            </v-checkbox>
            <v-checkbox
                v-model="cardDecks"
                name="cardDecks4"
                label="Erweiterungsdeck 2"
                value="4"
                hide-details>
            </v-checkbox>

            <div class="submitArea">
                <v-btn
                    :disabled="!valid"
                    type="submit"
                    color="success"
                    depressed
                    form="createGameForm"
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
    $refs!: {
        form: HTMLFormElement
    }

    data() {
        return {
            valid: true,
            show1: false,
            nicknameRules: [
                (value: string) => !!value || "test",
                (value: string) => (value && value.length > 10) || 'Name must be less than 10 characters'
            ],
            maxPlayers: 10,
            secondsPerRound: 90,
            cardDecks: []
        };
    }

    getFormValues(event: any) {
        if (!this.$refs.form.validate()) {
            return;
        }
        let elements = event.target.elements;
        console.log("test2");
        // console.log(elements.nickname.value);
        console.log(elements.maxPlayers.value);
        // console.log(elements.cardDecks1.checked);
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
