<template>
  <div class="app-wrapper">
    <NotificationCard />
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import NotificationCard from '@/components/NotificationCard.vue';

export default defineComponent({
  name: 'App',

  components: {
    NotificationCard,
  },

});
</script>

<style>
.app-wrapper {
  overflow: hidden;
}
</style>
