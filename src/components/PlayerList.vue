<template>
    <v-col class="contentBox">
        <h2 class="text-h6">Spieler <v-chip small>{{ items.length }}</v-chip></h2>

        <v-list flat>
            <v-list-item-group>
                <template v-for="(item, index) in items">
                    <v-list-item :key="item.key">
                        <v-list-item-icon>
                            <v-avatar color="primary" size="48">
                                <span class="white--text headline">{{ item.name.substr(0, 2).toUpperCase() }}</span>
                            </v-avatar>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.name" class="text-body-1"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-icon>mdi-account-remove</v-icon>
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

interface Player {
    key: string;
    name: string;
    isHost: boolean;
}

@Component({})
export default class PlayerList extends Vue {
    protected items: PlayerList[] = [];
    
    data() {
        return {
            items: [
                { key: "ewt1", name: "Hanashi", isHost: true },
                { key: "ewt2", name: "Nathalie", isHost: false },
                { key: "ewt3", name: "Test", isHost: false },
            ]
        }
    }
}
</script>
