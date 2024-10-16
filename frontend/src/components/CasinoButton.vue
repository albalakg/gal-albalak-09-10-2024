<template>
    <button 
        class="casino-button"
    >
        <div class="casino-button-center">
            <div class="casino-button-inner-center">
                <span>
                    {{ text }}
                </span>
            </div>
        </div>
    </button>
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
.casino-button {
    width: 15vw;
    height: 15vw;
    border-radius: 50%;
    background-color: #0c4d66;
    border: 1px solid #7db0c4;
    box-shadow: 0 0 1em #7db0c4, 0 0 .5em #7db0c4, 0 0 1em #0b4258 inset, 0 0 1em #fff inset;
    padding: 8px;
    cursor: pointer;
  
    .casino-button-center {
        width: 70%;
        height: 70%;
        background: radial-gradient(circle, #ffffff 50%, #8ec2d6);
        border-radius: 50%;
        padding: 15%;
        
        .casino-button-inner-center {
            width: 100%;
            height: 100%;
            background-color: #bed5df;
            box-shadow: 0 0 2em #bed5df, 0 0 2em #0008;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: .2s scale linear, .2s box-shadow linear;

            &:hover {
                scale: 1.05;
                box-shadow: 0 0 2em #bed5df, 0 0 .7em .5em #0008;
            }
        }
    }

    span { 
        font-size: 5em;
    }
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>