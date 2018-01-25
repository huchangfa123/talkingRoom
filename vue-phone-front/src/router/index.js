import Vue from 'vue'
import Router from 'vue-router'
import chatting from '../pages/chatting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: chatting
    },
    {
      path: '/chatting',
      name: 'chatting',
      component: chatting
    }
  ]
})
