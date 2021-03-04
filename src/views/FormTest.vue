<template>
    <div class="formTest">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                v-model="name"
                :counter="10"
                :rules="nameRules"
                label="Name"
                required
            ></v-text-field>

            <v-btn
                :disabled="!valid"
                depressed
                @click="validate"
            >
                Submit
            </v-btn>
        </v-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class FormTest extends Vue {
    $refs!: {
        form: HTMLFormElement
    }

    data() {
        return {
            valid: true,
            name: '',
            nameRules: [
                (value: string) => !!value || "Test",
                (value: string) => (value && value.length > 10) || "Name muss größer als 10 Zeichen sein"
            ]
        };
    }

    validate() {
        if (!this.$refs.form.validate()) {
            return;
        }

        console.log(this.$refs.form);
    }
}
</script>
