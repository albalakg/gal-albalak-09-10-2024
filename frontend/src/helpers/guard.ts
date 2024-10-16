import store from "@/store/index";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

class Guard {
  user(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    store.getters["client/isLogged"] ? next() : next("/");
  }

  guest(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    !store.getters["client/isLogged"] ? next() : next("/game");
  }
}

export default new Guard();