<template>
    <v-container class="imprint">
        <Header />
        <v-row>
            <v-col class="contentBox">
                <h2 class="text-h6 mb-4">Impressum</h2>

                <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                    Adresse
                </div>
                <div>
                    Erika Mustermann<br>
                    Heidestraße 17<br>
                    12345 Berlin
                </div>

                <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                    E-Mail
                </div>
                <div>
                    erika(at)mustermann(dot)de
                </div>

                <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                    Telefon
                </div>
                <div>
                    +49 123 1234567
                </div>

                <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                    Fax
                </div>
                <div>
                    +49 123 1234568
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="contentBox mt-5">
                <h2 class="text-h6 mb-4">Weitere Informationen</h2>

                <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                    Verantwortlich für den Inhalt
                </div>
                <div>
                    Erika Mustermann<br>
                    Heidestraße 17<br>
                    12345 Berlin
                </div>

                <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                    Allgemeine Info
                </div>
                <div>
                    CAH ist ein "Cards Against Humanity"-Klon, welches auf <a href="https://www.cardsagainsthumanity.com" target="_blank">cardsagainsthumanity.com</a> erhältlich ist, wo das Spiel gekauft oder herunterladen und selbst ausgedruckt werden kann. Es wird unter einer <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">Creative Commons - Attribution - Noncommercial - Share Alike Lizenz</a> verbreitet. Diese Webversion wird in keiner Weise von cardsagainsthumanity.com unterstützt oder gesponsert. Der Quellcode zu dieser Version kann auf Github heruntergeladen werden. Die vollständigen Lizenzinformationen, einschließlich Informationen zu den enthaltenen Bibliotheken, sind in den Lizenzinforimationen zu finden.
                </div>

                <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                    Widerspruch Werbe-Mails
                </div>
                <div>
                    Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
                </div>

                <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                    Haftung für Inhalte
                </div>
                <div>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.<br>
                    Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </div>

                <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                    Haftung für Links
                </div>
                <div>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.<br>
                    Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </div>

                <div class="text-subtitle-1 blue--text text--darken-4 mt-4">
                    Urheberrecht
                </div>
                <div>
                    Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </div>
            </v-col>
        </v-row>
        <Footer />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from './../components/Header.vue';
import Footer from './../components/Footer.vue';

@Component({
    components: {
        Header,
        Footer
    }
})
export default class Imprint extends Vue {
}
</script>
