import { INotification, INotificationStoreState } from "@/helpers/interfaces";
import { NotificationRelationMapType } from "@/helpers/types";
import { MessageEnum, ErrorEnum, NotificationTypeEnum } from "@/helpers/enums";

let showNotificationTimer = undefined as NodeJS.Timer | undefined;

const NotificationStore = {
  namespaced: true,

  state: {
    notifications: <INotification[]>[],
    currentNotification: null as INotification | null,
    notificationDisplayTime: 5000 as number, // 5 seconds
    notificationRelationMap: {
      [MessageEnum.LOGIN_MESSAGE]: ErrorEnum.LOGIN_ERROR_MESSAGE,
    } as NotificationRelationMapType,
  } as INotificationStoreState,

  getters: {
    getNotification(state: INotificationStoreState): INotification | null {
      return state.currentNotification;
    },

    getNotificationDisplayTime(state: INotificationStoreState): number {
      return state.notificationDisplayTime;
    },

    hasActiveNotification(state: INotificationStoreState): boolean {
      return !!state.currentNotification;
    },
  },

  mutations: {
    ADD_NOTIFICATION_TO_BACKLOG(
      state: INotificationStoreState,
      notification: INotification
    ) {
      state.notifications.push(notification);
    },

    SET_CURRENT_NOTIFICATION(
      state: INotificationStoreState,
      notification: INotification | null
    ) {
      state.currentNotification = notification;
    },

    REMOVE_NOTIFICATION_FROM_BACKLOG(state: INotificationStoreState) {
      state.notifications.splice(0, 1);
    },
  },

  actions: {
    async addNotification(
      context: {
        commit: (mutation: string, payload: INotification) => void;
        state: INotificationStoreState;
        dispatch: (action: string, payload?: INotification) => Promise<boolean>;
      },
      notification: INotification
    ) {
      if (!(await context.dispatch("canShowNotification", notification))) {
        context.commit("ADD_NOTIFICATION_TO_BACKLOG", notification);
        return;
      }

      context.dispatch("showNotification", notification);
    },

    showNotification(
      context: {
        state: INotificationStoreState;
        commit: (mutation: string, payload?: INotification | null) => void;
        dispatch: (
          action: string,
          notification?: INotification | null
        ) => Promise<boolean>;
      },
      notification: INotification | null
    ) {
      if (!notification && !context.state.notifications.length) {
        return;
      }

      if(showNotificationTimer) {
        clearTimeout(showNotificationTimer as NodeJS.Timeout);
      }

      context.commit(
        "SET_CURRENT_NOTIFICATION",
        notification ?? context.state.notifications[0]
      );
      if (!notification) {
        context.commit("REMOVE_NOTIFICATION_FROM_BACKLOG");
      }

      showNotificationTimer = setTimeout(async () => {
        context.commit("SET_CURRENT_NOTIFICATION", null);
        if (
          await context.dispatch(
            "canShowNotification"
          )
        ) {
          context.dispatch("showNotification");
          return;
        }
      }, context.state.notificationDisplayTime);
    },

    // Can add here more logic to decide if to show the notification or not yet
    // For the example I set 2 rules with an OR condition between them:
    // 1. there is not active notification at the moment
    // 2. if there is an active notification with
    async canShowNotification(
      context: {
        state: INotificationStoreState;
        getters: {
          hasActiveNotification: boolean;
        };
        dispatch: (action: string, notification: INotification | null) => Promise<boolean>;
      },
      notification: INotification | null
    ): Promise<boolean> {
      const isValidToInvalid = context.dispatch(
        "isValidNotificationRelatedToCurrentInvalidNotification",
        notification
      );

      return !context.getters.hasActiveNotification || isValidToInvalid;
    },

    isValidNotificationRelatedToCurrentInvalidNotification(
      context: {
        state: INotificationStoreState;
      },
      notification: INotification | null
    ): boolean {
      if(!notification) {
        return false;
      }

      if (notification.type === NotificationTypeEnum.ERROR) {
        return false;
      }

      if (!context.state.currentNotification || context.state.currentNotification.type === NotificationTypeEnum.INFO) {
        return false;
      }

      return (
        context.state.notificationRelationMap[notification.message] ===
        context.state.currentNotification.message
      );
    },
  },

  modules: {},
};

export default NotificationStore;
