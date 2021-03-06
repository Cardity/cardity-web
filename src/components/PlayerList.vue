<template>
    <v-col class="contentBox">
        <h2 class="text-h6">Spieler <v-chip small>{{ items.length }}</v-chip></h2>

        <v-list flat>
            <v-list-item-group>
                <template v-for="(item, index) in items">
                    <v-list-item :key="item.key">
                        <v-list-item-icon>
                            <v-avatar :color="item.isHost ? 'green' : 'primary'" size="48">
                                <span class="white--text headline">{{ item.name.substr(0, 2).toUpperCase() }}</span>
                            </v-avatar>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.name" :class="item.key == myKey ? 'text-body-1 font-weight-bold' : 'text-body-1'"></v-list-item-title>
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
import CAH from "../services/cah";

interface Player {
    key: string;
    name: string;
    isHost: boolean;
}

@Component({})
export default class PlayerList extends Vue {
    protected items: Player[] = [];
    protected isHost: boolean = false;
    protected myKey: string = "";
    
    data() {
        return {
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
        let items: Player[] = [];
        for (let key in players) {
            let isHost: boolean = false;
            if (CAH.getGame().hostKey == key) {
                isHost = true;
            }

            items.push({
                key: key,
                name: players[key],
                isHost: isHost
            })
        }
        this.items = items;
    }
}
</script>
