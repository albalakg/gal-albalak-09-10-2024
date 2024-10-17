<template>
  <div class="game stars-background">
    <div class="game-top-bar">
      <div class="game-bar-content">
        <span v-if="score" :class="`game-score-${getScoreDisplayColor}`">
          {{ score }}
        </span>
        <span v-else>
          No Score
        </span>
      </div>
    </div>
    <div class="game-content">
      <h2 class="game-title">
        Test Your Luck and Choose The Right Tile
      </h2>
      <GameBoard ref="board" :totalTiles="getLevelTiles" :settings="settings" @updateGameStatus="updateGameStatus"
        @attemptUsed="attemptUsed" />
    </div>
    <div class="game-bottom-bar">
      <div class="game-bar-content">
        <div class="logout-button-wrapper">
          <NeonButton text="Logout" @onClick="logout()" />
        </div>
        <div class="logout-button-wrapper-sm">
          <div>
            <NeonIcon icon="logout" @onClick="logout()" />
          </div>
        </div>
        <div class="casino-button-wrapper">
          <CasinoButton text="PLAY" @onClick="playGame()" :disabled="isGameLocked" />
        </div>
        <div class="total-score-wrapper">
          <span class="game-total-score">
            Total Score: {{ totalScore }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GameStatusEnum, GameLevelEnum, ErrorEnum, MessageEnum, NotificationTypeEnum } from '@/helpers/enums'
import GameBoard from '@/components/GameBoard.vue';
import NeonButton from '@/components/NeonButton.vue';
import NeonIcon from '@/components/NeonIcon.vue';
import CasinoButton from '@/components/CasinoButton.vue';
import { IBoardComponent, IGameSettings } from '@/helpers/interfaces'

export default defineComponent({
  name: 'GameView',
  components: {
    GameBoard,
    NeonButton,
    NeonIcon,
    CasinoButton,
  },

  data() {
    return {
      clientId: null as number | null,
      levels: {
        easy: 9,
        medium: 16,
        hard: 25,
        master: 100
      } as Record<string, number>,
      settings: {
        status: GameStatusEnum.PENDING as GameStatusEnum,
        // *****
        // ***** Can change here the game level *****
        // ***** easy / medium / hard / master
        // *****
        level: GameLevelEnum.MEDIUM as GameLevelEnum,
        correctTile: null as number | null,
        totalAttempts: 3,
        attemptsUsed: 0 as number,
        gapTimeBetweenGames: 3000 as number, // 3 seconds
      } as IGameSettings,
    }
  },

  created() {
    this.startGame();
  },

  watch: {
    isLogged(newValue: boolean) {
      if (newValue) {
        this.$router.push('/game')
      }
    },

    'settings.status'() {
      this.gameStatusChanged();
    }
  },

  computed: {
    isLogged(): boolean {
      return this.$store.getters['client/isLogged'];
    },

    getLevelTiles(): number {
      return this.levels[this.settings.level];
    },

    boardColumns(): number {
      return Math.sqrt(this.getLevelTiles);
    },

    isGamePending(): boolean {
      return this.settings.status === GameStatusEnum.PENDING;
    },

    score(): number {
      return this.$store.getters['client/getCurrentScore'];
    },

    getScoreDisplayColor(): string {
      return this.$store.getters['client/getScoreDisplayColor'];
    },

    totalScore(): string {
      return this.$store.getters['client/getTotalScores'];
    },

    isGameLocked(): boolean {
      return this.settings.status !== GameStatusEnum.PENDING;
    },
  },

  methods: {
    startGame() {
      this.generateCorrectRandomTile();
    },

    playGame() {
      this.settings.status = GameStatusEnum.RUNNING;
      (this.$refs.board as IBoardComponent).shuffleTiles();
    },

    attemptUsed() {
      this.settings.attemptsUsed++;
    },

    updateGameStatus(status: GameStatusEnum) {
      this.settings.status = status;
    },

    gameStatusChanged() {
      this.changeTilesBasedOnStatus();
      if ([GameStatusEnum.WON, GameStatusEnum.LOST].includes(this.settings.status)) {
        this.resetGame();
      }
    },

    resetGame() {
      setTimeout(() => {
        this.settings.status = GameStatusEnum.PENDING;
        this.settings.attemptsUsed = 0;
        this.changeTilesBasedOnStatus();
        this.generateCorrectRandomTile();
      }, this.settings.gapTimeBetweenGames);
    },

    changeTilesBasedOnStatus() {
      if (this.isGamePending) {
        [GameStatusEnum.WON, GameStatusEnum.LOST, 'disabled'].forEach(gameStatus => {
          document.querySelectorAll('.board-tile').forEach(tile => {
            tile.classList.remove(`board-tile-${gameStatus}`);
          });
        })
      } else {
        document.querySelectorAll('.board-tile').forEach(tile => {
          tile.classList.add(`board-tile-${this.settings.status}`);
        });
      }
    },

    generateCorrectRandomTile() {
      this.settings.correctTile = Math.floor(Math.random() * this.getLevelTiles);
      console.log("Correct Tile ===> " + (this.settings.correctTile + 1));
    },

    logout() {
      this.$mediator.logout();
      this.$router.push('/')
    }
  }
});
</script>

