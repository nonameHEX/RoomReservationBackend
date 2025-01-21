import {createRouter, createWebHistory} from "vue-router";
import WelcomeItem from "../components/WelcomeItem.vue";
import RoomList from "../views/RoomList.vue";
import RoomDetail from "../views/RoomDetail.vue";
import ReservationList from "../views/ReservationList.vue";
import ReservationDetail from "../views/ReservationDetail.vue";
import NotificationList from "../views/NotificationList.vue";
import HelloWorld from "../components/HelloWorld.vue";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: "home",
            component: HelloWorld
        },
        {
            path: "/rooms",
            name: "rooms",
            component: RoomList
        },
        {
            path: "/rooms/:roomId",
            name: "room-detail",
            component: RoomDetail,
            props: true
        },
        {
            path: "/reservations",
            name: "reservations",
            component: ReservationList
        },
        {
            path: "/reservations/:reservationId",
            name: "reservation-detail",
            component: ReservationDetail,
            props: true
        },
        {
            path: "/notifications",
            name: "notifications",
            component: NotificationList
        },
        {
            path: '/login-callback',
            name: 'login-callback',
            component: WelcomeItem
        },
        {
            path: '/logout',
            name: 'logout',
            beforeEnter() {
                window.location.href = '/'
            }
        },
    ],
})