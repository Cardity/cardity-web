<template>
    <v-container class="card-generator">
        <Header />
            <v-row>
                <v-col class="contentBox">
                    <h2 class="text-h6 mb-4">Eigenes Kartendeck generieren</h2>

                    <v-form ref="importForm" lazy-validation>
                        <v-file-input accept="application/json" label="Vorhandenes Deck importieren" v-model="ownFile" @change="cangeOwnFile"></v-file-input>
                    </v-form>
                    <v-divider class="mt-5"></v-divider>
                    <h2 class="text-h6 mb-4 mt-5">Fragekarten</h2>

                    <v-list flat>
                        <v-list-item-group>
                            <template v-for="(item, index) in questionCards">
                                <v-list-item :key="item">
                                    <v-list-item-content>
                                        {{ item }}
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-icon @click="questionCardRemove" :data-key="index">mdi-delete</v-icon>
                                    </v-list-item-action>
                                </v-list-item>
                                <v-divider v-if="index < questionCards.length - 1" :key="index"></v-divider>
                            </template>
                        </v-list-item-group>
                    </v-list>
                    <v-form ref="questionCardForm" lazy-validation>
                        <v-text-field
                            v-model="questionCardText"
                            label="Kartentext"
                            append-outer-icon="mdi-content-save"
                            :error-messages="questionCardError"
                            @click:append-outer="questionCardAdd"
                            @keydown="questionCardMessageKeydown"
                            outlined
                            clearable>
                        </v-text-field>
                    </v-form>

                    <v-divider class="mt-5"></v-divider>

                    <h2 class="text-h6 mb-4 mt-5">Wortkarten</h2>

                    <v-list flat>
                        <v-list-item-group>
                            <template v-for="(item, index) in wordCards">
                                <v-list-item :key="item">
                                    <v-list-item-content>
                                        {{ item }}
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-icon @click="wordCardRemove" :data-key="index">mdi-delete</v-icon>
                                    </v-list-item-action>
                                </v-list-item>
                                <v-divider v-if="index < wordCards.length - 1" :key="index"></v-divider>
                            </template>
                        </v-list-item-group>
                    </v-list>
                    <v-form ref="wordCardForm" lazy-validation>
                        <v-text-field
                            v-model="wordCardText"
                            label="Kartentext"
                            append-outer-icon="mdi-content-save"
                            @click:append-outer="wordCardAdd"
                            @keydown="wordCardMessageKeydown"
                            outlined
                            clearable>
                        </v-text-field>
                    </v-form>

                    <v-divider class="mt-5"></v-divider>

                    <v-form ref="exportForm" lazy-validation>
                        <div class="submitArea">
                            <v-btn
                                color="success"
                                depressed
                                @click="submitExport"
                            >
                                Exportieren
                            </v-btn>
                        </div>
                    </v-form>
                </v-col>
            </v-row>
        <Footer />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

@Component({
    components: {
        Header,
        Footer
    }
})
export default class DeckGenerator extends Vue {
    protected questionCards: string[] = [];
    protected wordCards: string[] = [];
    protected ownFile: any;

    protected questionCardText: string = "";
    protected questionCardError: string = "";
    protected wordCardText: string = "";

    data() {
        return {
            questionCards: [],
            wordCards: [],
            ownFile: null,
            questionCardText: "",
            questionCardError: "",
            wordCardText: ""
        }
    }

    cangeOwnFile() {
        var reader = new FileReader();
        reader.onload = this.loadFile.bind(this);
        reader.readAsText(this.ownFile);
    }

    loadFile(ev: ProgressEvent<FileReader>) {
        let resultJson: string | null | undefined = ev.target?.result?.toString();
        if (resultJson == null) {
            return;
        }
        let data = JSON.parse(resultJson);
        if (data["questionCards"] != null) {
            this.questionCards = data["questionCards"];
        }
        if (data["wordCards"] != null) {
            this.wordCards = data["wordCards"];
        }
    }

    questionCardAdd() {
        if (!this.questionCardText.includes("___")) {
            this.questionCardError = "Der Fragetext muss 3 Unterstriche (___) enthalten, welche die Lücke wiederspiegeln.";
            return;
        }

        this.questionCards.push(this.questionCardText);
        this.questionCardText = "";
    }

    questionCardMessageKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            event.preventDefault();

            this.questionCardAdd();
        } else {
            this.questionCardError = "";
        }
    }

    wordCardAdd() {
        this.wordCards.push(this.wordCardText);
        this.wordCardText = "";
    }

    wordCardMessageKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            event.preventDefault();

            this.wordCardAdd();
        }
    }

    questionCardRemove(ev: any) {
        this.questionCards.splice(ev.target.dataset.key, 1);
    }

    wordCardRemove(ev: any) {
        this.wordCards.splice(ev.target.dataset.key, 1);
    }

    submitExport(ev: Event) {
        let data = {
            questionCards: this.questionCards,
            wordCards: this.wordCards
        }

        let dataJson = JSON.stringify(data);
        let dataB64 = window.btoa(dataJson);

        var link = document.createElement("a");
        link.download = "customDeck.json";
        link.href = "data:application/octet-stream;base64," + dataB64;
        link.click();
    }
}
</script>
