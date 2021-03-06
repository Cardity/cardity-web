<template>
    <v-container class="waiting">
        <Header />
        <v-row>
            <v-col class="contentBox">
                Die Verbindung zum Server wurde geschlossen.<br><br><router-link to="/">Zur Startseite</router-link>
            </v-col>
        </v-row>
        <Footer />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from './../components/Header.vue';
import Footer from './../components/Footer.vue';
import CAH from "../services/cah";
import WebsocketClient from "../services/socket/websocketClient";

@Component({
    components: {
        Header,
        Footer
    }
})
export default class ConnectionClosed extends Vue {
    created() {
        CAH.socket = new WebsocketClient();
    }
}
</script>
