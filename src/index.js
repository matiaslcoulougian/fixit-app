import React from 'react';
import {render} from 'react-dom';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import 'bootstrap/dist/css/bootstrap.min.css';

export const client = new ApolloClient({
    uri: 'https://fierce-inlet-15882.herokuapp.com/graphql',
    // uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});


render((
<BrowserRouter>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
</BrowserRouter>), document.getElementById('root'));
