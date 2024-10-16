<template>
    <input class="neon-input" :placeholder="placeholder" :type="type" v-model="value" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "NeonInput",

    props: {
        placeholder: {
            type: String,
            default: ''
        },

        type: {
            type: String,
            default: "text",
            validator: function (value: string) {
                // Can add here more input types like: number, email, etc.
                return ["text", "number"].includes(value);
            },
        },
    },

    data() {
        return {
            value: "" as string | number,
        };
    },

    watch: {
        value() {
            this.$emit('valueUpdated', this.value)
        },
    }
});
</script>

<style scoped lang="scss">
.neon-input {
    width: 84%;
    min-height: 60px;
    border-radius: 12px;
    background-color: #e2bee1;
    border: 1px solid plum;
    box-shadow: 0 0 .5em plum, 0 0 1em #fff inset, 0 0 1em plum inset;
    outline: none;
    padding: 4% 8%;
    font-size: .4em;
}

// removes the default up & down arrows
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>