<template>
  <div class="home">
    <div class="title-wrapper">
      <div class="title">
        <h1>
          Welcome to
          <br>
          Gasino
        </h1>
      </div>
    </div>
    <div class="login-wrapper">
      <div>
        <form @submit.prevent="submitClient()">
          <NeonInput placeholder="Enter Your Client ID" type="number" @valueUpdated="setClientId" />
          <NeonButton text="ENTER" :disabled="!clientId" />
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NeonInput from '@/components/NeonInput.vue';
import NeonButton from '@/components/NeonButton.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    NeonInput,
    NeonButton,
  },

  data() {
    return {
      clientId: null as number | null
    }
  },

  watch: {
    isLogged(newValue) {
      if (newValue) {
        this.$router.push('/game')
      }
    }
  },

  computed: {
    isLogged(): boolean {
      return this.$store.getters['client/isLogged'];
    }
  },

  methods: {
    submitClient() {
      if (this.clientId) {
        this.$mediator.authenticate(this.clientId);
      }
    },

    setClientId(clientId: number) {
      this.clientId = clientId;
    }
  }
});
</script>

<style lang="scss">
.home {
  background-color: #000;
  height: 100vh;
  overflow: hidden;
  font-size: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-wrapper {
  z-index: 10;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &>div {
    width: 50%;
  }
}

.title-wrapper {
  z-index: 10;
  position: relative;
  transform-style: preserve-3d;
  animation: sceneMoving 4s infinite linear;
  width: 50%;
  height: 100%;

  .title {
    position: absolute;
    top: 20%;
    left: 20%;
    transform: rotateY(45deg);
    width: 70%;
    padding: 0.2em;
    border-radius: 20px;
    animation: titleWrapperBlinking 4s forwards linear;
    word-spacing: .3em;
    background-color: #000;

    h1 {
      font-size: 1.3em;
      color: #fff;
      text-shadow: 0 0.03em #8888;
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: transparent;
      animation: titleBlinking 4s forwards linear;
      animation-delay: 1s;
    }
  }

}

@keyframes sceneMoving {

  0%,
  100% {}

  50% {
    transform: translateY(0.1em);
  }
}

@keyframes titleWrapperBlinking {

  0%,
  17%,
  22%,
  31%,
  40% {
    box-shadow: none;
  }

  15%,
  19%,
  30%,
  32%,
  45%,
  100% {
    box-shadow: 0 0 1em plum, 0 0 0.08em #fff inset, 0 0 0.2em plum inset;
    animation-timing-function: ease-in;
  }
}

@keyframes titleBlinking {

  0%,
  17%,
  22%,
  31%,
  40% {
    text-shadow: 0 0.03em #8888;
    -webkit-text-stroke-color: transparent;
  }

  15%,
  19%,
  30%,
  32%,
  45%,
  100% {
    text-shadow: 0 0 0.05em #fff, 0 0 0.2em plum, 0 0.03em #8888;
    -webkit-text-stroke-color: plum;
    animation-timing-function: ease-in;
  }
}

@media only screen and (max-width: 1600px) {
  .title-wrapper {
    width: 65%;
  }

  .login-wrapper {
    width: 35%;

    &>div {
      width: 80%;
    }
  }
}

@media only screen and (min-width: 601px) {
  .home {
    perspective: 10em;
    perspective-origin: 50% 30%;
  }
}

@media only screen and (max-width: 600px) {
  .home {
    display: block;
  }

  .title-wrapper {
    width: 100%;
    height: 50%;

    .title {
      top: 10%;
      left: 0;
      width: calc(100% - 0.4em);

      h1 {
        font-size: .6em;
      }
    }
  }

  .login-wrapper {
    width: 100%;
    align-items: flex-start;
    font-size: .75em;

    &>div {
      width: 80%;
    }
  }
}
</style>