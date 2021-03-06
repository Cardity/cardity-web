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
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CAH from "../services/cah";
import Game from "../services/game/game";

@Component({})
export default class Settings extends Vue {
    protected game: Game;

    constructor() {
        super();

        this.game = CAH.getGame();
    }

    data() {
        return {
            game: CAH.getGame()
        }
    }
}
</script>
