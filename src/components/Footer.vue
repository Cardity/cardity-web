<template>
    <v-row>
        <v-col class="footer">
            <ul>
                <li>
                    <router-link to="/privacy">Datenschutzerklärung</router-link>
                </li>
                <li>
                    <router-link to="/imprint">Impressum</router-link>
                </li>
            </ul>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped>
.footer {
    ul {
        padding: 0;
        text-align: center;

        li {
            display: inline;
            padding: 0 5px;
        }
    }
}
</style>