<style lang="scss">
.game {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .game-top-bar {
    padding: 10px 20px;
    height: 70px;
    background-color: #e2bee1;
    border-bottom: 1px solid plum;
    box-shadow: 0 0 .3em rgb(185, 93, 185), 0 0 1em plum, 0 0 1.5em rgb(128, 49, 128) inset, 0 0 2em #fff inset;

    .game-bar-content {
      border-radius: 15px;
      width: 10%;
      margin: auto;
      justify-content: center;
      background-color: #0007;

      span {
        font-size: 2em;
      }

      .game-score-green {
        color: rgb(115, 179, 32);
      }

      .game-score-red {
        color: rgb(212, 102, 107);
      }
    }

  }

  .game-content {
    height: 100%;
    width: 100vw;

    .game-title {
      margin-top: 2%;
      margin-bottom: 1%;
      color: #fff;
      font-size: 2.5em;
      text-shadow: 0 0 0.05em #fff, 0 0 0.2em plum, 0 0.03em #8888;
      -webkit-text-stroke-color: plum;
    }
  }

  .game-bottom-bar {
    height: 130px;
    background-color: #e2bee1;
    border-top: 1px solid plum;
    box-shadow: 0 0 .3em rgb(185, 93, 185), 0 0 1em plum, 0 0 1.5em rgb(128, 49, 128) inset, 0 0 2em #fff inset;
    padding: 20px 30px;

    .game-bar-content {
      justify-content: space-around;

      &>div {
        display: flex;
        align-items: center;
        height: 50px;
        min-width: 200px;
        font-size: 3em;
      }

      .logout-button-wrapper-sm {
        display: none;
      }

      .casino-button-wrapper {
        height: 8vh;
        width: 14vw;
      }

      .game-total-score {
        font-size: .5em;
        position: absolute;
        background-color: #fff5;
        border-radius: 20px;
        padding: 5px 10px;
      }
    }
  }

  .game-bar-content {
    background-color: #0005;
    box-shadow: 0 0 .5em #0005;
    height: 100%;
    width: 100%;
    border-radius: 25px;
    display: flex;
    align-items: center;
  }
}

@media only screen and (max-width: 600px) {

  .game {
    .game-top-bar {
      height: 40px;

      .game-bar-content {
        width: 50%;
      }
    }

    .game-content {

      .game-title {
        font-size: 1.7em;
      }
    }

    .game-bottom-bar {
      padding: 10px 10px;

      .game-bar-content {
        &>div {
          min-width: none;
        }

        .casino-button-wrapper {
          width: 50vw;
          height: 17vw;
        }

        .logout-button-wrapper,
        .total-score-wrapper {
          display: none;
        }

        .logout-button-wrapper-sm {
          position: absolute;
          left: -50px;
          z-index: 10;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: rotate(180deg);
           
          div {
            height: 35px;
            width: 35px;
          }
        }
      }
    }
  }

}
</style>