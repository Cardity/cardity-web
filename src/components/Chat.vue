<template>
    <v-row>
        <v-col class="contentBox">
            <h2 class="text-h6">Chat</h2>

            <div class="chat mb-4 mt-4">
                <div class="d-flex mt-3">
                    <v-avatar color="primary" size="48">
                        <span class="white--text headline">LA</span>
                    </v-avatar>
                    <div class="chatMessage ml-3 pa-3">
                        Test
                    </div>
                </div>
                <div class="d-flex mt-3">
                    <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-avatar color="primary" size="48" v-bind="attrs" v-on="on">
                                <span class="white--text headline">LA</span>
                            </v-avatar>
                        </template>
                        <span>Lara</span>
                    </v-tooltip>
                    <div class="chatMessage ml-3 pa-3">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                    </div>
                </div>
            </div>

            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="message"
                    label="Nachricht"
                    append-outer-icon="mdi-send"
                    @click:append-outer="sendMessage"
                    @keydown="messageKeydown"
                    filled
                    clearable>
                </v-text-field>
            </v-form>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Chat extends Vue {
    protected message: string = "";

    data() {
        return {
            valid: false,
            message: ""
        }
    }

    sendMessage() {
        if (!this.message) {
            return;
        }
        console.log(this.message);
    }

    messageKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.sendMessage();
        }
    }
}
</script>


<style lang="scss" scoped>
.chat {
    height: 300px;
    overflow-y: scroll;
    padding-right: 20px;

    .chatMessage {
        position: relative;
        border-radius: .4em;
        background: #EEEEEE;

        &:after {
            content: '';
            position: absolute;
            left: 0;
            top: 20px;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            border-right-color: #EEEEEE;
            border-left: 0;
            border-bottom: 0;
            margin-top: -10px;
            margin-left: -10px;
        }
    }
}
</style>
