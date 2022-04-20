import React from 'react';
import {render} from 'react-dom';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = window.localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const client = new ApolloClient({
    // uri: 'https://fierce-inlet-15882.herokuapp.com/graphql',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

render((
<BrowserRouter>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
</BrowserRouter>), document.getElementById('root'));
