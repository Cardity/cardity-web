<template>
    <v-container class="game" fluid>
        <v-row>
            <v-col>
                <v-row>
                    <v-col class="p-4 cardWrapper" cols="2">
                        <div class="card blackDeck">
                            Hallo ;)
                        </div>
                    </v-col>
                    <v-col class="p-4">
                        <div style="height: 200px; background: #000; color: #FFF; border-radius: 10px; padding: 15px; display: table; width: 100%;" class="text-body-1">
                            <div style="vertical-align: middle; display: table-cell;">
                                Lückentext
                            </div>
                        </div>
                        <v-alert
                            color="blue-grey"
                            dark
                            class="mt-5"
                            style="border-radius: 10px"
                        >
                            Test
                        </v-alert>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="p-4 cardWrapper" cols="2">
                        <div class="card">
                            Hallo ;)
                        </div>
                    </v-col>
                    <v-col class="p-4 cardWrapper" cols="2">
                        <div class="card">
                            Hallo ;)
                        </div>
                    </v-col>
                    <v-col class="p-4 cardWrapper" cols="2">
                        <div class="card">
                            Hallo ;)
                        </div>
                    </v-col>
                    <v-col class="p-4 cardWrapper" cols="2">
                        <div class="card">
                            Hallo ;)
                        </div>
                    </v-col>
                    <v-col class="p-4 cardWrapper" cols="2">
                        <div class="card">
                            Hallo ;)
                        </div>
                    </v-col>
                    <v-col class="p-4 cardWrapper" cols="2">
                        <div class="card">
                            Hallo ;)
                        </div>
                    </v-col>
                    <v-col class="p-4 cardWrapper" cols="2">
                        <div class="card">
                            Hallo ;)
                        </div>
                    </v-col>
                    <v-col class="p-4 cardWrapper" cols="2">
                        <div class="card">
                            Hallo ;)
                        </div>
                    </v-col>
                    <v-col class="p-4 cardWrapper" cols="2">
                        <div class="card">
                            Hallo ;)
                        </div>
                    </v-col>
                    <v-col class="p-4 cardWrapper" cols="2">
                        <div class="card">
                            Hallo ;)
                        </div>
                    </v-col>
                </v-row>
            </v-col>
            <v-spacer class="flex-grow-0" />
            <v-col class="sidebarRight">
                <v-row class="mb-4">
                    <PlayerList />
                </v-row>
                <Chat />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from './../components/Header.vue';
import PlayerList from './../components/PlayerList.vue';
import Chat from './../components/Chat.vue';

@Component({
    components: {
        PlayerList,
        Chat
    }
})
export default class Game extends Vue {
}
</script>

<style lang="scss" scoped>
.game {
    .spacer {
        width: 20px;
    }
}

.cardWrapper {
    // max-width: 170px;
    min-height: 300px;
    display: table;

    .card {
        padding: 15px;
        border-radius: 10px;
        vertical-align: middle;
        display: table-cell;
        border: 1px solid #000;
    }
    .blackDeck {
        background-color: #000;
        color: #FFF;
    }
}

.sidebarRight {
    max-width: 300px;
}
</style>
