import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import $ from 'jquery'
import UserAuth from './components/UserAuth.vue'
import Consult from './components/ConsultUser.vue'
import History from './components/HistoryView.vue'
import NewHistory from './components/NewHistoryRecord.vue'
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
},
{
    path: '/ConsultUser',
    name: "ConsultUser",
    component: Consult

},
{
    path: '/history',
    name: "history",
    component: History

},
{
    path: '/NewHistory',
    name: "NewHistory",
    component: NewHistory

}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router