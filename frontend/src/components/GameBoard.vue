<template>
    <transition-group name="shuffleMedium" tag="div" class="board" :class="{disabled: isGameDisabled}"
        :style="`grid-template-columns: repeat(${boardColumns}, 1fr)`">
        <div class="board-tile" :ref="`board-tile-${index}`" v-for="(item, index) in tiles" :key="item" @click="pickedTile(index)">
        </div>
    </transition-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { GameStatusEnum, ErrorEnum, MessageEnum, NotificationTypeEnum } from '@/helpers/enums'
import { IGameSettings } from '@/helpers/interfaces'

export default defineComponent({
    name: 'GameBoard',

    props: {
        totalTiles: {
            type: Number,
            required: true,
        },

        settings: {
            type: Object as PropType<IGameSettings>,
            required: true
        }
    },

    data() {
        return {
            tiles: [] as number[],
        };
    },

    created() {
        this.generateTiles();
    },

    computed: {
        boardColumns(): number {
            return Math.sqrt(this.tiles.length);
        },

        isGameDisabled(): boolean {
            return this.settings.status === GameStatusEnum.PENDING;
        }
    },

    methods: {
        generateTiles() {
            for (let index = 1; index <= this.totalTiles; index++) {
                this.tiles.push(index);
            }
        },

        shuffleTiles() {
            for (let index = this.totalTiles - 1; index > 0; index--) {
                let randomIndex = Math.floor(Math.random() * (index + 1));
                let tempTile = this.tiles[index];

                this.tiles[index] = this.tiles[randomIndex];
                this.tiles[randomIndex] = tempTile;
            }
        },

        pickedTile(tileNumber: number) {
            if (tileNumber === this.settings.correctTile) {
                this.$emit('updateGameStatus', GameStatusEnum.WON);
                this.$store.dispatch("notification/addNotification", {
                    message: MessageEnum.GAME_WON,
                    type: NotificationTypeEnum.INFO
                });
                return;
            }

            this.$emit('attemptUsed');
            if (this.settings.attemptsUsed === this.settings.totalAttempts) {
                this.$store.dispatch("notification/addNotification", {
                    message: ErrorEnum.GAME_LOST,
                    type: NotificationTypeEnum.ERROR
                });
                this.$emit('updateGameStatus', GameStatusEnum.LOST);
            }

            const tile = this.$refs[`board-tile-${tileNumber}`] as HTMLElement[];
            if (!tile) {
                return;
            }

            tile[0].classList.add('board-tile-disabled');
        }
    }
});
</script>

<style lang="scss">
.board {
    width: 50vh;
    height: 50vh;
    margin: auto;
    display: grid;
    gap: 5px;
    position: relative;
    left: -5px;

    .board-tile {
        width: 100%;
        aspect-ratio: 1;
        cursor: pointer;
        background-color: #e2bee1;
        border: 1px solid plum;
        box-shadow: 0 0 .3em rgb(185, 93, 185), 0 0 1em plum, 0 0 .5em rgb(128, 49, 128) inset, 0 0 1em #fff inset;
        border-radius: 5px;
        transition: transform 0.5s ease;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);

        &:hover {
            transform: scale(1.05);
        }
    }

    .board-tile-disabled {
        pointer-events: none;
        opacity: .5;
    }

    .board-tile-won {
        background-color: #d1e2be;
        border: 1px solid rgb(179, 221, 160);
        box-shadow: 0 0 .3em rgb(119, 185, 93), 0 0 .5em rgb(81, 128, 49) inset, 0 0 1em #fff inset;
        pointer-events: none;
        opacity: .8;
    }

    .board-tile-lost {
        background-color: #e2bec0;
        border: 1px solid rgb(221, 160, 175);
        box-shadow: 0 0 .3em rgb(185, 93, 101), 0 0 .5em rgb(128, 49, 60) inset, 0 0 1em #fff inset;
        pointer-events: none;
        opacity: .8;
    }
}

.shuffleSlow-move {
    transition: transform 2s;
}

.shuffleMedium-move {
    transition: transform 1s;
}

.shuffleFast-move {
    transition: transform 0.5s;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>