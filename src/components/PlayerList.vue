<template>
    <v-col class="contentBox">
        <h2 class="text-h6">Spieler <v-chip small>{{ items.length }}</v-chip></h2>

        <v-list flat>
            <v-list-item-group>
                <template v-for="(item, index) in items">
                    <v-list-item :key="item.key">
                        <v-list-item-icon class="mr-2">
                            <v-avatar :color="item.isHost ? 'green' : 'primary'" size="48">
                                <span class="white--text headline">{{ item.name.substr(0, 2).toUpperCase() }}</span>
                            </v-avatar>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title :class="item.key == myKey ? 'text-body-1 font-weight-bold' : 'text-body-1'">
                                <span>{{ item.name }}</span>
                                <span v-if="item.isHost">
                                    (Host)
                                </span>
                            </v-list-item-title>
                            <v-list-item-subtitle v-if="game.isRunning">
                                <v-tooltip v-if="item.isCardCzar" top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-icon v-if="item.isCardCzar" v-bind="attrs" v-on="on">mdi-play</v-icon>
                                    </template>
                                    <span>Ist Kartenzar</span>
                                </v-tooltip>
                                <span>{{ item.points }} Punkte</span>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <!-- TODO: nur bei Spielern anzeigen, die nicht Host sind. Host kann sich nicht kicken -->
                        <v-list-item-action v-if="isHost && !item.isHost">
                            <v-icon @click="playerRemove" :data-key="item.key">mdi-account-remove</v-icon>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
                </template>
            </v-list-item-group>
        </v-list>
    </v-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Game from "../services/game/game";
import CAH from "../services/cah";
import IPlayer from "../services/interfaces/iplayer";

@Component({})
export default class PlayerList extends Vue {
    protected game: Game = CAH.getGame();
    protected items: IPlayer[] = [];
    protected isHost: boolean = false;
    protected myKey: string = "";
    
    data() {
        return {
            game: CAH.getGame(),
            items: [],
            isHost: false,
            myKey: ""
        }
    }

    created() {
        this.refreshPlayers();

        if (CAH.getPlayer().key == CAH.getGame().hostKey) {
            this.isHost = true;
        }
        this.myKey = CAH.getPlayer().key;
        
        CAH.getClient().changeGameListener.push(this.changeGame.bind(this));
    }

    playerRemove(ev: any) {
        if (!confirm("Möchtest du diesen Spieler wirklich entfernen?")) {
            ev.preventDefault();
            return;
        }

        CAH.getClient().send("KICK_PLAYER", {
            key: ev.target.dataset.key
        });
    }

    protected changeGame(data: { [key: string]: any }) {
        this.refreshPlayers();
    }

    protected refreshPlayers() {
        let players = CAH.getGame().players;
        let items: IPlayer[] = [];
        for (let key in players) {
            items.push(players[key])
        }
        this.items = items;
    }
}
</script>
