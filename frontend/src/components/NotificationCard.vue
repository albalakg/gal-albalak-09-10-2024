<template>
    <transition name="slide-fade">
        <div class="notification-card" :class="`${notification?.type}-notification-type`" v-show="notification">
            <span>
                {{ notificationMessage }}
            </span>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { INotification } from '@/helpers/interfaces'

export default defineComponent({
    name: "NotificationCard",

    computed: {
        notification(): INotification | null {
            return this.$store.getters['notification/getNotification'];
        },
    },

    data() {
        return {
            notificationMessage: '' as string
        }
    },

    watch: {
        notification(newValue) {
            if (newValue) {
                this.notificationMessage = newValue.message;
            }
        }
    }
});
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(50%);
    opacity: 0;
}

.notification-card {
    position: absolute;
    z-index: 100;
    right: 20px;
    top: 10px;
    width: fit-content;
    height: 40px;
    border-radius: 12px;
    outline: none;
    padding: 8px 16px;
    font-size: 2em;
}

.info-notification-type {
    background-color: #d1e2be;
    border: 1px solid rgb(179, 221, 160);
    box-shadow: 0 0 .3em rgb(119, 185, 93), 2px 2px .5em rgb(81, 128, 49) inset, 0 0 1em #fff inset;
}

.error-notification-type {
    background-color: #e2bec0;
    border: 1px solid rgb(221, 160, 175);
    box-shadow: 0 0 .3em rgb(185, 93, 101), 2px 2px .5em rgb(128, 49, 60) inset, 0 0 1em #fff inset;
}

@media only screen and (max-width: 600px) {
    .notification-card {
        font-size: 1em;
        height: 20px;
    }
}
</style>