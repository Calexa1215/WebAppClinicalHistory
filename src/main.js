import { createApp } from 'vue'
import App from './App.vue'
import router from ':/router'
import { ApolloClient, createHttpLink, createHttpLink, HttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

const httpLink = createHttpLink({
    uri: 'https://api-gateway-clinical-history.herokuapp.com'
})

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

const apolloProvider = new createApolloProvider({
    defaultClient: apolloClient,
})

create(App).use(router).use(apolloProvider).mount('#app')
