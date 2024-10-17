<template>
    <div class="neon-icon" @click="clicked()" :class="{ disabled }">
        <span class="material-symbols-outlined">
            {{ icon }}
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "NeonIcon",

    props: {
        icon: {
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
.neon-icon {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff8;

    span {
        position: relative;
        top: -16px;
        left: 3px;
        font-size: .6em;
    }
}
</style>