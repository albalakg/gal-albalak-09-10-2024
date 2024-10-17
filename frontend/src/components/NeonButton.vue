<template>
    <button class="neon-button" :class="{
        disabled
    }" @click="clicked()" :disabled="disabled">
        {{ text }}
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "NeonButton",

    props: {
        text: {
            type: String,
            required: true
        },

        disabled: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        clicked() {
            this.$emit('onClick')
        }
    },
});
</script>

<style scoped lang="scss">
.neon-button {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background-color: #e2bee1;
    border: 1px solid plum;
    box-shadow: 0 0 .3em rgb(185, 93, 185), 0 0 1em plum, 2px 2px .5em rgb(128, 49, 128) inset, 0 0 1em #fff inset;
    padding: 4% 8%;
    font-size: .5em;
    cursor: pointer;
    transition: .2s scale linear;

    &:hover {
        scale: 1.05;
    }
}
</style>