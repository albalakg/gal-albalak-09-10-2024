<template>
    <div class="casino-button-base" :class="{ disabled: disabled }">
        <div class="casino-button-bottom">
        </div>
        <button class="casino-button" @click="clicked()">
            <span>
                {{ text }}
            </span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "CasinoButton",

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
.disabled {
    opacity: .6;
}

.casino-button-base {
    width: 100%;
    height: 100%;
    background-color: #1c5a83;
    border-radius: 12px;
    box-shadow: 0 2px 2px 1px #0a2e4688, inset 0 -2px 2px 1px #b2c4d1aa;
    border: 1px solid #0a2e46;
    outline: unset;
    position: relative;

    .casino-button {
        width: 94%;
        left: 3%;
        height: 80%;
        position: absolute;
        z-index: 2;
        bottom: 25px;
        border-radius: 8px;
        box-shadow: 0 2px 2px 1px #406781aa, inset 0 -3px 2px 1px #5a778a, inset 0 3px 4px 1px #eaeef1;
        background-color: #b3d0e4;
        transition: .1s transform linear;
        display: flex;
        align-items: center;
        justify-content: center;
        perspective: 10em;
        perspective-origin: 50% 30%;

        &:active {
            transform: translateY(5px);
        }

        span {
            font-size: 1em;
            transform-style: preserve-3d;
            transform: rotateX(40deg);
            color: #fff;
            text-shadow: 2px 2px 2px #0a2e46, -2px -2px 1px #d1dfe9;
        }
    }

    .casino-button-bottom {
        width: 94%;
        left: 3%;
        height: 80%;
        position: absolute;
        bottom: 15px;
        border-radius: 8px;
        background-color: #4c7591;
        border-bottom: 3px solid #0a2e46cc;
    }
}
</style>