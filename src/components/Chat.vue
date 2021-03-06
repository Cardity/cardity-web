<template>
    <v-row>
        <v-col class="contentBox">
            <h2 class="text-h6">Chat</h2>

            <div class="chat mb-4 mt-4" id="ChatWrapper">
                <template v-for="(message, index) in messages">
                    <div class="d-flex mt-3" :key="index">
                        <v-tooltip right>
                            <template v-slot:activator="{ on, attrs }">
                                <v-avatar :color="message.isHost ? 'green' : 'primary'" size="48" v-bind="attrs" v-on="on">
                                    <span class="white--text headline">{{ message.name.substr(0, 2).toUpperCase() }}</span>
                                </v-avatar>
                            </template>
                            <span>{{ message.name }}</span>
                        </v-tooltip>
                        <div class="chatMessage ml-3 pa-3">
                            {{ message.message }}
                        </div>
                    </div>
                </template>
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
import CAH from "../services/cah";

interface Message {
    isHost: boolean;
    name: string;
    message: string;
}

@Component({})
export default class Chat extends Vue {
    protected messages: Message[] = [];
    protected message: string = "";

    data() {
        return {
            valid: false,
            messages: [],
            message: ""
        }
    }

    created() {
        CAH.getClient().chatMessageCallback = this.chatMessage.bind(this);
    }

    updated() {
        this.$nextTick(() => this.scrollToEnd());
    }

    sendMessage() {
        if (!this.message) {
            return;
        }

        CAH.getClient().send("SEND_CHAT", {
            message: this.message
        })
        this.message = "";
    }

    messageKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            event.preventDefault();

            this.sendMessage();
        }
    }

    chatMessage(data: { [key: string]: any }) {
        this.messages.push({
            isHost: data["isHost"],
            name: data["name"],
            message: data["message"]
        });
    }

    scrollToEnd() {
        let element = document.getElementById("ChatWrapper");
        if (element != null) {
            element.scrollTop = element.scrollHeight;
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
