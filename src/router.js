import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import UserAuth from './components/UserAuth'
// import NewHistoryRecord from './components/NewHistoryRecord'
// import HistoryView from './components/HistoryView'
// import ConsultUser from './components/ConsultUser'

const routes = [{
    path: '/',
    name: 'root',
    component: App
},

{
    path: '/user/auth',
    name: "user_auth",
    component: UserAuth
}

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router